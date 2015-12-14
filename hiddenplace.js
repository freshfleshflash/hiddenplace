var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();

var panner = audioCtx.createPanner();
var listener = audioCtx.listener;
var source;

var play = $('.play')[0];

var w = $(document).width();
var h = $(document).height();
console.log(w, h);

var x = w / 2;
var y = h / 2;

listener.setPosition(x, y, 300);

function positionPanner() {
    panner.setPosition(x, y, 295);
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
                source.loop = true;
            },

            function(e){"Error with decoding audio data" + e.err}
        );
    }

    request.send();
}

$('.play').click(function() {
    getData();
    source.start(0);
    console.log("play");
});

$('.stop').click(function() {
    source.stop();
    console.log("stop");
});

$(document).mousemove(function(event) {
    $('.mousePos').text("mouseX: " + event.pageX);
    x = math_map(event.pageX, 0, w, w/2-50, w/2+50);
    positionPanner();
});

function math_map(value, input_min, input_max, output_min, output_max) {
    return output_min + (output_max - output_min) * (value - input_min) / (input_max - input_min);
}