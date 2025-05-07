const fs = require('fs');
const path = require('path');

const textDiv = document.getElementById('text');
const body = document.body;

// Leitura do texto.txt
fs.readFile(path.join(__dirname, 'texto.txt'), 'utf-8', (err, data) => {
  if (err) {
    textDiv.innerText = 'Erro ao carregar o texto.';
    console.error(err);
    return;
  }
  textDiv.innerText = data;
});

let speed = 1;
let interval = null;
let paused = true;

function scrollText() {
  window.scrollBy(0, speed);
}

function startScroll() {
  if (!paused) return;
  paused = false;
  interval = setInterval(scrollText, 30);
}

function pauseScroll() {
  paused = true;
  clearInterval(interval);
}

// Permitir rolagem manual com teclado quando pausado
window.addEventListener('keydown', (e) => {
  if (!paused) return;

  const scrollStep = 30;

  if (e.key === 'ArrowUp') {
    window.scrollBy(0, -scrollStep);
  } else if (e.key === 'ArrowDown') {
    window.scrollBy(0, scrollStep);
  } else if (e.key === 'PageUp') {
    window.scrollBy(0, -window.innerHeight);
  } else if (e.key === 'PageDown') {
    window.scrollBy(0, window.innerHeight);
  }
});

// Rolar com o mouse quando pausado
window.addEventListener('wheel', (e) => {
  if (!paused) return;
  e.preventDefault();
  window.scrollBy(0, e.deltaY);
}, { passive: false });

function faster() {
  speed += 1;
  document.getElementById('speedSlider').value = speed;
  updateSettingsDisplay();
}

function slower() {
  if (speed > 1) speed -= 1;
  document.getElementById('speedSlider').value = speed;
  updateSettingsDisplay();
}

// Modal de Configurações
function toggleSettings() {
  const modal = document.getElementById('settingsModal');
  const overlay = document.getElementById('overlay');
  const visible = modal.style.display === 'block';

  modal.style.display = visible ? 'none' : 'block';
  overlay.style.display = visible ? 'none' : 'block';
  updateSettingsDisplay();
}

function updateSettingsDisplay() {
  document.getElementById('speedVal').innerText = speed;
  document.getElementById('fontSizeVal').innerText = textDiv.style.fontSize.replace('px', '');
  document.getElementById('opacityVal').innerText = parseFloat(body.style.backgroundColor.split(',')[3] || 0.15).toFixed(2);
  document.getElementById('textColorVal').innerText = textDiv.style.color || '#ffffff';
  document.getElementById('textColorPicker').value = rgbToHex(textDiv.style.color || '#ffffff');
}

// Eventos dos sliders
document.getElementById('speedSlider').addEventListener('input', (e) => {
  speed = parseInt(e.target.value);
  updateSettingsDisplay();
});

document.getElementById('fontSizeSlider').addEventListener('input', (e) => {
  const size = e.target.value;
  textDiv.style.fontSize = `${size}px`;
  updateSettingsDisplay();
});

document.getElementById('opacitySlider').addEventListener('input', (e) => {
  const opacity = parseFloat(e.target.value);
  body.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
  updateSettingsDisplay();
});

function rgbToHex(rgb) {
  if (!rgb) return '#ffffff';
  const result = rgb.match(/\d+/g);
  if (!result || result.length < 3) return '#ffffff';
  return '#' + result.slice(0, 3).map(x => {
    const hex = parseInt(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

