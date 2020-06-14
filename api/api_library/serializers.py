from .models import Book, Reviewer
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class BookSerializer(serializers.ModelSerializer):
    reviewers = serializers.ReadOnlyField()
    book_id = serializers.ReadOnlyField()
    #reviewers = serializers.PrimaryKeyRelatedField(many=True, queryset=Reviewer.objects.all(), allow_empty=True, required=False)
    #recommenders = serializers.ReadOnlyField() # From the data import
    class Meta:
        model = Book
        fields = ( "book_id", "title", "author", "description", "book_type", "genre", "length", "publish_year", "reviewers", )
        extra_kwargs = { "reviewers": {"required":False}}

###### 
# We need to get rid of this
#####
class GroupedBookSerializer(serializers.HyperlinkedModelSerializer):
    # Need to figure out how to add the count in here. 
    recommenders = serializers.IntegerField()
    count_reviewers = serializers.ReadOnlyField()
    book_id = serializers.ReadOnlyField()
    class Meta:
        model = Book
        fields = ("book_id", "title", "author", "recommenders", "description", "book_type", "genre", "length", "publish_year", "count_reviewers")
        extra_kwargs = { "reviewers": {"required":False}}



class ReviewerSerializer(serializers.ModelSerializer):
    books = serializers.PrimaryKeyRelatedField(many=True, queryset=Book.objects.all(), allow_empty=False, required=True)

    class Meta:
        model=Reviewer
        fields = ["id", "user", "books"]
        extra_kwargs = { "user": {"required":True}, "books": {"required":True}}

##################
# Authentication
###################
class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],
                                        None,
                                        validated_data['password'])
        return user

class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'books')