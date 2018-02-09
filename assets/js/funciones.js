
    var map;
    var markers = [];
    var html = "";
    var geocoder;
    var infowindow;
    var imeig = "";
function Notificacion(imei){
    Push.create("Vehiculo en movimiento",{
      body: "GPS UPGCH",
      icon:"",
      timeout:"10000",
      vibrate: [100,100,100],
      onClick: function()
      {  
        $.ajax({
      data : {'imei':imei},
      url : '/busqueda_ajax/',
      type : 'get',
      success: function(data){
        if (data != ""){
          moment().locale('es');
          moment().format('MMMM Do YYYY, h:mm:ss a');

          var fecha = data[0].fields.date_create;
          fecha = String(fecha);
          fecha = fecha.substring(0, 10);
          var hora = data[0].fields.date_create;
          hora = String(hora);
          hora = hora.substring(11, 19);
          var actividad = fecha;
          for (var i = 0; i < actividad.length; i++) {
            actividad = actividad.replace("-", "");
          }
          var año = fecha.substring(0,4);
          var mes = fecha.substring(5,7);
          var dia = fecha.substring(8,10);

          var h = hora.substring(0,2);
          var m = hora.substring(3,5);
          //var tiempo = moment(actividad, "YYYYMMDD").fromNow()
          var tiempo = moment([año,(mes-1),dia,h,m]).fromNow();
          var conca = fecha + "," + hora;
          html = ""; 
          html += '<h11>LATITUD: '+data[0].fields.latit+'</h11>';
          html += '<br/>';
          html += '<br/>';
          html += '<h11>LONGITUD: '+data[0].fields.longi+'</h11>';
          html += '<br/>';
          html += '<br/>';
          html += '<h11>FECHA: '+ fecha +' </h11>';
          html += '<br/>';
          html += '<br/>';
          html += '<h11>HORA: '+ hora +' </h11>';
          html += '<br/>';
          html += '<br/>';
          html += '<h11>COMBUSTIBLE: '+data[0].fields.combu+' </h11>';
          html += '<br/>';
          html += '<br/>';
          html += '<h11>ACTIVO: '+tiempo+' </h11>';
          //$('#datos').html(html);
          var lat = data[0].fields.latit;
          var lon = data[0].fields.longi;
          lat = (lat*1);
          lon = (lon*1);
          initMap(lat,lon, 16);
          sendimei(data[0].fields.imei);
        }else{
          html = ""; 
          html = '<div></div>';
          $('#datos').html(html);
          $('#address').html(html);
          init();
          sendimei(imei);
        }
      }
    });
        this.close();
      }
    });
}

function init(){
geocoder = new google.maps.Geocoder();
infowindow = new google.maps.InfoWindow();
var uluru = {lat:16.768099, lng:-93.0854785};
map = new google.maps.Map(document.getElementById('mapa'), {
  zoom:7,
  center: uluru
});
}

function initMap(latin, lngin, zin) {
setMapOnAll(null);
var uluru = {lat:latin, lng:lngin};

var marker = new google.maps.Marker({
  position: uluru,
  map: map,
  draggable: true,
  title: 'Arrastrame'
});
markers.push(marker);

map.setZoom(zin);
map.panTo(marker.position);

google.maps.event.addListener(marker, 'position_changed', function(){
    getMarkerCoords(marker)
});

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}  
var latlng = new google.maps.LatLng(latin, lngin);
geocoder.geocode ({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[0]) {
          $('#address').text(results[0].formatted_address);
            //map.fitBounds(results[0].geometry.viewport);
            //marker.setMap(map);
            //marker.setPosition(latlng);           
            infowindow.setContent(results[0].formatted_address);
            infowindow.open(map, marker);
       }
    }
  else {
       $('#address').text("direccion error");
  }
});
}

