from rest_framework import serializers

from django.utils.translation import ugettext_lazy as _
from django.contrib.humanize.templatetags.humanize import naturaltime

from authentication.models import UserAccount
from topics.models import Topic
from threads.models import Thread
from ideas.models import Idea


class ThreadListSerializer(serializers.ModelSerializer):
    topic = serializers.HyperlinkedRelatedField(read_only=True, view_name='topic-detail', lookup_field='slug')
    creator = serializers.HyperlinkedRelatedField(read_only=True, view_name='user-detail', lookup_field='username')

    class Meta:
        model = Thread
        fields = (
            'id',
            'name',
            'topic',
            'pinned',
            'content',
            'creator',
            'created_at',
            'last_activity'
        )


class ThreadCreateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=50, allow_blank=False)
    topic = serializers.SlugField(required=True, help_text=_('Required. Slug of the topic this thread is created in'))
    content = serializers.CharField(default='')

    class Meta:
        model = Thread
        fields = (
            'id',
            'name',
            'topic',
            'pinned',
            'content',
            'creator',
            'created_at',
            'last_activity'
        )
        read_only_fields=('id', 'pinned', 'creator', 'created_at', 'last_activity')

    def create(self, validated_data):
        name = validated_data['name']
        topic_slug = validated_data['topic']
        content = validated_data['content']

        # Get topic object
        try:
            topic = Topic.objects.get(slug=topic_slug)
        except topic.DoesNotExist:
            raise serializers.ValidationError('topic does not exist, please enter correct topic slug')

        # Get the requesting user
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
        else:
            raise serializers.ValidationError('Must be authenticated to create thread')

        # Create the thread
        thread = Thread(
            name=name,
            topic=topic,
            content=content,
            creator=user
        )
        thread.save()
        return thread


class ThreadUpdateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=50, allow_blank=True)
    content = serializers.CharField(allow_blank=True)
    pinned = serializers.BooleanField(default=False)
    class Meta:
        model = Thread
        fields = (
            'name',
            'topic',
            'pinned',
            'content',
            'creator',
            'created_at',
            'last_activity'
        )
        read_only_fields=('topic', 'creator', 'created_at', 'last_activity')

    def update(self, instance, validated_data):
        # Update fields if there is any change
        for field, value in validated_data.items():
            if value != '':
                setattr(instance, field, value)
        instance.save()
        return instance


class ThreadDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thread
        fields = '__all__'


class CreatorSerializer(serializers.ModelSerializer):
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


class ThreadPostSerializer(serializers.ModelSerializer):
    creator = CreatorSerializer(read_only=True)
    created_at = serializers.SerializerMethodField()
    class Meta:
        model = Idea
        fields = [
            'id',
            'content',
            'created_at',
            'creator'
        ]
    def get_created_at(self, obj):
        return naturaltime(obj.created_at)


class ThreadDetailSerializer(serializers.ModelSerializer):
    topic = serializers.HyperlinkedRelatedField(read_only=True, view_name='topic-detail', lookup_field='slug')
    creator = CreatorSerializer(read_only=True)
    posts = ThreadPostSerializer(many=True, read_only=True)
    created_at = serializers.SerializerMethodField()

    class Meta:
        model = Thread
        fields = (
            'id',
            'name',
            'topic',
            'pinned',
            'content',
            'creator',
            'created_at',
            'last_activity',
            'posts'
        )
        read_only_fields = ('id',)

    def get_created_at(self, obj):
        return naturaltime(obj.created_at)