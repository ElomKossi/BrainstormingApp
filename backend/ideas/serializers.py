from rest_framework import serializers

from django.utils.translation import ugettext_lazy as _
from django.utils.timezone import now

from authentication.models import UserAccount
from topics.models import Topic
from threads.models import Thread
from ideas.models import Idea, Rating

class IdeaListSerializer(serializers.ModelSerializer):
    thread = serializers.HyperlinkedRelatedField(read_only=True,  view_name='thread-detail')
    creator = serializers.HyperlinkedRelatedField(read_only=True,view_name='user-detail',lookup_field='username')

    class Meta:
        model = Idea
        fields = (
            'id',
            'content',
            'created_at',
            'updated_at',
            'no_of_ratings',
            'avg_rating',
            'thread',
            'creator'
        )


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('id', 'stars', 'user', 'idea')


class IdeaCreateSerializer(serializers.ModelSerializer):
    content = serializers.CharField(allow_blank=False)
    thread = serializers.HyperlinkedRelatedField(read_only=True, view_name='thread-detail')
    thread_id = serializers.IntegerField(required=True, help_text=_('Required. Id of the thread this idea is created in'))
    creator = serializers.HyperlinkedRelatedField(read_only=True, view_name='user-detail',lookup_field='username')

    class Meta:
        model = Idea
        fields = (
            'id',
            'content',
            'thread',
            'thread_id',
            'created_at',
            'updated_at',
            'no_of_ratings',
            'avg_rating',
            'creator'
        )
        read_only_fields=('id', 'thread', 'created_at', 'updated_at', 'no_of_ratings', 'avg_rating', 'creator',)

    def create(self, validated_data):
        content = validated_data['content']
        thread_id = validated_data['thread_id']

        # Get thread object
        try:
            thread = Thread.objects.get(id=thread_id)
        except Thread.DoesNotExist:
            raise serializers.ValidationError('Thread does not exist, please enter correct thread id')

        # Get the requesting user
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
        else:
            raise serializers.ValidationError('Must be authenticated to create idea')

        # Create the idea
        idea = Idea(
            content=content,
            thread=thread,
            creator=user
        )
        # Update the thread last_activity to idea creation time
        idea.save()
        thread.last_activity = idea.created_at
        thread.save()
        return idea


class IdeaUpdateSerializer(serializers.ModelSerializer):
    content = serializers.CharField(required=True)
    thread = serializers.HyperlinkedRelatedField(read_only=True, view_name='thread-detail')
    creator = serializers.HyperlinkedRelatedField(read_only=True, view_name='user-detail', lookup_field='username')
    class Meta:
        model = Idea
        fields = (
            'id',
            'content',
            'thread',
            'created_at',
            'updated_at',
            'no_of_ratings',
            'avg_rating',
            'creator'
        )
        read_only_fields=('id', 'thread', 'created_at', 'updated_at', 'no_of_ratings', 'avg_rating', 'creator',)

    def update(self, instance, validated_data):
        # Update fields if there is any change
        for field, value in validated_data.items():
            setattr(instance, field, value)
        # Update 'updated_at' field to now
        setattr(instance, 'updated_at', now())

        # Note: If user update idea, it won't change the last_activity
        instance.save()
        return instance


class IdeaDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Idea
        fields = '__all__'


class IdeaDetailSerializer(serializers.ModelSerializer):
    thread = serializers.HyperlinkedRelatedField(read_only=True, view_name='thread-detail')
    creator = serializers.HyperlinkedRelatedField(read_only=True, view_name='user-detail', lookup_field='username')
    class Meta:
        model = Idea
        fields = (
            'content',
            'thread',
            'created_at',
            'updated_at',
            'no_of_ratings',
            'avg_rating',
            'creator'
        )