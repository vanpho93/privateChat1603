const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(3000, () => console.log('Server started'));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/', (req, res) => res.render('home'));

const arrUsername = [];
const arrSocket = [];

io.on('connection', socket => {
    socket.on('DANG_KY_USERNAME', username => {
        if (arrUsername.indexOf(username) !== -1) {
            return socket.emit('XAC_NHAN_DANG_KY', false);
        }
        socket.username = username;// eslint-disable-line
        socket.emit('XAC_NHAN_DANG_KY', arrUsername);
        arrUsername.push(username);
        arrSocket.push(socket);
        io.emit('NGUOI_DUNG_MOI', username);
    });

    socket.on('NGUOI_DUNG_GUI_TIN', message => {
        io.emit('TIN_NHAN_MOI', `${socket.username}: ${message}`);
    });

    socket.on('TIN_NHAN_RIENG', data => {
        const { receiver, message } = data;
        const index = arrSocket.findIndex(e => e.username === receiver);
        if (index === -1) return console.log(receiver);
        const toSend = `${socket.username}: ${message}`;
        socket.to(arrSocket[index].id).emit('NHAN_TIN_NHAN_RIENG', toSend);
    });

    socket.on('disconnect', () => {
        const index = arrUsername.indexOf(socket.username);
        if (index !== -1) {
            arrUsername.splice(index, 1);
            arrSocket.splice(index, 1);
            io.emit('NGUOI_DUNG_THOAT', socket.username);
        }
    });
});
//https://youtu.be/P_0snD-GIM8
