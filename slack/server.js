// create express server
const express = require('express');
const app = express();
// expose server
const socketio = require('socket.io')

require('dotenv').config();
const PORT = process.env.PORT

// bring in namespaces
let namespaces = require('./data/namespaces');

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
    // build array to send back with img and endpoint of each namespace
    let nsData = namespaces.map(ns => {
        return {
            img: ns.img,
            endpoint: ns.endpoint
        }
    })
    
    // send nsData back to client.  must use socket to send data back to only just this client
    socket.emit('nsList', nsData); // io would send it to all connected users
})

// iterate over namesapces and listen for a connection
namespaces.forEach((namespace) => {
    io.of(namespace.endpoint).on('connection', (nsSocket) => {
        console.log(`${nsSocket.id} has joined ${namespace.endpoint}`)

        // send the connected namespace group info back
        nsSocket.emit('nsRoomLoad', namespaces[0].rooms)

        nsSocket.on('joinRoom', (roomToJoin, numberOfUsersCallBack) => {
            // deal with history
            nsSocket.join(roomToJoin)
            console.log(roomToJoin)
            io.of('/wiki').in(roomToJoin).allSockets().then((clients) => {
                // console.log(clients.size)
                numberOfUsersCallBack(clients.size);
            })
        })

        nsSocket.on('newMessageToServer', msg => {
            const fullMsg = {
                text: msg,
                time: Date.now(),
                username: 'brandon',
                avatar: 'https://vio.placeholder.com/30'
            }
            // send message to all sockets in same room as this socket
            // user will be in the second room in the object set, socket always joins its own room on connection
            const roomTitle = Array.from(nsSocket.rooms)[1]
            io.of('/wiki').to(roomTitle).emit('messageToClients', fullMsg)
        })
    })
})










// const adminNamespace = io.of('/admin')

// adminNamespace.on('connection', socket => {
//     console.log('user connected to admin namespace')

//     socket.join('level2');
//     adminNamespace.to('level2').emit('joined', 'I have joined the level 2 room');
// })