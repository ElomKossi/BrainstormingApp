from django.conf.urls import url
from django.urls import include, path
from django.contrib import admin

from .views import (
    TopicCreateAPIView,
    TopicDetailAPIView,
    TopicListAPIView,
    TopicDeleteAPIView,
    TopicUpdateAPIView,
)

urlpatterns = [
    path('', TopicListAPIView.as_view(), name='topic-list'),
    path('create/', TopicCreateAPIView.as_view(), name='topic-create'),
    path('<slug:slug>/', TopicDetailAPIView.as_view(), name='topic-detail'),
    path('<slug:slug>/edit/', TopicUpdateAPIView.as_view(), name='topic-update'),
    path('<slug:slug>/delete/', TopicDeleteAPIView.as_view(), name='topic-delete'),
]