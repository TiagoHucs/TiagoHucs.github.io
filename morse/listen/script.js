const morseMap = {
    '.': 'E','-': 'T',
    '.-': 'A','-.': 'N', 
    '-...': 'B', '-.-.': 'C', '-..': 'D',
     '..-.': 'F', '--.': 'G', '....': 'H',
    '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
    '--': 'M',  '---': 'O', '.--.': 'P',
    '--.-': 'Q', '.-.': 'R', '...': 'S', 
    '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
    '-.--': 'Y', '--..': 'Z',
    '-----': '0', '.----': '1', '..---': '2', '...--': '3',
    '....-': '4', '.....': '5', '-....': '6', '--...': '7',
    '---..': '8', '----.': '9'
};

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let tempoPonto = 150;
let tempoTraco = 3 * tempoPonto;
let letraAtual = '';
let morseAtual = '';

const letraParaMorse = {};
for (const [morse, letra] of Object.entries(morseMap)) {
    letraParaMorse[letra] = morse;
}

async function tocarLetra(morse) {
    for (const simbolo of morse) {
        const duracao = simbolo === '.' ? tempoPonto : tempoTraco;

        const oscillator = audioContext.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(700, audioContext.currentTime);

        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();
        setTimeout(() => oscillator.stop(), duracao);

        await new Promise(resolve => setTimeout(resolve, duracao + tempoPonto));
    }
}

function escolherLetraAleatoria() {
    const letras = Object.values(morseMap);
    const aleatoria = letras[Math.floor(Math.random() * letras.length)];
    return aleatoria;
}

async function novaRodada() {
    document.getElementById('feedback').textContent = '...';
    letraAtual = escolherLetraAleatoria();
    morseAtual = letraParaMorse[letraAtual];
    await tocarLetra(morseAtual);
}

function verificarResposta(resposta) {
    const feedback = document.getElementById('feedback');
    if (resposta === letraAtual) {
        feedback.textContent = '✅ Correto! Era "' + letraAtual + '"';
    } else {
        feedback.textContent = '❌ Errado! Era "' + letraAtual + '"';
    }
    setTimeout(novaRodada, 1500);
}

function criarBotoes() {
    const container = document.getElementById('botoes-container');
    const caracteres = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'];
    caracteres.forEach(char => {
        const btn = document.createElement('button');
        btn.textContent = char;
        btn.onclick = () => verificarResposta(char);
        container.appendChild(btn);
    });
}

document.getElementById('iniciar').addEventListener('click', async () => {
    await audioContext.resume(); // necessário para ativar o áudio no primeiro clique
    document.getElementById('iniciar').style.display = 'none';
    document.getElementById('botoes-container').style.display = 'flex';
    criarBotoes();
    setTimeout(novaRodada, 500); // aguarda um pouco para garantir que o som será tocado
});