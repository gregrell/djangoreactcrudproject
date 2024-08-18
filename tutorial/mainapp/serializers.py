from django.contrib.auth.models import Group, User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Note, UserInfo


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["url", "username", "email", "groups"]


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ["url", "name"]


class NoteSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField("get_user_from_author_id")

    class Meta:
        model = Note
        fields = ["id", "body", "author_id", "username", "created", "updated"]
        # fields = "__all__"

    def get_user_from_author_id(self, obj):
        # Try except because drf will either have a single item or a list as the obj object depending if the request is for many or one
        try:
            userid = obj["author_id"]
        except:
            userid = obj.author_id
        u_name = User.objects.get(id=userid)
        return u_name.username


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token["username"] = user.username
        # ...

        return token

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = "__all__"