"""api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from rest_framework_jwt.views import obtain_jwt_token
from django.urls import path, include, re_path
from .views import FrontendAppView
import debug_toolbar
from django.conf import settings


urlpatterns = [
    path('__debug__/', include(debug_toolbar.urls)),
    path('admin/', admin.site.urls),
    path('api/auth/token-auth/', obtain_jwt_token),
    path('api/auth/', include('authentication.urls')),
    path('api/ingredients/', include('ingredient.urls')),
    path('api/cocktails/', include('cocktail.urls')),
    path('api/user/', include('bar.urls')),
    re_path(r'^', FrontendAppView.as_view()),
]
