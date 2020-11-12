from django.urls import path
from .views import all_ingredients

urlpatterns = [
    path('all', all_ingredients)
]


# from django.urls import path
# from .views import current_user, UserList

# urlpatterns = [
#     path('current_user/', current_user),
#     path('users/', UserList.as_view())
# ]
