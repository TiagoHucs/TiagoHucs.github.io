const morseCodeMap = {
  ".-": "A", "-...": "B", "-.-.": "C", "-..": "D",
  ".": "E", "..-.": "F", "--.": "G", "....": "H",
  "..": "I", ".---": "J", "-.-": "K", ".-..": "L",
  "--": "M", "-.": "N", "---": "O", ".--.": "P",
  "--.-": "Q", ".-.": "R", "...": "S", "-": "T",
  "..-": "U", "...-": "V", ".--": "W", "-..-": "X",
  "-.--": "Y", "--..": "Z", "": " "
};

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playBeep(duration = 150, frequency = 600, volume = 0.5) {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = "sine"; // você pode usar "square" também
  oscillator.frequency.value = frequency;

  gainNode.gain.value = volume;

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  setTimeout(() => {
    oscillator.stop();
  }, duration);
}

let currentSymbol = "";
let output = "";
let pressStartTime = 0;
let timeout;

const button = document.getElementById("morseButton");
const outputDiv = document.getElementById("output");

button.addEventListener("mousedown", () => {
  pressStartTime = new Date().getTime();
  clearTimeout(timeout);
});

button.addEventListener("mouseup", () => {
  const duration = new Date().getTime() - pressStartTime;

  if (duration < 300) {
    currentSymbol += ".";
    playBeep(150, 700); // ponto
  } else {
    currentSymbol += "-";
    playBeep(400, 700); // traço
  }


  // Aguarda 1 segundo de inatividade para decodificar a letra
  timeout = setTimeout(() => {
    const letter = morseCodeMap[currentSymbol] || "?";
    output += letter;
    currentSymbol = "";
    outputDiv.textContent = "Texto: " + output;
  }, 1000);
});

// ... (código anterior permanece igual)

const clearButton = document.getElementById("clearButton");

clearButton.addEventListener("click", () => {
  currentSymbol = "";
  output = "";
  outputDiv.textContent = "Texto: ";
  clearTimeout(timeout);
});


//tocar uma sequencia
function playMorseSequence(sequence, onEnd) {
  let index = 0;

  function playNext() {
    if (index >= sequence.length) {
      if (onEnd) onEnd();
      return;
    }

    const symbol = sequence[index++];
    if (symbol === ".") {
      playBeep(150, 700);
      setTimeout(playNext, 200); // pausa curta
    } else if (symbol === "-") {
      playBeep(400, 700);
      setTimeout(playNext, 450); // pausa longa
    } else {
      setTimeout(playNext, 200);
    }
  }

  playNext();
}

// ▶️ Toca "A" (.-) automaticamente ao carregar
window.addEventListener("load", () => {
  const initialLetter = "A";
  const morse = Object.entries(morseCodeMap).find(([code, letter]) => letter === initialLetter);
  
  if (morse) {
    currentSymbol = "";
    output = initialLetter;
    outputDiv.textContent = "Texto: " + output;
    playMorseSequence(morse[0]);
  }
});
