//like & shuffle button
$('.heart').click(function(){
    $(this).toggleClass('clicked');
});

$('.shuffle').click(function(){
    $(this).toggleClass('clicked');
});

//show info box on hover
$('#player').hover(function(){
    $('.info').toggleClass('up');
});

function getMinSec(sec) {
    let secs = Math.floor(sec % 60);

    return Math.floor(sec / 60) + ":" + (secs < 10 ? "0" : "") + secs;
}

//music player settings

class Playlist {
    constructor(...paths) {
        this.songs = paths.map(path => new Audio(path));
        this.songs.forEach(song => {
            // TODO
        });
        this.index = 0;
    }

    get current() {
        return this.songs[this.index];
    }

    play() {
        this.current.play();
    }

    pause() {
        this.current.pause();
    }
}

let list = new Playlist('pizza.mp3');

setInterval(() => {
    let song = list.current;
    $(".time--current").text(getMinSec(song.currentTime));
    $(".time--total").text("-" + getMinSec(song.duration - song.currentTime));
    $(".fill").css("width", Math.round(100 * song.currentTime / song.duration) + "%");
}, 100);

$('.pause').hide(); //hide pause button until clicked

//play button
$('.play').click(function(){
    audio.play();
    $('.play').hide();
    $('.pause').show();
});

//pause button
$('.pause').click(function(){
    audio.pause();
    $('.play').show();
    $('.pause').hide();
});
