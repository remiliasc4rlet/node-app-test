const os = require('os');
const si = require('systeminformation');
const ProgressBar = require('progressbar.js');

function closeApp() {
  window.close(); // Uygulamayı kapat
}

function minimizeApp() {
  window.minimize(); // Pencereyi minimize et
};

// Pencereyi kapatmak için butona tıklandığında
document.getElementById('close-button').addEventListener('click', () => {
  window.close();
});

// Pencereyi küçültmek için butona tıklandığında
document.getElementById('minimize-button').addEventListener('click', () => {
  window.minimize();
});

// Pencereyi büyütmek veya küçültmek için butona tıklandığında
document.getElementById('maximize-button').addEventListener('click', () => {
  if (window.isMaximized()) {
    window.unmaximize();
  } else {
    window.maximize();
  }
});



// Belirli aralıklarla tüm kullanımları güncelle
setInterval(updateAllUsages, 100);