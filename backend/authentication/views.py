from django.shortcuts import render

from rest_framework import generics, views
from rest_framework.permissions import ( AllowAny )

from authentication.models import UserAccount
from authentication.serializers import UserDetailSerializer


class UserDetailAPIView(generics.RetrieveAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = UserDetailSerializer
    lookup_field = 'username'
    permission_classes = [AllowAny]