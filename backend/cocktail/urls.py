from django.urls import path
from .views import cocktail_search, cocktail_data, cocktail_all, cocktail__sort

urlpatterns = [
    path("all/", cocktail_all),
    path("filter/<ingredients>", cocktail__sort),
    path('search/<query>/', cocktail_search),
    path('<cocktail_name>', cocktail_data)
]
