from django.shortcuts import render
from django.http import JsonResponse
from .models import Cocktail, CocktailTagJoin, CocktailTag
from django.views.decorators.csrf import ensure_csrf_cookie
from django.db.models import Count
from django.db  import connection


def cocktail_search(request, query):
    """
    Searchs cocktails using a case insensitive contains search using
    passed query string.
    """
    results = Cocktail.objects.filter(cocktail_name__icontains=query)
    cocktail = [{'id': res.id,
                 'name': res.cocktail_name,
                 'image': res.cocktail_image
                 } for res in results]
    return JsonResponse({'cocktails': cocktail})


@ensure_csrf_cookie
def cocktail_data(request, cocktail_name):
    """
    Returns cocktail's information for cocktail page.
    """
    result = Cocktail.objects.filter(cocktail_name=cocktail_name).prefetch_related('instruction_set', 'recipe_set','glassware_set', 'glassware_set__glass', 'garnish_set', 'garnish_set__garnish', 'served_set', 'served_set__served')[0]

    instructions = [{'order': res.order,
                     'instruction': res.instruction
                     }
                    for res in list(result.instruction_set.all().order_by('order'))]  # noqa

    recipe = [{'order': res.order,
               'ingredient': res.ingredient.ingredient_name,
               'ingredient_quantity': res.ingredient_quantity
               } for res in result.recipe_set.all().order_by('order')]

    glassware = [res.glass.glass_name
                 for res in list(result.glassware_set.all())]

    served = [res.served.served_name
              for res in list(result.served_set.all())]

    garnishes = [res.garnish.ingredient_name
                 for res in list(result.garnish_set.all())]

    ingredients = [rec['ingredient'] for rec in recipe]

    allCocktails = list(Cocktail.objects.all().prefetch_related('recipe_set', 'recipe_set__ingredient'))

    cts = {cocktail.cocktail_name:
           {'image': cocktail.cocktail_image,
            'ingredients': [i.ingredient.ingredient_name
                            for i in cocktail.recipe_set.all()]}
           for cocktail in allCocktails}

    res = []
    rone = []
    rtwo = []
    for ct in cts:
        ingCount = 0
        for ing in ingredients:
            if ing in cts[ct]['ingredients']:
                ingCount += 1
                if (ingCount >= len(cts[ct])) & (ct != cocktail_name):
                    res.append({'cocktail': ct, 'image': cts[ct]['image']})
                    break
        if ingCount == (len(cts[ct]['ingredients']) - 1) > 0:
            rone.append({'cocktail': ct, 'image': cts[ct]['image']})
        elif ingCount == (len(cts[ct]['ingredients']) - 2) > 0:
            rtwo.append({'cocktail': ct, 'image': cts[ct]['image']})

    [rone.append(cocktail) for cocktail in rtwo]

    return JsonResponse({'id': result.id,
                         'name': result.cocktail_name,
                         'image': result.cocktail_image,
                         'description': result.cocktail_description,
                         'instructions': instructions,
                         'recipe': recipe,
                         'garnish': garnishes,
                         'glassware': glassware,
                         'serving_styles': served,
                         'similar': rone})


@ensure_csrf_cookie
def cocktail_all(request,
                 page=1,
                 quantity=16,
                 sort="name_asc",
                 tags=False):
    """
    Return all cocktail's names and ingredients
    """
    start = 0
    if page != 1:
        start = quantity * (page - 1)
    end = (start + quantity)

    sort_by = ""
    if "name_asc" == sort:
        sort_by = "cocktail_name"
    else:
        sort_by = "-cocktail_name"

    if tags:
        tags = tags.split(",")[:-1]

    if tags:
        cocktails = list(Cocktail.objects
                         .filter(cocktailtagjoin__tag__tag__in=tags)
                         .annotate(num_tags=Count('cocktailtagjoin__tag'))
                         .filter(num_tags=len(tags))
                         .distinct()
                         .order_by(sort_by)[start:end])

        cocktailResponse = {'cocktails': [{'name': res.cocktail_name,
                                           'image': res.cocktail_image}
                            for res in cocktails]}

        return JsonResponse(cocktailResponse)
    else:
        cocktails = list(Cocktail.objects.all().order_by(sort_by)[start:end])

        cocktailResponse = {'cocktails': [{'name': res.cocktail_name,
                                           'image': res.cocktail_image}
                            for res in cocktails]}

        return JsonResponse(cocktailResponse)


def cocktail__sort(request, ingredients):
    ingTest = ingredients.split(",")[:-1]
    allCocktails = list(Cocktail.objects.all().prefetch_related('recipe_set', 'recipe_set__ingredient'))
    cts = {cocktail.cocktail_name: [i.ingredient.ingredient_name
                                    for i in cocktail.recipe_set.all()]
           for cocktail in allCocktails}
    res = []
    rone = []
    rtwo = []
    for ct in cts:
        ingCount = 0
        ingCheck = {}
        for ing in ingTest:
            if ing in ingCheck:
                continue
            else:
                ingCheck[ing] = True
            if ing in cts[ct]:
                ingCount += 1
                if ingCount >= len(cts[ct]):
                    res.append(ct)
                    break
        if ingCount == (len(cts[ct]) - 1) > 0:
            rone.append(ct)
        elif ingCount == (len(cts[ct]) - 2) > 0:
            rtwo.append(ct)
    return JsonResponse({'exact': res, 'one_off': rone, 'two_off': rtwo})


def load_tags(request):
    """
    Query all tag names and returns them.
    """
    tags = [tag.tag for tag in CocktailTag.objects.all()]
    return JsonResponse({'tags': tags})
