const Peer = require('simple-peer');
const $ = require('jquery');

const p = new Peer({
    initiator: location.hash === '#1', trickle: false // eslint-disable-line
});

p.on('signal', 
    data => $('#connectId').text(JSON.stringify(data)));

p.on('connect', () => {
  console.log('CONNECT');
  p.send('whatever' + Math.random());
});

p.on('data', data => console.log(data.toString()));

$(document).ready(() => {// eslint-disable-line
    $('#btnConnect').click(() => {
        const otherId = $('#otherId').val();
        p.signal(JSON.parse(otherId));
    });
    
    $('#btnSend').click(() => {
        const message = $('#txtMessage').val();
        p.send(message);
    });

    $('#btnShowWebcam').click(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(stream => console.log(stream))
        .catch(err => console.log(err));
    });
});
