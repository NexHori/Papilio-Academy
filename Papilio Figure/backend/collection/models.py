from django.contrib.auth.models import User
from django.db import models

class Figurine(models.Model):
    SCALE_CHOICES = [
        ("1/12", "1/12 Scale"),
        ("1/8", "1/8 Scale"),
        ("1/7", "1/7 Scale"),
        ("1/6", "1/6 Scale"),
        ("1/4", "1/4 Scale"),
    ]
    CATEGORY_CHOICES = [
        ("General", "General"),
        ("Nendoroids", "Nendoroids"),
        ("Figma", "Figma"),
        ("Pop Up Parade", "Pop Up Paradee"),
        ("Prize Figures", "Prize Figures"),
    ]
    
    name = models.CharField(max_length=255)
    version = models.CharField(max_length=255, blank=True, null=True)
    series = models.CharField(max_length=255, blank=True, null=True)
    manufacturer = models.CharField(max_length=255, blank=True, null=True)
    scale = models.CharField(max_length=10, choices=SCALE_CHOICES, blank=True, null=True)
    category = models.CharField(max_length=13, choices=CATEGORY_CHOICES, blank=True, null=True)
    release_date = models.DateField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    image = models.ImageField(upload_to='figurine_images/', blank=True, null=True)
    description = models.TextField(blank=True, null=True) 

    def __str__(self):
        return self.name
        
class Collection(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    figurines = models.ManyToManyField(Figurine)
    date_added = models.DateTimeField(auto_now_add=True)

class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    figurines = models.ManyToManyField(Figurine)
    added_on = models.DateTimeField(auto_now_add=True)

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    figurine = models.ForeignKey(Figurine, on_delete=models.CASCADE)
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)