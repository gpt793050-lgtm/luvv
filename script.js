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
// Piano backsound remains separate from the song in the Our Song section.
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
});
audio.addEventListener('pause', () => {
  if (musicToggle.textContent === '♫ Piano dijeda saat lagu') musicToggle.textContent = '♫ Piano: OFF';
});
audio.addEventListener('ended', () => {
  playPause.textContent = '▶ Putar lagu';
  audioStatus.textContent = 'Lagu selesai diputar ♡';
});

// Slideshow automatically plays alongside the separate song, no photo selection needed.
const photoFiles = [
  'assets/slideshow-001.jpeg',
  'assets/slideshow-002.jpeg',
  'assets/slideshow-003.jpeg',
  'assets/slideshow-004.jpeg',
  'assets/slideshow-005.jpeg',
  'assets/slideshow-006.jpeg',
  'assets/slideshow-007.jpeg',
  'assets/slideshow-008.jpeg',
  'assets/slideshow-009.jpeg',
  'assets/slideshow-010.jpeg',
  'assets/slideshow-011.jpeg',
  'assets/slideshow-012.jpeg',
  'assets/slideshow-013.jpeg',
  'assets/slideshow-014.jpeg',
  'assets/slideshow-015.jpeg',
  'assets/slideshow-016.jpeg',
  'assets/slideshow-017.jpeg',
  'assets/slideshow-018.jpeg',
  'assets/slideshow-019.jpeg',
  'assets/slideshow-020.jpeg',
  'assets/slideshow-021.jpeg',
  'assets/slideshow-022.jpeg',
  'assets/slideshow-023.jpeg',
  'assets/slideshow-024.jpeg',
  'assets/slideshow-025.jpeg',
  'assets/slideshow-026.jpeg',
  'assets/slideshow-027.jpeg',
  'assets/slideshow-028.jpeg',
  'assets/slideshow-029.jpeg',
  'assets/slideshow-030.jpeg',
  'assets/slideshow-031.jpeg',
  'assets/slideshow-032.jpeg',
  'assets/slideshow-033.jpeg',
  'assets/slideshow-034.jpeg',
  'assets/slideshow-035.jpeg',
  'assets/slideshow-036.jpeg',
  'assets/slideshow-037.jpeg',
  'assets/slideshow-038.jpeg',
  'assets/slideshow-039.jpeg',
  'assets/slideshow-040.jpeg',
  'assets/slideshow-041.jpeg',
  'assets/slideshow-042.jpeg',
  'assets/slideshow-043.jpeg',
  'assets/slideshow-044.jpeg',
  'assets/slideshow-045.jpeg',
  'assets/slideshow-046.jpeg',
  'assets/slideshow-047.jpeg',
  'assets/slideshow-048.jpeg',
  'assets/slideshow-049.jpeg',
  'assets/slideshow-050.jpeg',
  'assets/slideshow-051.jpeg',
  'assets/slideshow-052.jpeg',
  'assets/slideshow-053.jpeg',
  'assets/slideshow-054.jpeg',
  'assets/slideshow-055.jpeg',
  'assets/slideshow-056.jpeg',
  'assets/slideshow-057.jpeg',
  'assets/slideshow-058.jpeg',
  'assets/slideshow-059.jpeg',
  'assets/slideshow-060.jpeg',
  'assets/slideshow-061.jpeg',
  'assets/slideshow-062.jpeg',
  'assets/slideshow-063.jpeg',
  'assets/slideshow-064.jpeg',
  'assets/slideshow-065.jpeg',
  'assets/slideshow-066.jpeg',
  'assets/slideshow-067.jpeg',
  'assets/slideshow-068.jpeg',
  'assets/slideshow-069.jpeg',
  'assets/slideshow-070.jpeg',
  'assets/slideshow-071.jpeg',
  'assets/slideshow-072.jpeg',
  'assets/slideshow-073.jpeg',
  'assets/slideshow-074.jpeg',
  'assets/slideshow-075.jpeg',
  'assets/slideshow-076.jpeg',
  'assets/slideshow-077.jpeg',
  'assets/slideshow-078.jpeg',
  'assets/slideshow-079.jpeg',
  'assets/slideshow-080.jpeg',
  'assets/slideshow-081.jpeg',
  'assets/slideshow-082.jpeg',
  'assets/slideshow-083.jpeg',
  'assets/slideshow-084.jpeg',
  'assets/slideshow-085.jpeg',
  'assets/slideshow-086.jpeg',
  'assets/slideshow-087.jpeg',
  'assets/slideshow-088.jpeg',
  'assets/slideshow-089.jpeg',
  'assets/slideshow-090.jpeg',
  'assets/slideshow-091.jpeg',
  'assets/slideshow-092.jpeg',
  'assets/slideshow-093.jpeg',
  'assets/slideshow-094.jpeg',
  'assets/slideshow-095.jpeg',
  'assets/slideshow-096.jpeg',
  'assets/slideshow-097.jpeg',
  'assets/slideshow-098.jpeg',
  'assets/slideshow-099.jpeg',
  'assets/slideshow-100.jpeg',
  'assets/slideshow-101.jpeg',
  'assets/slideshow-102.jpeg',
  'assets/slideshow-103.jpeg',
  'assets/slideshow-104.jpeg',
  'assets/slideshow-105.jpeg',
  'assets/slideshow-106.jpeg',
  'assets/slideshow-107.jpeg',
  'assets/slideshow-108.jpeg',
  'assets/slideshow-109.jpeg',
  'assets/slideshow-110.jpeg',
  'assets/slideshow-111.jpeg',
  'assets/slideshow-112.jpeg',
  'assets/slideshow-113.jpeg',
  'assets/slideshow-114.jpeg',
  'assets/slideshow-115.jpeg',
  'assets/slideshow-116.jpeg',
  'assets/slideshow-117.jpeg',
  'assets/slideshow-118.jpeg',
  'assets/slideshow-119.jpeg',
  'assets/slideshow-120.jpeg',
  'assets/slideshow-121.jpeg',
  'assets/slideshow-122.jpeg',
  'assets/slideshow-123.jpeg',
  'assets/slideshow-124.jpeg',
  'assets/slideshow-125.jpeg',
  'assets/slideshow-126.jpeg',
  'assets/slideshow-127.jpeg',
  'assets/slideshow-128.jpeg',
  'assets/slideshow-129.jpeg',
  'assets/slideshow-130.jpeg',
  'assets/slideshow-131.jpeg',
  'assets/slideshow-132.jpeg',
  'assets/slideshow-133.jpeg',
  'assets/slideshow-134.jpeg',
  'assets/slideshow-135.jpeg',
  'assets/slideshow-136.jpeg',
  'assets/slideshow-137.jpeg',
  'assets/slideshow-138.jpeg',
  'assets/slideshow-139.jpeg',
  'assets/slideshow-140.jpeg',
  'assets/slideshow-141.jpeg',
  'assets/slideshow-142.jpeg',
  'assets/slideshow-143.jpeg',
  'assets/slideshow-144.jpeg',
  'assets/slideshow-145.jpeg',
  'assets/slideshow-146.jpeg',
  'assets/slideshow-147.jpeg',
  'assets/slideshow-148.jpeg',
  'assets/slideshow-149.jpeg',
  'assets/slideshow-150.jpeg',
  'assets/slideshow-151.jpeg',
  'assets/slideshow-152.jpeg',
  'assets/slideshow-153.jpeg',
  'assets/slideshow-154.jpeg',
  'assets/slideshow-155.jpeg'
];
const slideshowImage = document.getElementById('slideshowImage');
const slideshowCaption = document.getElementById('slideshowCaption');
const slideshowToggle = document.getElementById('slideshowToggle');
let photoIndex = 0;
let slideshowTimer = null;
function showPhoto(index) {
  photoIndex = ((index % photoFiles.length) + photoFiles.length) % photoFiles.length;
  slideshowImage.classList.remove('photo-fade');
  void slideshowImage.offsetWidth;
  slideshowImage.src = photoFiles[photoIndex];
  slideshowImage.alt = `Kenangan kita ${photoIndex + 1}`;
  slideshowImage.classList.add('photo-fade');
}
function startSlideshow() {
  if (slideshowTimer) return;
  showPhoto(photoIndex);
  slideshowToggle.textContent = 'Ⅱ Jeda slideshow';
  slideshowTimer = setInterval(() => showPhoto(photoIndex + 1), 1000);
}
function stopSlideshow() {
  clearInterval(slideshowTimer);
  slideshowTimer = null;
  slideshowToggle.textContent = '▶ Putar slideshow';
}
document.getElementById('prevPhoto').addEventListener('click', () => showPhoto(photoIndex - 1));
document.getElementById('nextPhoto').addEventListener('click', () => showPhoto(photoIndex + 1));
slideshowToggle.addEventListener('click', () => slideshowTimer ? stopSlideshow() : startSlideshow());
playPause.addEventListener('click', () => {
  if (audio.paused) {
    // Start the photo movie whenever the song starts playing.
    setTimeout(() => { if (!audio.paused) startSlideshow(); }, 250);
  } else {
    stopSlideshow();
  }
});
audio.addEventListener('play', startSlideshow);
audio.addEventListener('pause', stopSlideshow);
audio.addEventListener('ended', stopSlideshow);
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

