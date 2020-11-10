from django.conf.urls import url
from django.urls import include, path
from django.contrib import admin

from .views import (
    IdeaListAPIView,
    IdeaCreateAPIView,
    IdeaDetailAPIView,
    IdeaUpdateAPIView,
    IdeaDeleteAPIView
)

urlpatterns = [
    path('', IdeaListAPIView.as_view(), name='idea-list'),
    path('create/', IdeaCreateAPIView.as_view(), name='idea-create'),
    path('<int:pk>/', IdeaDetailAPIView.as_view(), name='idea-detail'),
    path('<int:pk>/edit/', IdeaUpdateAPIView.as_view(), name='idea-update'),
    path('<int:pk>/delete/', IdeaDeleteAPIView.as_view(), name='idea-delete'),
]