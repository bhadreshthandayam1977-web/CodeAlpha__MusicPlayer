// ===== SONG DATABASE =====
const songs = [
    {
        title: "Summer Vibes",
        artist: "The Band",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        image: "https://via.placeholder.com/300?text=Summer+Vibes"
    },
    {
        title: "Night Drive",
        artist: "Synthwave",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        image: "https://via.placeholder.com/300?text=Night+Drive"
    },
    {
        title: "Electric Dreams",
        artist: "Future Sound",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        image: "https://via.placeholder.com/300?text=Electric+Dreams"
    },
    {
        title: "Chill Beats",
        artist: "Lo-Fi Studio",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        image: "https://via.placeholder.com/300?text=Chill+Beats"
    }
];

// ===== DOM ELEMENTS =====
const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressRange = document.getElementById('progressRange');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const songTitle = document.getElementById('songTitle');
const artistName = document.getElementById('artistName');
const albumArt = document.getElementById('albumArt');
const volumeControl = document.getElementById('volumeControl');
const volumePercent = document.getElementById('volumePercent');
const playlistItems = document.querySelectorAll('.playlist-item');

// ===== STATE VARIABLES =====
let currentSongIndex = 0;
let isPlaying = false;

// ===== LOAD SONGS INTO PLAYLIST =====
function loadPlaylist() {
    playlistItems.forEach((item, index) => {
        item.querySelector('.song-name').textContent = songs[index].title;
        item.querySelector('.artist-name').textContent = songs[index].artist;
    });
}

// ===== LOAD SONG =====
function loadSong(index) {
    const song = songs[index];
    audioPlayer.src = song.url;
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
    albumArt.src = song.image;
    
    // Update active playlist item
    playlistItems.forEach(item => item.classList.remove('active'));
    playlistItems[index].classList.add('active');
    
    currentSongIndex = index;
}

// ===== PLAY / PAUSE =====
function togglePlay() {
    if (isPlaying) {
        audioPlayer.pause();
        playBtn.textContent = '▶️ Play';
        isPlaying = false;
    } else {
        audioPlayer.play();
        playBtn.textContent = '⏸️ Pause';
        isPlaying = true;
    }
}

// ===== NEXT SONG =====
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
        audioPlayer.play();
    }
}

// ===== PREVIOUS SONG =====
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
        audioPlayer.play();
    }
}

// ===== UPDATE PROGRESS BAR =====
function updateProgress() {
    if (audioPlayer.duration) {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progress.style.width = percent + '%';
        progressRange.value = percent;
    }
}

// ===== UPDATE TIME DISPLAY =====
function updateTimeDisplay() {
    currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    durationEl.textContent = formatTime(audioPlayer.duration);
}

// ===== FORMAT TIME =====
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// ===== SEEK SONG =====
function seekSong(e) {
    const percent = e.target.value;
    audioPlayer.currentTime = (percent / 100) * audioPlayer.duration;
}

// ===== VOLUME CONTROL =====
function setVolume(e) {
    const volume = e.target.value;
    audioPlayer.volume = volume / 100;
    volumePercent.textContent = volume + '%';
}

// ===== AUTO NEXT SONG =====
audioPlayer.addEventListener('ended', nextSong);

// ===== UPDATE DISPLAY WHILE PLAYING =====
audioPlayer.addEventListener('timeupdate', () => {
    updateProgress();
    updateTimeDisplay();
});

// ===== EVENT LISTENERS =====
playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
progressRange.addEventListener('input', seekSong);
volumeControl.addEventListener('input', setVolume);

// ===== PLAYLIST CLICK =====
playlistItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        loadSong(index);
        if (isPlaying) {
            audioPlayer.play();
        }
    });
});

// ===== INITIALIZE =====
window.addEventListener('load', () => {
    loadPlaylist();
    loadSong(0);
    audioPlayer.volume = 0.7;
});

console.log('Music Player Loaded Successfully!');