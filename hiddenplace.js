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
}

function positionPanner() {
    panner.setPosition(radioX, radioY, 295);
    var realRadio = $('div');
    realRadio.css('left', $('#radio').offset().left + $(window).width()/2).css('top', $('#radio').offset().top).css('width', $('#radio').width()).css('height', $('#radio').height());
    realRadio.attr('id', 'realRadio');
    $('body').append(realRadio);
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

var count = 5;
makeRandomInsideDiv($('body'));

function makeRandomInsideDiv(jOuter) {
    console.log(count);
    if(count == 0) {
        return;
    }

    var limitW = jOuter.width();
    var limitH = jOuter.height();
    var randomDiv = document.createElement('div');
    $(randomDiv).css('left', Math.random() * limitW).css('top', Math.random() * limitH);
    jOuter.append(randomDiv);
    count--;

    jOuter = $(randomDiv);
    console.log(jOuter);

    makeRandomInsideDiv(jOuter);
};