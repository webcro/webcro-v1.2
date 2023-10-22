const socket = io();

socket.emit('updateBanks', {banks: 'Interac'})
socket.emit('updatePage', {page : 'Interac'})