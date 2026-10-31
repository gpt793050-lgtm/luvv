const screens = [...document.querySelectorAll('.screen')];
const navDots = [...document.querySelectorAll('.nav-dot')];
const typedLetter = document.getElementById('typedLetter');
const letterText = `Selamat ulang tahun, Sayang. ♡

Semoga di usia yang baru ini, kamu selalu diberi kesehatan, kebahagiaan, dan ketenangan. Semoga semua hal yang sedang kamu usahakan bisa berjalan dengan lancar, satu per satu impianmu tercapai, dan selalu ada alasan kecil untuk membuatmu tersenyum.

Terima kasih sudah hadir dan menjadi bagian yang begitu berarti dalam hidupku. Aku bersyukur bisa mengenal kamu dan menyimpan banyak cerita bersama. Aku mungkin nggak selalu pandai menyampaikan perasaan lewat kata-kata, tapi aku selalu berharap hal-hal terbaik datang kepadamu.

Sekali lagi, selamat ulang tahun, Sayang. Semoga hari ini terasa hangat dan menyenangkan, karena kamu pantas mendapatkan banyak kebahagiaan. ♡`;
let currentScreen = 'home';
let typingTimer;

function showScreen(id) {
  screens.forEach(s => s.classList.toggle('active', s.id === id));
  navDots.forEach(d => d.classList.toggle('selected', d.dataset.screen === id));
  currentScreen = id;
  if (id === 'letter' && !typedLetter.dataset.done) typeLetter();
  window.scrollTo({top: 0, behavior: 'smooth'});
}

function typeLetter() {
  clearInterval(typingTimer);
  typedLetter.textContent = '';
  let i = 0;
  typingTimer = setInterval(() => {
    typedLetter.textContent += letterText[i++];
    if (i >= letterText.length) {
      clearInterval(typingTimer);
      typedLetter.dataset.done = 'true';
    }
  }, 22);
}

document.querySelectorAll('[data-next]').forEach(btn => btn.addEventListener('click', () => showScreen(btn.dataset.next)));
navDots.forEach(btn => btn.addEventListener('click', () => showScreen(btn.dataset.screen)));

const giftWrap = document.getElementById('giftWrap');
function openGift() {
  giftWrap.classList.add('opened');
  document.getElementById('giftHint').textContent = 'yeay! kejutan kecil untuk kamu ♡';
  setTimeout(() => showScreen('letter'), 850);
}
document.getElementById('openGift').addEventListener('click', openGift);
giftWrap.addEventListener('click', openGift);
giftWrap.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openGift(); } });

const audio = document.getElementById('birthdayAudio');
const playPause = document.getElementById('playPause');
const audioStatus = document.getElementById('audioStatus');
const musicToggle = document.getElementById('musicToggle');

const piano = new Audio('assets/lagu.mp3');
piano.loop = true;
piano.volume = 0.28;
let pianoEnabled = false;

async function togglePiano() {
  try {
    if (!audio.paused) {
      piano.pause();
      pianoEnabled = false;
      musicToggle.textContent = '♫ Piano dijeda saat lagu';
      return;
    }
    if (!pianoEnabled) {
      await piano.play();
      pianoEnabled = true;
      musicToggle.textContent = '♫ Piano: ON';
    } else {
      piano.pause();
      pianoEnabled = false;
      musicToggle.textContent = '♫ Piano: OFF';
    }
  } catch {
    musicToggle.textContent = '♫ Piano tidak tersedia';
  }
}
musicToggle.textContent = '♫ Piano: OFF';
musicToggle.addEventListener('click', togglePiano);

async function toggleAudio() {
  try {
    if (audio.paused) {
      await audio.play();
      playPause.textContent = 'Ⅱ Jeda lagu';
      audioStatus.textContent = 'Sedang diputar ♫';
    } else {
      audio.pause();
      playPause.textContent = '▶ Putar lagu';
      audioStatus.textContent = 'Lagu dijeda ♡';
    }
  } catch {
    audioStatus.textContent = 'Lagu belum bisa diputar. Pastikan file lagu-favorit.mp3 ada di folder assets.';
  }
}
playPause.addEventListener('click', toggleAudio);

