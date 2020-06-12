from .models import Book
from rest_framework import serializers


class BookSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Book
        fields = ["title", "author", "recommender", "amazon_link", "description", "book_type", "genre", "length", "publish_year", "on_list", "review_excerpt"]


class GroupedBookSerializer(serializers.HyperlinkedModelSerializer):
    # Need to figure out how to add the count in here. 
    recommenders = serializers.IntegerField()

    class Meta:
        model = Book
        fields = ["title", "author", "recommenders", "amazon_link", "description", "book_type", "genre", "length", "publish_year", "on_list", "review_excerpt"]
