from django.forms import CharField,ImageField
from django.utils.translation import ugettext_lazy as _

from wagtail.users.forms import UserEditForm, UserCreationForm

class CustomUserEditForm(UserEditForm):
    role = CharField(required=True, label=_("role"))
    profile_image = ImageField(
        required=False,
        label=_('Profile Image'),
    )

class CustomUserCreationForm(UserCreationForm):
    role = CharField(required=True, label=_("role"))
    profile_image = ImageField(
        required=False,
        label=_('Profile Image'),
    )
