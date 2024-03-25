from django.shortcuts import render
from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Note

from quickstart.serializers import GroupSerializer, UserSerializer, NoteSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

@api_view(['GET'])
def getNotes(request):
    notes = Note.objects.all()
    serializr = NoteSerializer(notes, many=True)
    return Response(serializr.data)
    
    
@api_view(['GET'])
def getNote(request, pk):
    notes = Note.objects.get(id=pk)
    serializr = NoteSerializer(notes, many=False)
    return Response(serializr.data)
    