from django.shortcuts import render
from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import Note

from mainapp.serializers import GroupSerializer, UserSerializer, NoteSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


@api_view(["GET"])
@permission_classes([AllowAny])
def getNotes(request):
    notes = Note.objects.all().order_by("-updated").values()
    serializer = NoteSerializer(notes, many=True)

    return Response(serializer.data)


@api_view(["GET"])
def getNote(request, pk):
    notes = Note.objects.get(id=pk)
    serializr = NoteSerializer(notes, many=False)
    return Response(serializr.data)


@api_view(["PUT"])
def updateNote(request, pk):
    obj = Note.objects.get(id=pk)
    newbody = request.data.get("body")
    obj.body = newbody
    obj.save()
    return Response(status=202)


@api_view(["POST"])
def createNote(request):
    data = request.data
    obj = Note.objects.create(body=data["body"], author=request.user)
    serializer = NoteSerializer(obj, many=False)
    return Response(serializer.data)


@api_view(["POST"])
def deleteNote(request, pk):
    obj = Note.objects.get(id=pk)
    obj.delete()
    return Response(status=202)
