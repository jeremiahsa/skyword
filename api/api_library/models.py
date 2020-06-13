from django.db import models

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
    book = models.ForeignKey(Book, related_name='reviewers', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    def __str__(self):
        return '%s' % (self.name)
