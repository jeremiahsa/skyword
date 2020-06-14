from django.db import models
from django.contrib.auth.models import User

class Book(models.Model):
    title=models.CharField(max_length=256)
    author=models.CharField(max_length=100)
    recommender=models.CharField(max_length=100)
    source=models.TextField()
    amazon_link=models.TextField()
    description=models.TextField()
    book_type=models.TextField()
    genre=models.TextField()
    length=models.IntegerField()
    publish_year=models.IntegerField()
    on_list=models.TextField()
    review_excerpt=models.TextField()
    def __str__(self):
        return '%s: %s' % (self.title, self.author)

class Reviewer(models.Model):
    books = models.ManyToManyField(Book, related_name='reviewers', related_query_name='reviewers')
    user = models.ForeignKey(User, related_name='books', on_delete=models.CASCADE, null=True)
    def __str__(self):
        return '%s' % (self.user)

#class ReviewerBooks(models.Model):
#    book = models.ForeignKey(Book, related_name="reviewerList", on_delete=models.CASCADE)
#    reviewer_name = models.ForeignKey(Reviewer, related_name="reviewer", on_delete=models.CASCADE)
