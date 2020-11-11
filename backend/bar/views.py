from django.shortcuts import render
from django.http import JsonResponse
from .models import Bar, FavCocktail
from cocktail.models import Cocktail, CocktailNote
from django.contrib.auth.models import User
import simplejson as json


def user_bar(request, id):
    bar = Bar.objects.filter(user__id=id).order_by('ingredient__ingredient_name')  # noqa
    userbar = [b.ingredient.ingredient_name for b in bar]
    return JsonResponse({'userbar': userbar})


def user_favorites(request, id):
    favorites = [cocktail.cocktail.cocktail_name for cocktail in
                 FavCocktail.objects.filter(user__id=id)]
    return JsonResponse({"favorites": favorites})


def is_favorite(request, cocktailId, userId):
    if userId is None or cocktailId is None:
        return JsonResponse({'favorited': False})
    favorited = FavCocktail.objects.filter(cocktail=cocktailId, user=userId)
    fav = len(favorited) > 0
    return JsonResponse({'favorited': fav})


def change_favorite(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    cocktailId = int(body['cocktail'])
    userId = int(body['id'])

    exists = FavCocktail.objects.filter(cocktail=cocktailId, user=userId)
    if len(exists) > 0:
        exists.delete()
        return JsonResponse({'favorited': False})
    user = User.objects.get(pk=userId)
    cocktail = Cocktail.objects.get(pk=cocktailId)
    fav = FavCocktail(user=user, cocktail=cocktail)
    fav.save()
    return JsonResponse({'favorited': True})


def create_note(request):
    body_unicode = request.body.decode('utf-8')

    note = json.loads(body_unicode)['note']
    cocktailId = int(json.loads(body_unicode)['cocktailId'])
    userId = int(json.loads(body_unicode)['userId'])

    cocktail = Cocktail.objects.get(pk=cocktailId)
    user = User.objects.get(pk=userId)

    new_note = CocktailNote(cocktail=cocktail, user=user, note=note)
    new_note.save()
    notes = [(note.note, note.id) for note in CocktailNote.objects.filter(user__id=userId, cocktail__id=cocktailId)]
    return JsonResponse({'notes': notes})


def all_notes(request, userId, cocktailId):
    notes = [(note.note, note.id) for note in CocktailNote.objects.filter(user__id=userId, cocktail__id=cocktailId)]
    return JsonResponse({'notes': notes})
