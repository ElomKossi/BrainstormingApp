from django.shortcuts import render

from rest_framework import generics, views, viewsets, status
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)

from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.response import Response

from .permissions import IsOwnerOrAdminOrReadOnly
from .models import Idea,Rating
from .models import Thread

from .serializers import (
    IdeaListSerializer,
    IdeaCreateSerializer,
    IdeaDetailSerializer,
    IdeaUpdateSerializer,
    IdeaDeleteSerializer,
    RatingSerializer
)


class IdeaListAPIView(generics.ListAPIView):
    queryset = Idea.objects.all()
    serializer_class = IdeaListSerializer
    permission_classes = [IsAdminUser]


class IdeaCreateAPIView(generics.CreateAPIView):
    queryset = Idea.objects.all()
    serializer_class = IdeaCreateSerializer
    permission_classes = [IsAuthenticated]
    throttle_scope = 'create_idea'


class IdeaDetailAPIView(generics.RetrieveAPIView):
    queryset = Idea.objects.all()
    serializer_class = IdeaDetailSerializer
    permission_classes = [AllowAny]


class IdeaDeleteAPIView(generics.DestroyAPIView):
    # For now only admin can delete idea,
    # because if user keep on deleting idea doesn't make sense
    queryset = Idea.objects.all()
    serializer_class = IdeaDeleteSerializer
    permission_classes = [IsOwnerOrAdminOrReadOnly]

    def delete(self, request, pk, format=None):
        try:
            idea = Idea.objects.get(pk=pk)
            thread = idea.thread
            idea.delete()

            # since we deleted a idea, we now check the latest idea
            latest_idea = Idea.objects.filter(thread=thread).order_by('-created_at').first()

            # update the deleted idea's thread last_activity
            if latest_idea is None:
                thread.last_activity = thread.created_at
            else:
                thread.last_activity = latest_idea.created_at
            thread.save()
            return Response(status=HTTP_200_OK)

        except:
            return Response(status=HTTP_400_BAD_REQUEST)


class IdeaUpdateAPIView(generics.UpdateAPIView):
    queryset = Idea.objects.all()
    serializer_class = IdeaUpdateSerializer
    permission_classes = [IsOwnerOrAdminOrReadOnly]


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        response = {'message': 'You cant update rating like that'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        response = {'message': 'You cant create rating like that'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)