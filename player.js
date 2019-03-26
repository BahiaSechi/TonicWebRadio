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
    constructor(...songs) {
        this.songs = songs.map(song => {
            return {title: song.title, artist: song.artist, audio: new Audio(song.path)};
        });
        this.songs.forEach(song => {
            song.audio.volume = 0.5;
            song.audio.onended = () => {
                this.pause();
                song.audio.currentTime = 0;
                this.next();
                this.play();
            };
        });
        this.index = Math.floor(Math.random() * this.songs.length);
    }

    get current() {
        return this.songs[this.index];
    }
    
    next() {
        this.index++;
        if (this.index === this.songs.length)
            this.index = 0;
    }

    play() {
        this.current.audio.play();
    }

    pause() {
        this.current.audio.pause();
    }
}

let list = new Playlist(
    {path: 'music/dance.mp3', title: "D.A.N.C.E.", artist: "Justice"},
    {path: 'music/bluesky.mp3', title: "Mr. Blue Sky", artist: "Electric Light Orchestra"},
    {path: 'music/wallspin.mp3', title: "Wallspin", artist: "Neil Cicierga"},
    {path: 'music/pizza.mp3', title: "Funiculì, Funiculà", artist: "Luigi Denza"}
);

setInterval(() => {
    let song = list.current;
    $(".time--current").text(getMinSec(song.audio.currentTime));
    $(".time--total").text("-" + getMinSec(song.audio.duration - song.audio.currentTime));
    $(".fill").css("width", Math.round(100 * song.audio.currentTime / song.audio.duration) + "%");
    $(".song-name").text(song.title);
    $(".artist-name").text(song.artist);
}, 100);

$('.pause').hide(); //hide pause button until clicked

//play button
$('.play').click(function(){
    list.play();
    $('.play').hide();
    $('.pause').show();
    $(".album").css("background", "linear-gradient(rgba(191, 127, 63, 0.25), rgba(237, 193, 150, 0.55)), url('img/img.gif')")
});

//pause button
$('.pause').click(function(){
    list.pause();
    $('.play').show();
    $('.pause').hide();
    $(".album").css("background", "linear-gradient(rgba(191, 127, 63, 0.25), rgba(237, 193, 150, 0.55)), url('img/img.png')")
});
