from .views import RegistrationView, UsernameValidationView, EmailValidationView, LoginView
from django.urls import path
from django.views.decorators.csrf import csrf_exempt  # need this to tell django to make exception to this POST request 


urlpatterns = [
    path('register', RegistrationView.as_view(), name='register'),
    path('validate-username', csrf_exempt(UsernameValidationView.as_view()), name='username-validate'),
    path('validate-email', csrf_exempt(EmailValidationView.as_view()), name='email-validate'),
    path('login', LoginView.as_view(), name='login'),
    path('', LoginView.as_view(), name='login'),
]
