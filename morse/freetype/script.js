const button = document.getElementById('morseButton');
const resultadoSpan = document.getElementById('resultado');
const resultadoTexto = document.getElementById('resultado-texto');

let startTime = 0;
let bufferLetra = '';
let ultimoSolto = 0;

const duracaoLimite = 250;
const intervaloEntreLetras = 800;

// Web Audio API
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let oscillator = null;

function registrarSinal(duracaoPressionado) {
  const simbolo = duracaoPressionado < duracaoLimite ? '.' : '-';
  bufferLetra += simbolo;
  atualizarVisual();
}

function atualizarVisual() {
  resultadoSpan.textContent = bufferLetra;
  traduzir(resultadoSpan.textContent);
}

const morseToChar = {
  '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D',
  '.': 'E', '..-.': 'F', '--.': 'G', '....': 'H',
  '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
  '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P',
  '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T',
  '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
  '-.--': 'Y', '--..': 'Z',
  '-----': '0', '.----': '1', '..---': '2', '...--': '3',
  '....-': '4', '.....': '5', '-....': '6', '--...': '7',
  '---..': '8', '----.': '9'
};

function traduzir(morse){
  // Divide o texto Morse por espaço (um código por letra)
  const palavras = morse.trim().split('   '); // 3 espaços indicam espaço entre palavras
  const textoConvertido = palavras.map(palavra =>
    palavra.split(' ').map(codigo => morseToChar[codigo] || '?').join('')
  ).join(' ');

  resultadoTexto.textContent = textoConvertido;
}

function iniciarPressao() {
  startTime = performance.now();
  iniciarSom();
}

function finalizarPressao() {
  const duracao = performance.now() - startTime;
  registrarSinal(duracao);
  ultimoSolto = performance.now();
  pararSom();
}

function iniciarSom() {
  oscillator = audioContext.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(700, audioContext.currentTime);
  oscillator.connect(audioContext.destination);
  oscillator.start();
}

function pararSom() {
  if (oscillator) {
    oscillator.stop();
    oscillator.disconnect();
    oscillator = null;
  }
}

// Se desejar separar letras visualmente após pausa:
setInterval(() => {
  const agora = performance.now();
  const tempoDesdeUltimo = agora - ultimoSolto;
  if (bufferLetra.length > 0 && tempoDesdeUltimo > intervaloEntreLetras) {
    bufferLetra += ' ';
    atualizarVisual();
    ultimoSolto = agora + 100000; // evita repetir
  }
}, 100);

button.addEventListener('mousedown', iniciarPressao);
button.addEventListener('mouseup', finalizarPressao);

button.addEventListener('touchstart', e => {
  e.preventDefault();
  iniciarPressao();
}, { passive: false });

button.addEventListener('touchend', finalizarPressao);
