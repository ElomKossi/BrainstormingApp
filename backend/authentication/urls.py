from django.conf.urls import url
from django.urls import include, path
from django.contrib import admin

from .views import (
    UserDetailAPIView,
)

urlpatterns = [
    path('<slug:username>/', UserDetailAPIView.as_view(), name='user-detail'),
]