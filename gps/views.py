from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from django.shortcuts import get_object_or_404
from django import template
from django.views.generic import TemplateView
from django.shortcuts import render
from django.shortcuts import redirect

from django.contrib.auth import authenticate
from django.contrib.auth import login
from django.contrib.auth import login as login_django
from django.contrib.auth import logout as logout_django
from django.contrib.auth import update_session_auth_hash

from django.contrib.auth.decorators import login_required
from django.urls import reverse_lazy

from gps.forms import LoginUserForm

from django.views.generic import View
from django.views.generic import DetailView
from django.views.generic import CreateView
from django.views.generic.edit import UpdateView
from django.contrib.auth.mixins import LoginRequiredMixin

from django.http import HttpResponseRedirect
from django.http import HttpResponseBadRequest
from django.http import HttpResponse
from django.http import HttpRequest

from django.contrib import messages
from django.contrib.messages.views import SuccessMessageMixin

from django.views.generic.list import ListView

from django.core import serializers

from gps.models import Gpsus
from gps.models import Gpsub

#importaciones sobre el sistema operativo
import os
from django.conf import settings

class LoginClass(View):
	form = LoginUserForm()
	message = None
	template = 'front/login.html'

	def get(self, request, *args, **kwargs):
		if request.user.is_authenticated:
			next_url = request.GET.get('next')
			if next_url:
			     return redirect(next_url)
			else:
				 return redirect('front:home')
		return render(request, self.template, self.get_context() )

	def post(self, request, *args, **kwargs):
		username_post = request.POST['username']
		password_post = request.POST['password']

		user = authenticate( username = username_post , password = password_post)
		if user is not None:
			login_django(request, user)#con esto ya podremos utilizar el user dentro de nuestro proyecto
			next_url = request.GET.get('next')
			if next_url:
			     return redirect(next_url)
			else:
				 return redirect('front:home')
		else:
			self.message = "Username o password incorrecto"
		return render(request, self.template, self.get_context() )

	def get_context(self):
		return {'form': self.form, 'message': self.message}

class BusquedaAjaxView(TemplateView):
	def get(self, request, *args, **kwargs):
		imei_get = request.GET['imei']
		datosout = Gpsub.objects.filter(imei__exact = imei_get).order_by('-date_create')
		data = serializers.serialize('json',datosout, 
			fields=('imei', 'latit', 'longi', 'combu','date_create'))
		return HttpResponse(data, content_type='application/json')

@login_required( login_url = 'front:login' )
def logout(request):
	logout_django(request)
	return redirect('front:login')

@login_required( login_url = 'front:login' )
def home(request):
	gpsus = Gpsus.objects.all()
	context ={
		'gpsus': gpsus
	}
	return render(request,'front/home.html',context)

@login_required( login_url = 'front:login' )
def climas(request):
	context ={
	}
	return render(request,'front/climas.html',context)