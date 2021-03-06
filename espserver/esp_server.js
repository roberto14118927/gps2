var express = require('express');
var app = express();
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow- Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        next();
    });

const net = require('net');
const hex2ascii = require('hex2ascii');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const os = require('os');
const { Pool, Client } = require('pg')

const client = new Client({
  user: 'gps',
  host: 'localhost',
  database: 'upgch',
  password: 'gps123456',
  port: 5432,
});

/*const client = new Client({
  user: 'gps',
  host: '142.44.162.71',
  database: 'gpsdb',
  password: 'gps123456',
  port: 5432,
});*/

client.connect();

var conta = 0;
var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
  for (var k2 in interfaces[k]) {
    var address = interfaces[k][k2];
    if (address.family === 'IPv4' && !address.internal) {
      addresses.push(address.address);
    }
  }
}

app.use(express.static('static/js'))

var HOST = addresses[2];
var PORT = 3000;
server.listen(1234);
var arr;
var arr1;
var global_imei="";

const esp_sockets = [];
var web_sockets = [];

var mac_in = "";

io.on('connection', function(socket) {
    
  web_sockets.push(socket)  

  socket.on('disconnect', function() {
      var idx = web_sockets.indexOf(socket);
      if (idx != -1) {
        web_sockets.splice(idx, 1);
      }
  });

  socket.on('end', function() {
      
  });

  socket.on('error', function() {

  });

  socket.on('timeout', function() {
      
  });

  socket.on('close', function() {
      
  });

  socket.on('open-esp', function(data) {
    sendData(data);
  });

});


io.on('error',function(err){ 
  console.error(err)
});



server.listen(PORT, function(){
  console.log("Servidor corriendo puerto: " + PORT)
});



var ESP8266 = net.createServer(function(sock) {

    sock.on('data', function(data) {     
      var datosin = data.toString().split(".");
      if (datosin.length == 0) {
         return;
      }
      switch (datosin[1]) {
        case "0": // registro de dispositivo
            esp_sockets[datosin[0]] = sock; 
            mac_in=datosin[0];
            const text = 'SELECT * FROM gps_espregister WHERE mac=($1)'
            const values = [mac_in]
            client.query(text, values, (err, res) => {
              //done();
              if (err) {
                  //Dispositivo no resgistrado   
              } else {
                  console.log(res.rows[0])
                  if(res.rows[0] == null){
                    console.log("Registro exitoso")
                    var dt = new Date();
                    var utcDate = dt.toUTCString();
                    const text = 'INSERT INTO gps_espregister(mac, date_create, cmp_name) VALUES($1, $2, $3) RETURNING *'
                    const values = [datosin[0], utcDate, datosin[2]]
                    client.query(text, values, (err, res) => {
                      if (err) {
                          console.log(err.stack)
                      } else {
                          console.log(res.rows[0])
                        }
                    });
                  }
                }
            });
        break;
        case "1":
            console.log("Recepcion de datos");
        break;
      } 
      console.log("CONECTADO: " + Object.keys(esp_sockets).length);
    });
    
    sock.on('close', function(data) {
      console.log("close");
    });
    sock.on('timeout', function(data) {
      console.log("timeout");
    });

    sock.on('end', function() {
      var idx = esp_sockets.indexOf(sock);
      if (idx != -1) {
        esp_sockets.splice(idx, 1);
      }
      console.log("");
    });

    sock.on('error', function(data) {
      console.log("error...");
    });

});

ESP8266.on('error', function(e) {
  console.log("Error: Necesario reiniciar...");
  if (e.code == 'EADDRINUSE') {
    console.log('Address in use, retrying...');
    setTimeout(function() {
      ESP8266.close();
      ESP8266.listen(PORT, PORT);
    }, 1000);
  }
});

ESP8266.listen(PORT, PORT);

//FUNCIONES*********************************
function sendData(data){
  const text = 'SELECT * FROM gps_espregister WHERE id_esp=($1)'
  const values = [data.id]
  client.query(text, values, (err, res) => {
    if (err) {
        console.log(err.stack)
    } else {
       var MAC = res.rows[0].mac;
       if (esp_sockets[MAC]) {
            try {
                esp_sockets[MAC].write("01");
                io.emit('status', {
                  statusout:"2"
                });
                console.log("Enviado")
            } catch (err) {
                console.log("Error Envio");
                io.emit('status', {
                  statusout:"1"
                });
              } 
        } 
        else {
            console.log("El dispositivo inactivo");
            io.emit('status', {
              statusout:"0"
            });
        }
      }
  });
}


//5C:CF:7F:80:E6:8B
