from django.db import models
from django.utils.text import Truncator
from django.utils.timezone import now

from authentication.models import UserAccount
from topics.models import Topic


class Thread(models.Model):
    """ Model to represent a thread in a topic """
    name = models.CharField(max_length=255)
    content = models.TextField()
    pinned = models.BooleanField(default=False)
    is_open = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    last_activity = models.DateTimeField(default=now)
    topic = models.ForeignKey(
        Topic,
        on_delete=models.CASCADE,
        related_name='threads'
    )
    creator = models.ForeignKey(
        UserAccount,
        on_delete=models.CASCADE,
        related_name='threads'
    )

    class Meta:
        ordering = [
            '-pinned',
            '-last_activity'
        ]

    def __str__(self):
        truncated_name = Truncator(self.name)
        return truncated_name.chars(30)