function call_imei(imei){
imeig = imei;
$.ajax({
  data : {'imei':imei},
  url : '/busqueda_ajax/',
  type : 'get',
  success: function(data){
    if (data != ""){
      moment().locale('es');
      moment().format('MMMM Do YYYY, h:mm:ss a');

      var fecha = data[0].fields.date_create;
      fecha = String(fecha);
      fecha = fecha.substring(0, 10);
      var hora = data[0].fields.date_create;
      hora = String(hora);
      hora = hora.substring(11, 19);
      var actividad = fecha;
      for (var i = 0; i < actividad.length; i++) {
        actividad = actividad.replace("-", "");
      }
      var año = fecha.substring(0,4);
      var mes = fecha.substring(5,7);
      var dia = fecha.substring(8,10);

      var h = hora.substring(0,2);
      var m = hora.substring(3,5);
      //var tiempo = moment(actividad, "YYYYMMDD").fromNow()
      var tiempo = moment([año,(mes-1),dia,h,m]).fromNow();
      var conca = fecha + "," + hora;
      html = ""; 
      /*html += '<li class=has-sub expand>';
      html += '<a href="javascript:;">';        
      html += '<i class="material-icons">inbox</i>';
      html += '<span>Informacion GPS</span>'
      html += '<li><a>fecha: '+ fecha +'</a></li>';
      html += '<li><a>hora: '+ hora +'</a></li>';
      html += '<li><a>activo: '+tiempo+' </a></li>';
      html += '</a>';
      html += '</li>';
      $('#datos').html(html);*/
      /*html += '<hr/>';
      html += '<h8 style="font-size:15px; color:white;"> LATITUD: '+data[0].fields.latit+'</h8>';
      html += '<br/>';
      html += '<br/>';
      html += '<h8 style="font-size:15px; color:white;"> LONGITUD: '+data[0].fields.longi+'</h8>';
      html += '<br/>';
      html += '<br/>';
      html += '<h8 style="font-size:15px; color:white;"> FECHA: '+ fecha +' </h8>';
      html += '<br/>';
      html += '<br/>';
      html += '<h8 style="font-size:15px; color:white;"> HORA: '+ hora +' </h8>';
      html += '<br/>';
      html += '<br/>';
      html += '<h8 style="font-size:15px; color:white;"> COMBUSTIBLE: '+data[0].fields.combu+' </h8>';
      html += '<br/>';
      html += '<br/>';*/
      /*html += '<h8 style="font-size:15px; color:white;"> ACTIVO: '+tiempo+' </h8>';
      html += '<br/>';
      html += '<br/>';*/
      html += '<span class="text-danger">'+tiempo+'</span>';
      $('#actividad').html(html);
      var lat = data[0].fields.latit;
      var lon = data[0].fields.longi;
      lat = (lat*1);
      lon = (lon*1);
      initMap(lat,lon, 16);
      sendimei(data[0].fields.imei);
    }else{
      html = ""; 
      html = '<div></div>';
      $('#datos').html(html);
      $('#address').html(html);
      init();
      sendimei(imei);
    }
  }
});
}

function trazaRuta(){
if(imeig != ""){
    var dateStart = document.getElementById('dateStarth').value;
    var dateEnd = document.getElementById('dateEndh').value;
    $.ajax({
      data : {'dateStart':moment(dateStart,'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'), 'dateEnd':moment(dateEnd,'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),'imeig':imeig},
      url : '/traza_ajax/',
      type : 'get',
      success: function(data){
        var dato = data;
        $("#modal-dialog").modal('hide');  
        //var myJSON = JSON.stringify(data); 
        var flightPath = new google.maps.Polyline({
          path: dato,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 0.5,
          strokeWeight: 6
        });
        // Creando la ruta en el mapa
        flightPath.setMap(map);
        
      }
    });
}else{
  alert("Seleccione un usuario")
}
}

function lista_usuarios(){
$("#modal-dialog1").modal('show');  
}

function date_busca(){
var dateSearch = document.getElementById('dateSearch').value;
if(dateSearch != ""){
  $.ajax({
    data : {'dateSearch':moment(dateSearch,'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')},
    url : '/usuarioactivo_ajax/',
    type : 'get',
    success: function(data){
      if (data.form_is_valid) {
        $("#rtabla").html(data.html_usuarios_list); 
        if ($('#data-table').length !== 0) {
          $('#data-table').DataTable({
            language: {
                  "decimal": "",
                  "emptyTable": "No hay información",
                  "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
                  "infoEmpty": "Mostrando 0 a 0 de 0 Entradas",
                  "infoFiltered": "(Filtrado de _MAX_ total entradas)",
                  "infoPostFix": "",
                  "thousands": ",",
                  "lengthMenu": "Mostrar _MENU_ Entradas",
                  "loadingRecords": "Cargando...",
                  "processing": "Procesando...",
                  "search": "Buscar:",
                  "zeroRecords": "Sin resultados encontrados",
                  "paginate": {
                      "first": "Primero",
                      "last": "Ultimo",
                      "next": "Siguiente",
                      "previous": "Anterior"
                  }
              },
              /*dom: 'Bfrtip',
              buttons: [
                  { extend: 'copy', className: 'btn-sm' },
                  { extend: 'csv', className: 'btn-sm' },
                  { extend: 'excel', className: 'btn-sm' },
                  { extend: 'pdf', className: 'btn-sm' },
                  { extend: 'print', className: 'btn-sm' }
              ],*/
              responsive: true
          });
        }
      } 
    }
  });
}else{
  alert("Llene el campo de fecha");
}
}

function lista_conductores(){
$("#modal-dialog2").modal('show');  
$.ajax({
  data : {},
  url : '/listaconductores_ajax/',
  type : 'get',
  success: function(data){
    if (data.form_is_valid) {
      $("#rtabla1").html(data.html_lista_conductores); 
      if ($('#data-table1').length !== 0) {
        $('#data-table1').DataTable({
          language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            "infoEmpty": "Mostrando 0 a 0 de 0 Entradas",
            "infoFiltered": "(Filtrado de _MAX_ total entradas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        },
            /*dom: 'Bfrtip',
            buttons: [
                { extend: 'copy', className: 'btn-sm' },
                { extend: 'csv', className: 'btn-sm' },
                { extend: 'excel', className: 'btn-sm' },
                { extend: 'pdf', className: 'btn-sm' },
                { extend: 'print', className: 'btn-sm' }
            ],*/
            responsive: true
        });
    }
    } 
  }
});
}


  