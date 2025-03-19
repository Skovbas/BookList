from .models import Author, Book
from rest_framework import serializers

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'name', 'birthdate']
        
class BookSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source='author.name')
    
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'author_name']
    
    # validation, check if the same book with the same author exists   
    def validate(self, data):
        if Book.objects.filter(title=data['title'], author=data["author"]).exists():
            raise serializers.ValidationError("A book with this title and the same author already exists.")
        return data