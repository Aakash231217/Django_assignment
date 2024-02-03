from django.urls import path, include  # Make sure to import include from django.urls
from .views import ArticleViewSet, UserViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register('article', ArticleViewSet, basename='articles')  # Updated basename to 'articles' for consistency
router.register('users', UserViewSet)

urlpatterns = [
    path('api/',include(router.urls)),
]
