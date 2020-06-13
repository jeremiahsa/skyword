from .models import Book, Reviewer
from rest_framework import serializers


class BookSerializer(serializers.ModelSerializer):
    reviewers = serializers.ReadOnlyField()
    #recommenders = serializers.ReadOnlyField() # From the data import
    class Meta:
        model = Book
        fields = ["title", "author", "description", "book_type", "genre", "length", "publish_year", "reviewers", ]


class GroupedBookSerializer(serializers.HyperlinkedModelSerializer):
    # Need to figure out how to add the count in here. 
    recommenders = serializers.IntegerField()
    count_reviewers = serializers.ReadOnlyField()

    class Meta:
        model = Book
        fields = ["title", "author", "recommenders", "description", "book_type", "genre", "length", "publish_year", "count_reviewers"]

class ReviewerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Reviewer
        fields = ["book", "name"]