from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from rest_framework.response import Response
from django.contrib.auth import get_user_model
User = get_user_model()

from authentication.models import UserAccount

class UserCreate(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'first_name', 'last_name', 'username', 'email', 'password')


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('first_name', 'last_name', 'email')


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = (
            'first_name',
            'last_name',
            'email',
        )
        read_only_fields = ('username',)
        lookup_field = 'username'

    def update(self, validated_data):
        try:
            # Get the requesting user
            user = None
            request = self.context.get("request")
            if request and hasattr(request, "user"):
                user = request.user
            username = user.username

            first_name = validated_data['first_name']
            last_name = validated_data['last_name']
            email = validated_data['email']

            UserAccount.objects.filter(user=user).update(first_name=first_name, last_name=last_name, email=email)

            user_profile = UserAccount.objects.get(user=user)
            user_profile = UserProfileSerializer(user_profile)

            return Response({ 'profile': user_profile.data, 'username': str(username) })
        except:
            return Response({ 'error': 'Something went wrong when updating profile' })


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
        model = UserAccount
        fields = [
            'id',
            'first_name',
            'last_name',
            'username',
            'email',
            'is_staff',
            'topics',
            'threads',
            'ideas'
        ]
        lookup_field = 'username'

    def get_topics(self, obj):
        try:
            topics = topic.objects.filter()
        except:
            return None