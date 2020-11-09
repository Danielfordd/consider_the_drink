from django.shortcuts import render
from django.http import JsonResponse
from .models import Cocktail, CocktailTagJoin, CocktailTag


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


def cocktail_data(request, cocktail_name):
    """
    Returns cocktail's information for cocktail page.
    """
    result = list(Cocktail.objects.filter(cocktail_name=cocktail_name))[0]

    instructions = [{'order': res.order,
                     'instruction': res.instruction
                     }
                    for res in list(result.instruction_set.all().order_by('order'))]  # noqa

    recipe = [{'order': res.order,
               'ingredient': res.ingredient.ingredient_name,
               'ingredient_quantity': res.ingredient_quantity
               } for res in list(result.recipe_set.all().order_by('order'))]

    glassware = [res.glass.glass_name
                 for res in list(result.glassware_set.all())]

    served = [res.served.served_name
              for res in list(result.served_set.all())]

    garnishes = 1
    return JsonResponse({'name': result.cocktail_name,
                         'image': result.cocktail_image,
                         'description': result.cocktail_description,
                         'instructions': instructions,
                         'recipe': recipe,
                         'garnish': garnishes,
                         'glassware': glassware,
                         'serving_styles': served})


def cocktail_all(request,
                 page=1,
                 quantity=20,
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
        tags = tags.split(",")

    if tags:
        cocktails = list(Cocktail.objects
                         .filter(cocktailtagjoin__tag__tag__in=tags)
                         .distinct()
                         .order_by(sort_by)[start:end])
        print(cocktails)
        cocktailResponse = {'cocktails': [{'name': res.cocktail_name, 'image': res.cocktail_image} for res in cocktails]}  # noqa
        return JsonResponse(cocktailResponse)
    else:
        cocktails = list(Cocktail.objects.all().order_by(sort_by)[start:end])
        cocktailResponse = {'cocktails': [{'name': res.cocktail_name, 'image': res.cocktail_image} for res in cocktails]}  # noqa
        return JsonResponse(cocktailResponse)


def cocktail__sort(request, ingredients):
    ingTest = ingredients.split(",")[:-1]
    allCocktails = list(Cocktail.objects.all())
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
