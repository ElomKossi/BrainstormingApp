from django.shortcuts import render

from rest_framework import generics, views
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.response import Response

from .models import Topic
from .permissions import IsOwnerOrAdminOrReadOnly
from .serializers import (
    TopicListSerializer,
    TopicCreateSerializer,
    TopicUpdateSerializer,
    TopicDetailSerializer,
    TopicDeleteSerializer
)



class TopicListAPIView(generics.ListAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicListSerializer
    permission_classes = [AllowAny]


class TopicCreateAPIView(generics.CreateAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicCreateSerializer
    permission_classes = [IsAuthenticated]
    throttle_scope = 'create_topic'


class TopicDetailAPIView(generics.RetrieveAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicDetailSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'


class TopicDeleteAPIView(generics.DestroyAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicDeleteSerializer
    permission_classes = [IsOwnerOrAdminOrReadOnly]
    lookup_field = 'slug'


class TopicUpdateAPIView(generics.UpdateAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicUpdateSerializer
    permission_classes = [IsAdminUser]
    lookup_field = 'slug'