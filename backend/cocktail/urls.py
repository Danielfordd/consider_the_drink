from django.urls import path
from .views import cocktail_search, cocktail_data

urlpatterns = [
    path('search/<query>/', cocktail_search),
    path('<cocktail_name>', cocktail_data)
]
