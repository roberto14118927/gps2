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
from gps.models import Gpson

#importaciones sobre el sistema operativo
import os
from django.conf import settings
import datetime
from django.utils.dateparse import parse_datetime
import pytz
from django.core import serializers
from django.utils.timezone import utc
import simplejson as json
from django.http import JsonResponse
from django.template.loader import render_to_string

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
				 return redirect('front:gps')
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
				 return redirect('front:gps')
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

class TrazaRuta(TemplateView):
	def get(self, request, *args, **kwargs):
    	#la = pytz.timezone('America/Mexico_City')
		dateStart = request.GET['dateStart']
		dateEnd = request.GET['dateEnd']
		imeig = request.GET['imeig']
		la = pytz.timezone('America/New_York')
		start = datetime.datetime.strptime(dateStart, '%Y-%m-%d %H:%M:%S')
		end = datetime.datetime.strptime(dateEnd, '%Y-%m-%d %H:%M:%S')
		aware_start_time = la.localize(start)
		aware_end_time = la.localize(end)
		gpsfe = Gpsub.objects.filter(date_create__range=(aware_start_time, aware_end_time), imei__exact=imeig).order_by('date_create')
		json_list=[]
		for entry in gpsfe:
			if (entry.latit != "NaN" and entry.longi != "NaN"):
				lat = entry.latit
				lon = entry.longi
				lat1 = float(lat)
				lon1 = float(lon)
				json_entry = {'lat':lat1, 'lng':lon1}
				json_list.append(json_entry)
		return HttpResponse(json.dumps(json_list), content_type='application/json')

class UsuarioActivo(TemplateView):
	def get(self, request, *args, **kwargs):
		data = dict()
		dateSearch = request.GET['dateSearch']
		la = pytz.timezone('America/New_York')
		dateSearch = dateSearch[:10]
		data['form_is_valid'] = True
		dateSearchStar = dateSearch +" 00:00:00"
		dateSearchEnd = dateSearch + " 23:59:59"
		start = datetime.datetime.strptime(dateSearchStar, '%Y-%m-%d %H:%M:%S')
		end = datetime.datetime.strptime(dateSearchEnd, '%Y-%m-%d %H:%M:%S')
		aware_start_time = la.localize(start)
		aware_end_time = la.localize(end)
		gpson = Gpson.objects.filter(date_create__range=(aware_start_time, aware_end_time)).order_by('-date_create')
		data['html_usuarios_list'] = render_to_string('front/bases/includ/list_usuarios.html', {
			'gpson': gpson
		})
		return JsonResponse(data)

class ListaConductor(TemplateView):
	def get(self, request, *args, **kwargs):
		data = dict()
		data['form_is_valid'] = True
		gpsu = Gpsus.objects.all()
		data['html_lista_conductores'] = render_to_string('front/bases/includ/list_conductores.html', {
			'gpsu': gpsu
		})
		return JsonResponse(data)


@login_required( login_url = 'front:login' )
def logout(request):
	logout_django(request)
	return redirect('front:login')



@login_required( login_url = 'front:login' )
def gps(request):
	gpsus = Gpsus.objects.all()
	context ={
		'gpsus': gpsus
	}
	return render(request,'front/gps.html',context)

@login_required( login_url = 'front:login' )
def climas(request):
	context ={
	}
	return render(request,'front/climas.html',context)