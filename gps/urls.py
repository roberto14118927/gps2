from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static

from gps.views import LoginClass
from gps.views import gps
from gps.views import climas
from gps.views import puertas
from gps.views import logout
from gps.views import BusquedaAjaxView
from gps.views import TrazaRuta
from gps.views import UsuarioActivo
from gps.views import ListaConductor
from . import views

app_name = 'front'


urlpatterns = [
	url(r'^$', LoginClass.as_view(), name = 'login'),
	url(r'^gps$', gps, name = 'gps'),
	url(r'^climas$', climas, name = 'climas'),
	url(r'^puertas$', puertas, name = 'puertas'),
	url(r'^logout$', logout, name = 'logout'),
	url(r'^busqueda_ajax/$', BusquedaAjaxView.as_view()),
	url(r'^traza_ajax/$', TrazaRuta.as_view()),
	url(r'^usuarioactivo_ajax/$', UsuarioActivo.as_view()),
	url(r'^listaconductores_ajax/$', ListaConductor.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)