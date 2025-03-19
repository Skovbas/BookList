from django.db import models

# Create your models here.
class Author(models.Model):
    name = models.CharField(max_length=255, help_text="Author name")
    birthdate = models.DateField(blank=True, null=True, help_text="Author's date of birth")
    
    def __str__(self):
        return self.name
    
class Book(models.Model):
    title = models.CharField(max_length=255, help_text="Book title")
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name="books")
    
    def __str__(self):
        return self.name