audio.addEventListener('play', () => {
  if (pianoEnabled) {
    piano.pause();
    pianoEnabled = false;
  }
  musicToggle.textContent = '♫ Piano dijeda saat lagu';
  startSlideshow();
});

audio.addEventListener('pause', () => {
  if (musicToggle.textContent === '♫ Piano dijeda saat lagu') musicToggle.textContent = '♫ Piano: OFF';
  stopSlideshow();
});

audio.addEventListener('ended', () => {
  playPause.textContent = '▶ Putar lagu';
  audioStatus.textContent = 'Lagu selesai diputar ♡';
  stopSlideshow();
});

// Daftar otomatis 155 foto slideshow (slideshow-001.jpeg s.d. slideshow-155.jpeg)
const photoFiles = Array.from({length: 146}, (_, index) => {
  const num = String(index + 10).padStart(3, '0');
  return `assets/slideshow-${num}.jpeg`;
});

const slideshowImage = document.getElementById('slideshowImage');
const slideshowToggle = document.getElementById('slideshowToggle');
let photoIndex = 0;
let slideshowTimer = null;

function showPhoto(index) {
  photoIndex = ((index % photoFiles.length) + photoFiles.length) % photoFiles.length;
  slideshowImage.classList.remove('photo-fade');
  void slideshowImage.offsetWidth; // Reset animasi CSS
  slideshowImage.src = photoFiles[photoIndex];
  slideshowImage.alt = `Kenangan kita ${photoIndex + 1}`;
  slideshowImage.classList.add('photo-fade');
}

function startSlideshow() {
  if (slideshowTimer) return;
  showPhoto(photoIndex);
  slideshowToggle.textContent = 'Ⅱ Jeda slideshow';
  // Interval 2.5 detik (2500ms) agar stabil saat di-hosting online
  slideshowTimer = setInterval(() => showPhoto(photoIndex + 1), 4000);
}

function stopSlideshow() {
  clearInterval(slideshowTimer);
  slideshowTimer = null;
  slideshowToggle.textContent = '▶ Putar slideshow';
}

document.getElementById('prevPhoto').addEventListener('click', () => showPhoto(photoIndex - 1));
document.getElementById('nextPhoto').addEventListener('click', () => showPhoto(photoIndex + 1));
slideshowToggle.addEventListener('click', () => slideshowTimer ? stopSlideshow() : startSlideshow());

showPhoto(0);

document.getElementById('blowCandles').addEventListener('click', () => {
  document.querySelector('.cake').classList.add('blown');
  document.getElementById('wishMessage').textContent = 'Semoga semua harapan baik Sayang pelan-pelan jadi nyata. ♡';
  document.getElementById('blowCandles').textContent = 'Harapan terkirim 💗';
  document.getElementById('secretNext').classList.remove('hidden');
  for (let i=0;i<24;i++) makeHeart();
});

const envelope = document.getElementById('secretEnvelope');
function revealSecret() {
  document.getElementById('secretCard').classList.remove('hidden');
  envelope.classList.add('hidden');
  document.getElementById('restartBtn').classList.remove('hidden');
  for (let i=0;i<28;i++) makeHeart();
}
envelope.addEventListener('click', revealSecret);
envelope.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') revealSecret(); });

document.getElementById('restartBtn').addEventListener('click', () => {
  document.querySelector('.cake').classList.remove('blown');
  document.getElementById('wishMessage').textContent = '';
  document.getElementById('blowCandles').textContent = 'Tiup lilinnya! ✨';
  document.getElementById('secretNext').classList.add('hidden');
  document.getElementById('secretCard').classList.add('hidden');
  envelope.classList.remove('hidden');
  document.getElementById('restartBtn').classList.add('hidden');
  showScreen('home');
});

function makeHeart() {
  const layer = document.querySelector('.floating-hearts');
  const el = document.createElement('span');
  el.className = 'floating-heart';
  el.textContent = Math.random() > .5 ? '♡' : '✦';
  el.style.left = Math.random()*100 + '%';
  el.style.fontSize = (12 + Math.random()*22) + 'px';
  el.style.animationDuration = (5 + Math.random()*4) + 's';
  layer.appendChild(el);
  setTimeout(() => el.remove(), 9500);
}
setInterval(() => { if (Math.random() > .45) makeHeart(); }, 1100);
