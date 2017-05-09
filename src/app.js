const $ = require('jquery');
const io = require('socket.io-client');

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
            $('li').click(function () {
                $('li').removeClass('red');
                $(this).addClass('red');
            });
            socket.on('NGUOI_DUNG_MOI', username => {
                $('#ulUser').append(`<li id="${username}">${username}</li>`);
                $('li').click(function () {
                    $('li').removeClass('red');
                    $(this).addClass('red');
                });
            });
            $('#divChat').show();
            return $('#divSignUp').hide();
        }
        alert('Username da ton tai!');
    });

    $('#btnSend').click(() => {
        const receiver = $('#txtReceiver').val();
        const message = $('#txtMessage').val();
        socket.emit('TIN_NHAN_RIENG', { receiver, message });
    });

    socket.on('NHAN_TIN_NHAN_RIENG', message => {
        $('#ulMessage').append(`<li>${message}</li>`);
    });

    socket.on('NGUOI_DUNG_THOAT', username => {
        $(`#${username}`).remove();
    });

    $('li').click(function() {
        $('li').removeClass('red');
        $(this).addClass('red');
    });
});

//https://socket.io/docs/emit-cheatsheet/
