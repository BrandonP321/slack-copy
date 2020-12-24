const socket = io('http://localhost:8000'); // the / namespace
let nsSocket = '';

// listen for list of all namespaces
socket.on('nsList', nsData => {
    console.log(nsData)

    let namespacesDiv = document.querySelector('.namespaces');
    namespacesDiv.innerHTML = '';
    nsData.forEach((ns) => {
        namespacesDiv.innerHTML += '<div class="namespace" data-ns=' + ns.endpoint + '><img src="' + ns.img + '"/></div>'
    })

    // add click event listener for each namespace
    document.querySelectorAll('.namespace').forEach((elem) => {
        elem.addEventListener('click', (e) => {
            const nsEndPoint = elem.getAttribute('data-ns');
            console.log(nsEndPoint)
        })
    })

    joinNs('/wiki')
})

