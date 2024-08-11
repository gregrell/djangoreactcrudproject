from django.db import models
from django.contrib.auth import get_user_model


# Create your models here.


# Note represents a model of the content to be displayed
class Note(models.Model):
    author = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        null=False,
        blank=False,
        default=1,
    )

    body = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body[0:50]


# Contains specific user information additional to the auth.models User model
class UserInfo(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    first_name = models.TextField(max_length=120, null=False, blank=False)
    last_name = models.TextField(max_length=120, null=False, blank=False)
    dob = models.DateField(null=False, blank=False)

    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username[0:50]
