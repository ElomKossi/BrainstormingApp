from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()

class UserCreate(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'first_name', 'last_name', 'username', 'email', 'password')

class UserDetailSerializer(serializers.ModelSerializer):
    topics = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='topic-detail',
        lookup_field='slug'
    )
    threads = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='thread-detail',
        lookup_field='pk'
    )
    ideas = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='idea-detail',
        lookup_field='pk'
    )
    class Meta:
        model = User
        fields = [
            'first_name',
            'last_name',
            'username',
            'is_staff',
            'topics',
            'threads',
            'ideas'
        ]
        lookup_field = 'username'