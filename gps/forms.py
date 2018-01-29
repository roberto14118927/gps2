from django import forms 
from django.contrib.auth.models import User
from django.contrib.auth.models import Group



import datetime

ERROR_MESSAGE_USER = {'unique' : 'El Username ya se encuentra registrado', 'invalid' : 'el username es incorrecto'} 
ERROR_MESSAGE_PASSWORD = {'required' : 'El password es requerido'}
ERROR_MESSAGE_EMAIL = {'invalid' : 'Ingrese un correo valido'}


"""
Functions
"""
def must_bet_gt(value_password):
	if len(value_password) < 2:
		raise forms.ValidationError('El password debe contener por lo menos 5 caracteres')	

class LoginUserForm(forms.Form):
	username = forms.CharField(label='', max_length = 20)
	password = forms.CharField(label='', max_length = 20, widget = forms.PasswordInput() )

	def __init__(self, *args, **kwargs):
		super(LoginUserForm, self).__init__(*args, **kwargs)
		self.fields['username'].widget.attrs.update( {'id': 'username_login', 'name':'username_login', 'class': 'form-control input-lg', 'placeholder': 'Usuario', 'autofocus': 'autofocus'} ) #aqui se agregan las clases y los id de los input
		self.fields['password'].widget.attrs.update( {'id': 'password_login', 'name':'password_login', 'class': 'form-control input-lg', 'placeholder': 'Constraseña'} )