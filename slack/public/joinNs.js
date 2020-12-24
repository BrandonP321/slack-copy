function joinNs(endpoint) {
    nsSocket = io('http://localhost:8000' + endpoint);

    nsSocket.on('nsRoomLoad', (nsRooms) => {
        let roomList = document.querySelector('.room-list')

        roomList.innerHTML = '';
        nsRooms.forEach((room) => {
            let glyph;
            if (room.privateRoom) {
                glyph = 'lock'
            } else {
                glyph = 'globe'
            }
            roomList.innerHTML += `<li class='room'><span class='glyphicon glyphicon-${glyph}'></span>${room.roomTitle}</li>`
        })

        // add click listener to each room
        let roomNodes = document.querySelectorAll('.room')
        roomNodes.forEach((elem) => {
            elem.addEventListener('click', (e) => {
                console.log('someone clicked on ', e.target.innerText)
            })
        })

        // add room automatically... first time here
        const topRoom = document.querySelector('.room') // will grab the first .room
        const topRoomName = topRoom.innerText;
        joinRoom(topRoomName)
    })

    document.querySelector('.message-form').addEventListener('submit', (event) => {
        event.preventDefault();

        const message = document.querySelector('#user-message').value
        nsSocket.emit('newMessageToServer', { text: message })
    })

    nsSocket.on('messageToClients', (msg) => {
        console.log(msg)
        document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`
    })
}