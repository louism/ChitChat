var server = require('websocket').server, http = require('http');

var clients = [];
var socket = new server({
    httpServer: http.createServer().listen(8001)
});

socket.on('request', function(request) {
    var connection = request.accept(null, request.origin);
    var index = clients.push(connection) - 1;

    connection.on('message', function(message) {
        var send = JSON.stringify(message.utf8Data);
        send.slice(0,1);
        send.slice(send.length, 1);
        console.log(send);
        for(var i = 0; i < clients.length; i++){
            if(i == index){
                continue;
            } else{
                clients[i].sendUTF(send);
            }
        }
    });

    connection.on('close', function(connection) {
        console.log('connection closed');
    });

}); 