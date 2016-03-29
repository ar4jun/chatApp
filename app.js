var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http),
 users1 = require('./routes/users');
var sockets = {};
var users = {};

app.get('/', function(req, res) {

    res.sendFile(__dirname + '/views/index.html');

});

app.get('/online', function(req, res) {
    var online = Object.keys(users);
    res.json({ online: online });
});
app.get('/checkUser',users1.checkUser );
app.get('/history',users1.history );



io.on('connection', function(socket) {
    console.log('New Socket Connection');
    console.log(Object.keys(users));
    var connectedUserId = socket.handshake.query.userId;
    if (connectedUserId in users) {
        console.log('UserId :' + connectedUserId + ' already Connected');
        socket.userId = connectedUserId;
        users[socket.userId] = socket;
        
    } else {
        console.log('New User Connected');
        socket.userId = connectedUserId;
        users[socket.userId] = socket;
        console.log(socket.userId);
        io.emit('new user', socket.userId);      //only new user will be append to the online users
        

    }



    socket.on('chat message', function(msg) {
        console.log('message: ' + msg.sender);
        users["" + msg.recvr + ""].emit('chat message', msg);
        users["" + msg.sender + ""].emit('chat message', msg);
        users1.insert(msg);
    });
});
http.listen(3900, function() {
    console.log('listening on *:3900');
});