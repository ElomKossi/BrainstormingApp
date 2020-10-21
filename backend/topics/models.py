from django.db import models
from django.utils.timezone import now
from django.template.defaultfilters import slugify

from authentication.models import UserAccount


class Topic(models.Model):
    """ Model to represent topic """
    name = models.CharField(max_length=30, unique=True)
    description = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    pinned = models.BooleanField(default=False)
    is_open = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    last_activity = models.DateTimeField(default=now)
    creator = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='topics')
    members = models.ManyToManyField(UserAccount)

    class Meta:
        ordering = [
            '-pinned',
            '-last_activity'
        ]

    def __str__(self):
        return self.slug

    def save(self, *args, **kwargs):
        if not self.id:
            # Newly created object, so set slug
            self.slug = slugify(self.name)
        super(Topic, self).save(*args, **kwargs)