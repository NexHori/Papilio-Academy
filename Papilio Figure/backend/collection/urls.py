from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("figurines/", views.figurine_list, name="figurine_list"),
    path("figurines/<int:figurine_id>/", views.figurine_detail, name="figurine_detail"),

    path("collection/", views.collection_view, name="collection_view"),
    path("collection/add/<int:figurine_id>/", views.add_to_collection, name="add_to_collection"),
    path("collection/remove/<int:figurine_id>/", views.remove_from_collection, name="remove_from_collection"),

    path("wishlist/", views.wishlist_view, name="wishlist_view"),
    path("wishlist/add/<int:figurine_id>/", views.add_to_wishlist, name="add_to_wishlist"),
    path("wishlist/remove/<int:figurine_id>/", views.remove_from_wishlist, name="remove_from_wishlist"),

    path("search/", views.search_figurines, name="search_figurines"),
]