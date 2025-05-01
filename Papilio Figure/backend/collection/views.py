from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.core.serializers import serialize
from .models import Figurine, Collection, Wishlist
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
import json

def figurine_list(request):
    figurines = Figurine.objects.all()
    figurines_json = serialize('json', figurines)
    return JsonResponse(figurines_json, safe=False)

def figurine_detail(request, figurine_id):
    figurine = get_object_or_404(Figurine, id=figurine_id)

    formatted_date = figurine.release_date.strftime("%d. %b %Y") if figurine.release_date else None
    image_url = figurine.image.url if figurine.image else None

    return JsonResponse({
        "id": figurine.id,
        "name": figurine.name,
        "version": figurine.version,
        "price": float(figurine.price) if figurine.price else None,
        "description": figurine.description,
        "image": image_url,
        "series": figurine.series,
        "manufacturer": figurine.manufacturer,
        "scale": figurine.scale,
        "category": figurine.category,
        "release_date": formatted_date,
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_collection(request, figurine_id):
    try:
        print(f"Incoming POST request to add to collection for figure {figurine_id}")
        figurine = get_object_or_404(Figurine, id=figurine_id)
        collection, _ = Collection.objects.get_or_create(user=request.user)
        
        if collection.figurines.filter(id=figurine_id).exists():
            return Response({
                "status": "success",
                "message": "Already in your collection!",
                "data": {
                    "figurine_id": figurine_id,
                    "in_collection": True
                }
            }, status=status.HTTP_200_OK)
            
        collection.figurines.add(figurine)
        return Response({"message": "Added to collection!"}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_wishlist(request, figurine_id):
    try:
        print(f"Incoming POST request to add to wishlist for figure {figurine_id}")
        figurine = get_object_or_404(Figurine, id=figurine_id)
        wishlist, _ = Wishlist.objects.get_or_create(user=request.user)
        
        if wishlist.figurines.filter(id=figurine_id).exists():
            return Response({
                "status": "success",
                "message": "Already in your wishlist!",
                "data": {
                    "figurine_id": figurine_id,
                    "in_wishlist": True
                }
            }, status=status.HTTP_200_OK)
            
        wishlist.figurines.add(figurine)
        return Response({"message": "Added to wishlist!"}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def wishlist_view(request):
    try:
        wishlist, created = Wishlist.objects.get_or_create(user=request.user)
        figurines = wishlist.figurines.all()
        figurines_data = [{
            'id': fig.id,
            'name': fig.name,
            'price': float(fig.price) if fig.price else None,
            'image': fig.image.url if fig.image else None,
        } for fig in figurines]
        return Response({
            "status": "success",
            "data": figurines_data
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            "status": "error",
            "message": str(e)
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def collection_view(request):
    try:
        collection, created = Collection.objects.get_or_create(user=request.user)
        figurines = collection.figurines.all()
        figurines_data = [{
            'id': fig.id,
            'name': fig.name,
            'price': float(fig.price) if fig.price else None,
            'image': fig.image.url if fig.image else None,
        } for fig in figurines]
        return Response({
            "status": "success",
            "data": figurines_data
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            "status": "error",
            "message": str(e)
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_from_wishlist(request, figurine_id):
    try:
        figurine = get_object_or_404(Figurine, id=figurine_id)
        wishlist = Wishlist.objects.get(user=request.user)
        wishlist.figurines.remove(figurine)
        return Response({
            "status": "success",
            "message": "Removed from wishlist!",
            "data": {
                "figurine_id": figurine_id,
                "in_wishlist": False
            }
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            "status": "error",
            "message": str(e)
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_from_collection(request, figurine_id):
    try:
        figurine = get_object_or_404(Figurine, id=figurine_id)
        collection = Collection.objects.get(user=request.user)
        collection.figurines.remove(figurine)
        return Response({
            "status": "success",
            "message": "Removed from collection!",
            "data": {
                "figurine_id": figurine_id,
                "in_collection": False
            }
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            "status": "error",
            "message": str(e)
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def search_figurines(request):
    query = request.GET.get('q', '')
    figurines = Figurine.objects.filter(name__icontains=query)
    results = [{
        "id": fig.id,
        "name": fig.name,
        "price": float(fig.price) if fig.price else None,
        "image": fig.image.url if fig.image else None,
    } for fig in figurines]
    return Response(results)

def index(request):
    figurines = Figurine.objects.all()
    return render(request, "App.html", {"figurines": figurines})