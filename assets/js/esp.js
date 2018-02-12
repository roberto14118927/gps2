var URL = 'http://142.44.162.71:1234';
var imei_global = "00000000000";

 var socket = io.connect(URL, {'forceNew': true
		});

function open(id) {
    id_global = id;
    var sendData = {
        'id': id_global
    };
    socket.emit('open-esp', sendData);
}






  