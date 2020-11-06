from django.shortcuts import render
from django.http import JsonResponse
from .models import Bar, FavCocktail


def user_bar(request, id):
    bar = Bar.objects.filter(user__id=id).order_by('ingredient__ingredient_name')  # noqa
    userbar = [b.ingredient.ingredient_name for b in bar]
    return JsonResponse({'userbar': userbar})


def user_favorites(request, id):
    favorites = [cocktail.cocktail.cocktail_name for cocktail in
                 FavCocktail.objects.filter(user__id=id)]
    return JsonResponse({"favorites": favorites})
