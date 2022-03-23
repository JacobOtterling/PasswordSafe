from django.shortcuts import render
from django.views import View
import json
from django.http import JsonResponse
from django.contrib.auth.models import User
from  validate_email import validate_email
from django.contrib import messages
from django.contrib import auth

# Create your views here.
class RegistrationView(View):  # render the registreation form. Register inherits from base_auth
    def get(self, request, *args, **kwargs):
        return render(request, 'authentication/register.html')
    
    def post(self, request, *args, **kwargs):  # when registering new account
        # get data
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        context = {  # neccessary for keeping fieldValues between renders
            'fieldValues': request.POST
        }
        # validate data
        if not User.objects.filter(username=username).exists(): 
            if not User.objects.filter(email=email).exists():
                if len(password) < 6:
                    messages.error(request, 'Password too short')
                    return render(request, 'authentication/register.html', context)
                user = User.objects.create_user(username=username, email=email)  # create user
                user.set_password(password) # set password
                user.save() # save user, can add functionalty to only activate account after email-validation. See django EmailMessage for more 
                messages.success(request, 'Account successfully registered')
                return render(request, 'authentication/register.html')


        return render(request, 'authentication/register.html')



class UsernameValidationView(View):  # validate username/emails/passwords to db asynchronously 
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        username = data['username']

        if not str(username).isalnum():  # check if username contains non-alphabetic characters
            return JsonResponse({'username_error': 'Username should be alphabetic'}, status=400)  # bad request
       
        if User.objects.filter(username=username).exists():  # check if username alrady exists
            return JsonResponse({'username_error': 'Username already taken'}, status=409)  # conflicting request
        
        return JsonResponse({'username_valid': True})


class EmailValidationView(View):  
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        email = data['email']

        if not validate_email(email):  # check if sumitted email is valid 
            return JsonResponse({'email_error': 'Not a valid email'}, status=400)  # bad request
       
        if User.objects.filter(email=email).exists():  # check if username alrady exists
            return JsonResponse({'email_error': 'Email already taken'}, status=409)  # conflicting request
        
        return JsonResponse({'email_valid': True})


class LoginView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'authentication/login.html')

    def post(self, request, *args, **kwargs):
        username = request.POST['username']
        password = request.POST['password']

        if username and password:
            user = auth.authenticate(username=username, password=password)

            if user:
                auth.login(request, user)
                return render(request, 'home/')
            messages.error(request, 'Incorrect login details, try again')
            return render(request, 'authentication/login.html')
        
        messages.error(request, 'Please enter your account details')
        return render(request, 'authentication/login.html')