// Pesan Megalodon dan Kraken
const megaMsgs = [
  "Megalodon datang buat jagain mood-mu hari ini.🦈",
  "Semoga harimu kuat seperti Megalodon!🦈",
];
const krakMsgs = [
  "Kraken muncul buat bikin kamu ketawa 🐙",
  "Kecil tapi penuh kejutan—kayak kamu!",
];

// Elemen
const btnMega = document.getElementById("btn-mega");
const btnKraken = document.getElementById("btn-kraken");
const btnRand = document.getElementById("btn-rand");
const megal = document.getElementById("megalodon");
const krak = document.getElementById("kraken");
const msgBox = document.getElementById("msg");
const typeEl = document.getElementById("type");
const cursor = document.getElementById("cursor");
const wave = document.getElementById("wave");
const stage = document.getElementById("stage");
// 🔹 Tambahan: Ambil elemen baru
const choiceContainer = document.getElementById("choice-container");
const confirmContainer = document.getElementById("confirm-container");
const btnYes = document.getElementById("btn-yes");
const btnNo = document.getElementById("btn-no");
const btnSure = document.getElementById("btn-sure");
const btnBack = document.getElementById("btn-back");
const finalContainer = document.getElementById("final-container");
const btnFinal = document.getElementById("btn-final");
const btnOk = document.getElementById("btn-ok");
const okContainer = document.getElementById("ok-container");

const btnFirst = document.getElementById("btn-first");
const btnHidden = document.getElementById("btn-hidden");
const menuMain = document.getElementById("menu-main");
const balloonsContainer = document.getElementById("balloons-container");

const popSound = document.getElementById("pop-sound");
const bellSound = document.getElementById("bell-sound");
const boinkSound = document.getElementById("boink-sound");
const dingSound = document.getElementById("ding-sound");

const clickSound = document.getElementById("click-sound");

// State
let typing = false;
let openedMenu = false;

// Fungsi clear stage (hilangkan semua animasi dan gambar)
function clearStage() {
  megal.classList.remove("show");
  megal.style.display = "none";
  krak.classList.remove("show");
  krak.style.display = "none";
  wave.style.display = "none";
  document.querySelectorAll(".bubble").forEach((b) => b.remove());
}

// Spawn bubble (dari kode lama)
function spawnBubbles(count) {
  for (let i = 0; i < count; i++) {
    const b = document.createElement("div");
    b.className = "bubble";
    b.style.left = 20 + Math.random() * 60 + "%";
    const size = 8 + Math.random() * 18;
    b.style.width = size + "px";
    b.style.height = size + "px";
    b.style.animationDuration = 3 + Math.random() * 2 + "s";
    stage.appendChild(b);
    setTimeout(() => b.remove(), 5000);
  }
}

// Typewriter dengan suara pop/bell tiap huruf
function typeText(text, onComplete) {
  typing = true;
  typeEl.textContent = "";
  msgBox.style.display = "block";
  cursor.style.display = "inline-block";
  let i = 0;

  function typeNext() {
    if (i < text.length) {
      typeEl.textContent += text[i];
      // Suara pop atau bell random
      if (Math.random() < 0.7) playSound(popSound);
      else playSound(bellSound);
      i++;
      setTimeout(typeNext, 70);
    } else {
      setTimeout(() => {
        cursor.style.display = "none";
        typing = false;
        if (onComplete) onComplete();
      }, 700);
    }
  }
  typeNext();
}

function playClick() {
  if (!clickSound) return;
  try {
    clickSound.currentTime = 0;
    clickSound.play();
  } catch (e) {
    // biarin aja kalau gagal autoplay
  }
}

function playSound(audio) {
  if (!audio) return;
  try {
    audio.currentTime = 0;
    audio.play();
  } catch (e) {
    // biarin aja kalau gagal autoplay
  }
}

// Show opening greeting
function showOpening() {
  const openingText =
    "Hai Biya 👋 Katanya lagi PMS ya? aku ada kata kata hari ini buat kamu ";
  typeText(openingText);
}

function showSuccessMessage() {
  playSound(dingSound);
  typeText("hehe pinter juga kamu, lanjut ya…", () => {
    btnFirst.style.display = "none";
    btnHidden.style.display = "none";
    choiceContainer.style.display = "flex"; // munculin pilihan iya/tidak
  });
}

// Animasi balon love
function createBalloon() {
  const balloon = document.createElement("div");
  balloon.className = "balloon";
  balloon.style.left = Math.random() * 90 + "%";
  balloon.style.animationDuration = 4000 + Math.random() * 3000 + "ms";
  balloonsContainer.appendChild(balloon);

  balloon.addEventListener("animationend", () => {
    balloon.remove();
  });
}

let balloonInterval;
function startBalloons() {
  balloonInterval = setInterval(createBalloon, 500);
}

