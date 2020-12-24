// create express server
const express = require('express');
const app = express();
// expose server
const socketio = require('socket.io')

require('dotenv').config();
const PORT = process.env.PORT

app.use(express.static(__dirname + '/public'))

// listen on port 9000
const server = app.listen(PORT, () => {
    console.log('server listening on port ' + PORT)
});
// hand socket.io the express server 
const io = socketio(server, {
    cors: {
        origin: true
    }
});

io.on('connection', socket => {
    console.log('user conntected to main namespace');

    socket.join('level1');
    io.to('level1').emit('joined', 'I have joined the level 1 room');
})

const adminNamespace = io.of('/admin')

adminNamespace.on('connection', socket => {
    console.log('user connected to admin namespace')

    socket.join('level2');
    adminNamespace.to('level2').emit('joined', 'I have joined the level 2 room');
})