const express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

app.get('/', (req, res) => {
    res.send('Chat Server is running on port 3000')
});

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('join', function (test) {
        console.log(test + " connected!")
        socket.broadcast.emit('test_response', test + " connected!")
    });

    socket.on('record', (command_msg) => {
        //log the message in console 
        console.log(command_msg)
        //create a message object
        // let message_res = { 'comm': command_msg }
        // send the message to the client side  
        socket.broadcast.emit('comm', command_msg)
    });

    socket.on('disconnect', function() {
        console.log('user has left')
        //socket.broadcast.emit( "disc" ,'user has left')
    });
});
server.listen(3000, () => {
    console.log('Node app is running on port 3000')
});