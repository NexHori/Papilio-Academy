from django.contrib import admin
from .models import Figurine, Collection, Wishlist, Review

admin.site.register(Figurine)
admin.site.register(Collection)
admin.site.register(Wishlist)
admin.site.register(Review)