function stopBalloons() {
  clearInterval(balloonInterval);
  balloonsContainer.innerHTML = "";
}
// Pesan jebakan tombol pertama
const prankMsgs = [
  "eh salah klik ternyata,coba cari tombol selain ini ",
  "ih ngeyel kamu ",
  "bukan ini ihhhh ",
  "masih aja penasaran ya? ",
  "Yaudah deh… di bilangin bukan ",
];
let prankIndex = 0;

// Pesan random untuk klik menu utama
const randomMsgs = [
  "Semangat ya Biya🌸, kapan ya mabar ",
  "Aku masih nunggu kita mabar",
];

// Fungsi tampilkan pesan random + suara ding
function showRandomMsg() {
  if (typing) return;
  const msg = randomMsgs[Math.floor(Math.random() * randomMsgs.length)];
  playSound(dingSound);
  typeText(msg);
}

// Fungsi tampilkan Megalodon
function showMegalodon() {
  if (typing) return;
  clearStage();
  wave.style.display = "block";
  megal.style.display = "block";
  setTimeout(() => megal.classList.add("show"), 60);
  spawnBubbles(5);
  typeText(megaMsgs[Math.floor(Math.random() * megaMsgs.length)], () => {
    showRandomMsg();
  });
}

// Fungsi tampilkan Kraken
function showKraken() {
  if (typing) return;
  clearStage();
  krak.style.display = "block";
  setTimeout(() => krak.classList.add("show"), 60);
  spawnBubbles(3);
  typeText(krakMsgs[Math.floor(Math.random() * krakMsgs.length)], () => {
    showRandomMsg();
  });
}

// Event listeners

// Tombol pertama (jebakan)
btnFirst.addEventListener("click", () => {
  if (typing || openedMenu) return;

  // Ambil pesan sesuai index
  const msg = prankMsgs[prankIndex];
  typeText(msg);

  // Kalau klik pertama → munculin tombol rahasia
  if (prankIndex === 0) {
    btnHidden.style.display = "block";
    playSound(boinkSound); // biar ada efek bunyi juga
  }

  // Update index
  prankIndex++;
  if (prankIndex >= prankMsgs.length) prankIndex = 1;
  // balik ke index 1 biar "Wkwkw ketipu 🤣" cuma muncul sekali
});

btnYes.addEventListener("click", () => {
  choiceContainer.style.display = "none";
  typeText(
    "Okeee sekarang aku kasih kamu 2 pilihan… Mau Megalodon 🦈 atau Kraken 🐙?",
    () => {
      startMainMenu();
    }
  );
});

// Klik Tidak → masuk ke konfirmasi (1 tombol yakin)
btnNo.addEventListener("click", () => {
  choiceContainer.style.display = "none";
  typeText("Yakin? 🤔", () => {
    confirmContainer.style.display = "flex";
  });
});

// Klik Yakin → muncul teks maksa → lalu tombol terakhir
btnSure.addEventListener("click", () => {
  confirmContainer.style.display = "none";
  typeText("Udah lanjut aja ya aku maksa HAHAHA 😂", () => {
    finalContainer.style.display = "flex";
  });
});

btnFinal.addEventListener("click", () => {
  finalContainer.style.display = "none";
  typeText(
    "Hey Biya, Semoga cepat lebih enakan ya, Jangan lupa minum air anget. Kalau mau diem aja, nggak papa. Aku ngerti kok. Semangat terus ya. Kalau butuh apa-apa bilang aja, aku siap dengerin ",
    () => {
      // setelah teks selesai, munculin tombol Oke Dhika
      document.getElementById("ok-container").style.display = "flex";
    }
  );
});

btnOk.addEventListener("click", () => {
  okContainer.style.display = "none"; // sembunyiin tombol
  typeText(
    "Okeee sekarang aku kasih kamu 2 pilihan… Mau Megalodon 🦈 atau Kraken 🐙?",
    () => {
      startMainMenu();
    }
  );
});

// Fungsi mulai menu utama
function startMainMenu() {
  menuMain.style.display = "flex";
  openedMenu = true;
  startBalloons();
}

// Tombol tersembunyi
btnHidden.addEventListener("click", () => {
  if (typing || openedMenu) return;
  showSuccessMessage();
});

// Tombol Megalodon
btnMega.addEventListener("click", () => {
  if (!openedMenu || typing) return;
  showMegalodon();
});

// Tombol Kraken
btnKraken.addEventListener("click", () => {
  if (!openedMenu || typing) return;
  showKraken();
});

// Tombol Acak
btnRand.addEventListener("click", () => {
  if (!openedMenu || typing) return;
  Math.random() < 0.5 ? showMegalodon() : showKraken();
});

// Load awal
window.addEventListener("load", () => {
  showOpening();
});
