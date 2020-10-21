from django.db import models
from django.utils.text import Truncator
from django.core.validators import MaxValueValidator, MinValueValidator

from authentication.models import UserAccount
from threads.models import Thread


class Idea(models.Model):
    """ Model to represent the idea in a thread """
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True)
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE, related_name='ideas')
    creator = models.ForeignKey(UserAccount,on_delete=models.CASCADE, related_name='ideas')

    class Meta:
        ordering = ['created_at']

    def no_of_ratings(self):
        ratings = Rating.objects.filter(idea=self)
        return len(ratings)

    def avg_rating(self):
        sum = 0
        ratings = Rating.objects.filter(idea=self)
        for rating in ratings:
            sum += rating.stars

        if len(ratings) > 0:
            return sum / len(ratings)
        else:
            return 0

    def __str__(self):
        truncated_content = Truncator(self.content)
        return truncated_content.chars(30)


class Rating(models.Model):
    idea = models.ForeignKey(Idea, on_delete=models.CASCADE)
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    stars = models.IntegerField(validators=[MinValueValidator(1),MaxValueValidator(5)])

    class Meta:
        unique_together = (('user', 'idea'),)
        index_together = (('user', 'idea'),)
