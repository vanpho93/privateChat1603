const $ = require('jquery');
const io = require('socket.io-client');

let receiver = '';

$('document').ready(() => {
    const socket = io();
    $('#divChat').hide();

    $('#btnSignUp').click(() => {
        const username = $('#txtUsername').val();
        socket.emit('DANG_KY_USERNAME', username);
    });

    socket.on('XAC_NHAN_DANG_KY', arrUser => {
        if (arrUser) {
            arrUser.forEach(e => {
                $('#ulUser').append(`<li id="${e}">${e}</li>`);
            });
            socket.on('NGUOI_DUNG_MOI', username => {
                $('#ulUser').append(`<li id="${username}">${username}</li>`);
            });
            $('#divChat').show();
            return $('#divSignUp').hide();
        }
        alert('Username da ton tai!');
    });

    $('#btnSend').click(() => {
        const message = $('#txtMessage').val();
        socket.emit('TIN_NHAN_RIENG', { receiver, message });
    });

    socket.on('NHAN_TIN_NHAN_RIENG', message => {
        $('#ulMessage').append(`<li>${message}</li>`);
    });

    socket.on('NGUOI_DUNG_THOAT', username => {
        $(`#${username}`).remove();
    });

    $('#ulUser').on('click', 'li', function () {
        $('li').removeClass('red');
        $(this).addClass('red');
        receiver = $(this).html();
    });
});

//https://socket.io/docs/emit-cheatsheet/
