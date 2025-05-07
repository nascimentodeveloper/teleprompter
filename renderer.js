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
