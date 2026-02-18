from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from django.utils.html import format_html
from .models import UserProfile, FavouriteDestination

# Inline profile editor inside User admin
class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = "Profile"
    fk_name = "user"

# Extend default User admin with inline profile
class CustomUserAdmin(UserAdmin):
    inlines = (UserProfileInline,)

# Unregister default User admin and register custom one
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)

# Separate UserProfile admin with thumbnail preview
@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "phone", "bio", "profile_picture", "profile_pic_preview")
    search_fields = ("user__username", "phone")
    list_filter = ("user__is_active",)

    def profile_pic_preview(self, obj):
        if obj.profile_picture:
            return format_html(
                '<img src="{}" style="width:50px; height:50px; border-radius:50%;" />',
                obj.profile_picture
            )
        return "No Image"

    profile_pic_preview.short_description = "Preview"

# favorite destination model and admin
@admin.register(FavouriteDestination)
class FavoriteDestinationAdmin(admin.ModelAdmin):
    list_display = ["user", "destination"]
    list_filter = ["user"]
    search_fields = ["user__username", "destination__name"]

# avatar suggestion model and admin
from .models import AvatarSuggestion
@admin.register(AvatarSuggestion)
class AvatarSuggestionAdmin(admin.ModelAdmin):
    list_display = ["image_url"]
    list_filter = ["image_url"]
    search_fields = ["image_url"]