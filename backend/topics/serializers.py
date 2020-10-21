from rest_framework import serializers

from django.utils.timezone import now
from datetime import datetime
from django.contrib.humanize.templatetags.humanize import naturaltime

from authentication.models import UserAccount
from topics.models import Topic
from threads.models import Thread
from ideas.models import Idea


class TopicListSerializer(serializers.ModelSerializer):
    ideas_count = serializers.SerializerMethodField()
    threads_count = serializers.SerializerMethodField()
    last_activity = serializers.SerializerMethodField()

    class Meta:
        model = Topic
        fields = (
            'slug',
            'name',
            'description',
            'ideas_count',
            'threads_count',
            'last_activity'
        )
        read_only_fields = ('slug',)

    def get_ideas_count(self, obj):
        return Idea.objects.filter(thread__topic=obj).count()

    def get_threads_count(self, obj):
        return Thread.objects.filter(topic=obj).count()

    def get_last_activity(self, obj):
        try:
            thread = Thread.objects.filter(topic=obj).order_by('-last_activity').first()
            if thread:
                last_activity = {
                    'thread_id': thread.id,
                    'thread_name': thread.name,
                    'username': thread.creator.username,
                    'pinned': thread.pinned,
                    'naturaltime': naturaltime(thread.created_at)
                }
            idea = Idea.objects.filter(thread__topic=obj).order_by('-created_at').first()
            if idea and idea.created_at > thread.created_at:
                last_activity = {
                    'thread_id': idea.thread.id,
                    'thread_name': idea.thread.name,
                    'username': idea.creator.username,
                    'avatar': idea.creator.profile.avatar,
                    'pinned': idea.thread.pinned,
                    'naturaltime': naturaltime(idea.created_at),
                }
            return last_activity
        except:
            return None


class TopicCreateDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = (
            'slug',
            'name',
            'description'
        )
        read_only_fields = ('slug',)
        lookup_field = 'slug'


class TopicUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = (
            'slug',
            'name',
            'description'
        )
        read_only_fields = ('slug', 'name')
        lookup_field = 'slug'


class TopicDetailSerializer(serializers.ModelSerializer):
    threads = serializers.SerializerMethodField()
    class Meta:
        model = Topic
        fields = (
            'slug',
            'name',
            'description',
            'threads'
        )
        read_only_fields = ('slug',)
        lookup_field = 'slug'

    def get_threads(self, obj):
        def get_last_activity(thread):
            try:
                idea = Idea.objects.filter(thread=thread).order_by('-created_at').first()
                if idea:
                    return {
                        'naturaltime': naturaltime(idea.created_at),
                        'username': idea.creator.username,
                        'first_name': idea.creator.first_name,
                        'last_name': idea.creator.last_name
                    }
                return {
                    'naturaltime': naturaltime(thread.created_at),
                    'username': thread.creator.username,
                    'first_name': thread.creator.first_name,
                    'last_name': thread.creator.last_name
                }
            except:
                return None

        def get_replies_count(thread):
            return Idea.objects.filter(thread=thread).count()

        def get_detail(thread):
            return {
                'id': thread.id,
                'name': thread.name,
                'pinned': thread.pinned,
                'creator': thread.creator.username,
                'avatar': thread.creator.profile.avatar,
                'naturaltime': naturaltime(thread.created_at),
                'replies_count': get_replies_count(thread),
                'last_activity': get_last_activity(thread)
            }

        try:
            threads = Thread.objects.filter(topic=obj).order_by('-pinned', '-last_activity')
            return map(get_detail, threads)
        except:
            return []