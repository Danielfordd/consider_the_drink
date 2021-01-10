def calculate_cocktails(cocktails, ingredients):
    exactIngredients = []
    oneIngredientAway = []
    twoIngredientsAway = []
    for cocktail in cocktails:
        ingCount = 0
        for ingredient in ingredients:
            if ingredient in cocktails[cocktail]['ingredients']:
                ingCount += 1
                if (ingCount >= len(cocktails[cocktail])):
                    exactIngredients.append({'cocktail': cocktail,
                                             'image': cocktails[cocktail]['image']})  # noqa
                    break
        if ingCount == (len(cocktails[cocktail]['ingredients']) - 1) > 0:
            oneIngredientAway.append({'cocktail': cocktail,
                                      'image': cocktails[cocktail]['image']})

        elif ingCount == (len(cocktails[cocktail]['ingredients']) - 2) > 0:
            twoIngredientsAway.append({'cocktail': cocktail,
                                       'image': cocktails[cocktail]['image']})

    return (exactIngredients, oneIngredientAway, twoIngredientsAway)
