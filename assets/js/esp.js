var URL = 'http://142.44.162.71:1234';
var imei_global = "00000000000";

var socket = io.connect(URL, {'forceNew': true});

socket.on('status', function(data){
    //console.log(data.status);
    alert(data.statusout);
    /*switch (data.statusout) {
        case 0:
        $.gritter.add({
			title: 'UPGCH',
			text: 'DISPOSITIVO INACTIVO',
			image: '',
			sticky: false,
			time: ''
		});
        break;

        case 1:
        $.gritter.add({
			title: 'UPGCH',
			text: 'ERROR ENVIADO',
			image: '',
			sticky: false,
			time: ''
		});
        break;

        case 2:
        $.gritter.add({
			title: 'UPGCH',
			text: 'APERTURTA EXITOSA',
			image: '',
			sticky: false,
			time: ''
		});
        break;
    } */
});

function open(id) {
    id_global = id;
    var sendData = {
        'id': id_global
    };
    socket.emit('open-esp', sendData);
}






  