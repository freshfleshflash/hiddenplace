var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();

var panner = audioCtx.createPanner();
var listener = audioCtx.listener;
var source;

var listenerX = $(window).width() / 2;
var listenerY = $(window).height() / 2;
var radioX = $('#radio').offset().left;
var radioY = $(window).height() / 2;

$('#play').click(function() {
    getData();
    source.start(0);
    console.log("play");
});

$('#stop').click(function() {
    source.stop();
    console.log("stop");
});

$(window).scroll(function() {
    listenerX = $(window).scrollLeft();
    positionListener();
});

function positionListener() {
    listener.setPosition(listenerX, listenerY, 300);
    console.log("position_listener");
}

function positionPanner() {
    panner.setPosition(radioX, radioY, 295);
    console.log("position_panner");
}

function getData() {
    source = audioCtx.createBufferSource();
    request = new XMLHttpRequest();

    request.open('GET', 'data/train.mp3', true);

    request.responseType = 'arraybuffer';

    request.onload = function() {
        var audioData = request.response;

        audioCtx.decodeAudioData(audioData, function(buffer) {
                myBuffer = buffer;
                source.buffer = myBuffer;

                source.connect(panner);
                panner.connect(audioCtx.destination);
                positionPanner();
                positionListener();
                source.loop = true;
            },

            function(e){"Error with decoding audio data" + e.err}
        );
    }

    request.send();
}