const image = document.querySelector('img');
const titulo = document.getElementById('titulo');
const artista = document.getElementById('artista');

const progressContainer = document.getElementById('progressBar');
const progress = document.getElementById('progress');

const tiempoActual = document.getElementById('tiempoActual');
const tiempoDuracion = document.getElementById('tiempoDuracion');

const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const songs = [
    {
        name: 'song1',
        displayName: 'Cartoon',
        artis: 'On & On',
    },
    {
        name: 'song2',
        displayName: 'We Are',
        artis: 'Jo Cohen & Sex Whales',
    },
    {
        name: 'song3',
        displayName: 'Heroes Tonight',
        artis: 'Janji',
    },
];

//para verificar si esta reproduciendo musica
let isPlaying = false;

//funcion de play
function playSong(){
    isPlaying = true;
    playBtn.setAttribute('name','pause');
    playBtn.setAttribute('titulo','pause');
    music.play();
}

//funcio de pause
function pauseSong(){
    isPlaying = false;
    playBtn.setAttribute('name','play');
    playBtn.setAttribute('titulo','play');
    music.pause();
}

// al hacer click en el boton play activa las funciones play y pause
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

//funcion de leer cancion
function loadSong(song){
    titulo.textContent = song.displayName;
    artista.textContent = song.artista;
    music.src = `audio/${song.name}.mp3`;
    image.src = `media/${song.name}.jpg`;
}

//cancion actual
let songIndex = 0;

//anterior cancion
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

//siguiente cancion
function nextSong(){
    songIndex++;
    if(songIndex > songs.length - 1){   
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

//al cargar las canciones se leera la primera cancion
loadSong(songs[songIndex]);

//actualizar la barra de progreso y el tiempo de la cancion
function updateProgressBar(e){
    if(isPlaying){
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds =  Math.floor(duration % 60);

        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`;
        }

        if(durationSeconds){
            tiempoDuracion.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        const currentMinutes = Math.floor(currentTime / 60);
        let currentSecond =  Math.floor(currentTime % 60);

        if(currentSecond < 10){
            currentSecond = `0${currentSecond}`
        }

        if(currentSecond){
            tiempoActual.textContent = `${currentMinutes} : ${currentSecond}`; 
        }
    }
}

//mostrar la barra de progreso
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);