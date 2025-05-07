const fs = require('fs');
const path = require('path');

const textDiv = document.getElementById('text');

// Caminho absoluto para o texto.txt
const filePath = path.join(__dirname, 'texto.txt');

// Lê o conteúdo do arquivo e coloca no HTML
fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    textDiv.innerText = 'Erro ao carregar o texto.';
    console.error(err);
    return;
  }
  textDiv.innerText = data;
});

let speed = 1;
let paused = true;
let interval;

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
}

function slower() {
  if (speed > 1) speed -= 1;
}
