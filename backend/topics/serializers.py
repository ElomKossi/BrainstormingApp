from rest_framework import serializers

from django.utils.timezone import now
from datetime import datetime
from django.contrib.humanize.templatetags.humanize import naturaltime
from django.template.defaultfilters import slugify

from djoser.serializers import UserSerializer

from authentication.models import UserAccount
from topics.models import Topic
from threads.models import Thread
from ideas.models import Idea


class MemberSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='profile.first_name')
    last_name = serializers.CharField(source='profile.last_name')
    username = serializers.CharField(source='profile.username')

    class Meta:
        model = UserAccount
        fields = [
            'first_name',
            'last_name',
            'username'
            'is_staff'
        ]


class TopicListSerializer(serializers.ModelSerializer):
    ideas_count = serializers.SerializerMethodField()
    threads_count = serializers.SerializerMethodField()
    last_activity = serializers.SerializerMethodField()
    creator = serializers.HyperlinkedRelatedField(
        read_only=True,
        view_name='user-detail',
        lookup_field='username'
    )
    class Meta:
        model = Topic
        fields = (
            'slug',
            'name',
            'description',
            'creator',
            'created_at',
            'ideas_count',
            'threads_count',
            'last_activity',
        )
        #read_only_fields = ('slug',)

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
                    'pinned': idea.thread.pinned,
                    'naturaltime': naturaltime(idea.created_at),
                }
            return last_activity
        except:
            return None


class TopicCreateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=50, allow_blank=False)
    description = serializers.CharField(default='')

    class Meta:
        model = Topic
        fields = (
            'id',
            'name',
            'description',
            'slug',
            'pinned',
            'creator',
            'created_at',
            'last_activity',
        )
        read_only_fields = ('id', 'slug', 'pinned', 'creator', 'created_at', 'last_activity')
        # lookup_field = 'slug'

    def create(self, validated_data):
        name = validated_data['name']
        description = validated_data['description']

        # Get the requesting user
        # user = self.request.user
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
        else:
            raise serializers.ValidationError('Must be authenticated to create topic')

        slug = slugify(name)
        # Create the topic
        topic = Topic(
            name=name,
            description=description,
            slug = slug,
            creator=user
        )
        topic.save()
        return topic


class TopicUpdateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=50, allow_blank=False)
    description = serializers.CharField(default='')
    pinned = serializers.BooleanField(default=False)
    is_open = serializers.BooleanField(default=False)
    class Meta:
        model = Topic
        fields = (
            'name',
            'description'
            'slug',
            'pinned',
            'is_open',
            'creator',
            'created_at',
            'last_activity'
        )
        read_only_fields = ('slug', 'name', 'creator', 'created_at', 'last_activity')
        lookup_field = 'slug'

    def update(self, instance, validated_data):
        # Update fields if there is any change
        for field, value in validated_data.items():
            if value != '':
                setattr(instance, field, value)
        instance.save()
        return instance


class CreatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = [
            'first_name',
            'last_name',
            'username',
            'is_staff'
        ]


class TopicThreadSerializer(serializers.ModelSerializer):
    creator = CreatorSerializer(read_only=True)
    created_at = serializers.SerializerMethodField()
    class Meta:
        model = Thread
        fields = [
            'id',
            'name',
            'content',
            'created_at',
            'creator'
        ]
    def get_created_at(self, obj):
        return naturaltime(obj.created_at)


class TopicDetailSerializer(serializers.ModelSerializer):
    threads = serializers.SerializerMethodField()
    # threads = TopicThreadSerializer(many=True, read_only=True)
    creator = CreatorSerializer(read_only=True)
    created_at = serializers.SerializerMethodField()
    class Meta:
        model = Topic
        fields = (
            'slug',
            'name',
            'description',
            'pinned',
            'is_open',
            'created_at',
            'creator',
            'threads',
        )
        read_only_fields = ('slug',)
        lookup_field = 'slug'

    def get_created_at(self, obj):
        return naturaltime(obj.created_at)

    def get_threads(self, obj):
        def get_last_activity(thread):
            try:
                idea = Idea.objects.filter(thread=thread).order_by('-created_at').first()
                if idea:
                    return {
                        'naturaltime': naturaltime(idea.created_at),
                        'first_name': idea.creator.first_name,
                        'last_name': idea.creator.last_name,
                        'username': idea.creator.username
                    }
                return {
                    'naturaltime': naturaltime(thread.created_at),
                    'first_name': thread.creator.first_name,
                    'last_name': thread.creator.last_name,
                    'username': thread.creator.username
                }
            except:
                return None

        def get_replies_count(thread):
            return Idea.objects.filter(thread=thread).count()

        def get_detail(thread):
            return {
                'id': thread.id,
                'name': thread.name,
                'content': thread.content,
                'pinned': thread.pinned,
                'creator': thread.creator.username,
                'naturaltime': naturaltime(thread.created_at),
                'replies_count': get_replies_count(thread),
                'last_activity': get_last_activity(thread)
            }

        try:
            threads = Thread.objects.filter(topic=obj).order_by('-pinned', '-last_activity')
            return map(get_detail, threads)
        except:
            return []


class TopicDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thread
        fields = '__all__'