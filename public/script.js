const socket = io('http://localhost:8000'); // the / namespace
const socket2 = io('http://localhost:8000/admin'); // the /admin namespace(aka endpoint)

socket.on('connect', () => {
    console.log('connected to / socket')
})

socket.on('joined', (msg) => {
    console.log(msg)
})

socket2.on('connect', () => {
    console.log('connected to /admin socket')
})

socket2.on('joined', msg => {
    console.log(msg)
})

document.querySelector('.text-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const message = document.querySelector('.msg-input').value
    socket.emit('sendMessage', { text: message })
})