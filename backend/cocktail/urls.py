from django.urls import path
from .views import load_tags, cocktail_search, cocktail_data, cocktail_all, cocktail__sort  # noqa

urlpatterns = [
    path("tags/all", load_tags),
    path("all", cocktail_all),
    path("all/<int:page>", cocktail_all),
    path("all/<int:page>/<int:quantity>", cocktail_all),
    path("all/<int:page>/<int:quantity>/<sort>", cocktail_all),
    path("all/<int:page>/<int:quantity>/<sort>/<tags>", cocktail_all),
    path("filter/<ingredients>", cocktail__sort),
    path('search/<query>', cocktail_search),
    path('<cocktail_name>', cocktail_data)
]
