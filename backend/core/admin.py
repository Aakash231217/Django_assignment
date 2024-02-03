from django.contrib import admin
from .models import Post

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'content')  # Assuming the 'Post' model has 'title' and 'content' fields.
    list_filter = ('title',)  # 'title' is usually not good for filtering unless it's a limited set of options. Consider replacing with appropriate fields.
