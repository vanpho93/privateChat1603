const Peer = require('simple-peer');
const $ = require('jquery');

navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(stream => {
        // const video = document.querySelectorAll('video')[0];
        // video.src = window.URL.createObjectURL(stream);
        // video.play();

        const p = new Peer({
            initiator: location.hash === '#1',  // eslint-disable-line
            trickle: false,
            stream
        });

        p.on('signal',
            data => $('#connectId').text(JSON.stringify(data)));

        p.on('connect', () => {
            console.log('CONNECT');
            p.send('whatever' + Math.random());
        });

        p.on('data', data => console.log(data.toString()));

        p.on('stream', stream2 => {
            const video2 = document.querySelectorAll('video')[0];
            video2.src = window.URL.createObjectURL(stream2);
            video2.play();
        });

        $('#btnConnect').click(() => {
            const otherId = $('#otherId').val();
            p.signal(JSON.parse(otherId));
        });

        $('#btnSend').click(() => {
            const message = $('#txtMessage').val();
            p.send(message);
        });
    })
    .catch(err => console.log(err));
