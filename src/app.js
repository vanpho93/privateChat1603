const Peer = require('simple-peer');
const $ = require('jquery');

const p = new Peer({
    initiator: location.hash === '#1', trickle: false // eslint-disable-line
});

p.on('signal', 
    data => $('#connectId').text(JSON.stringify(data)));

$(document).ready(() => {// eslint-disable-line

});
