function joinRoom(roomName) {
    // send room name to server
    nsSocket.emit('joinRoom', roomName, (newNumberOfMembers) => {
        // update room member total now that we have joined
        document.querySelector('.curr-room-num-users').innerHTML = newNumberOfMembers + '<span class="glyphicon glyphicon-user"></span>'
    })
}