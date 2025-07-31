const morseMap = [
    { codigo: '.', letra: 'E', level: 1 },
    { codigo: '-', letra: 'T', level: 1 },

    { codigo: '.-', letra: 'A', level: 2 },
    { codigo: '-.', letra: 'N', level: 2 },

    { codigo: '..', letra: 'I', level: 3 },
    { codigo: '--', letra: 'M', level: 3 },

    { codigo: '...', letra: 'S', level: 4 },
    { codigo: '---', letra: 'O', level: 4 },

    { codigo: '-..', letra: 'D', level: 5 },
    { codigo: '..-', letra: 'U', level: 5 },

    { codigo: '.-.', letra: 'R', level: 6 },
    { codigo: '-.-', letra: 'K', level: 6 },

    { codigo: '-.-.', letra: 'C', level: 7 },
    { codigo: '.--.', letra: 'P', level: 7 },

    { codigo: '-...', letra: 'B', level: 8 },
    { codigo: '--.', letra: 'G', level: 8 },

    { codigo: '.--', letra: 'W', level: 9 },
    { codigo: '.-..', letra: 'L', level: 9 },

    { codigo: '--.-', letra: 'Q', level: 10 },
    { codigo: '....', letra: 'H', level: 10 },
    
    { codigo: '..-.', letra: 'F', level: 11 },
    { codigo: '-.--', letra: 'Y', level: 11 },
    
    { codigo: '--..', letra: 'Z', level: 12 },
    { codigo: '...-', letra: 'V', level: 12 },
    
    { codigo: '.---', letra: 'J', level: 13 },
    { codigo: '-..-', letra: 'X', level: 13 },

    { codigo: '-----', letra: '0', level: 14 },
    { codigo: '.----', letra: '1', level: 14 },
    { codigo: '..---', letra: '2', level: 14 },
    { codigo: '...--', letra: '3', level: 14 },
    { codigo: '....-', letra: '4', level: 14 },
    { codigo: '.....', letra: '5', level: 14 },
    { codigo: '-....', letra: '6', level: 14 },
    { codigo: '--...', letra: '7', level: 14 },
    { codigo: '---..', letra: '8', level: 14 },
    { codigo: '----.', letra: '9', level: 14 }
];

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let tempoPonto = 150;
let tempoTraco = 3 * tempoPonto;
let letraAtual = '';
let morseAtual = '';
let levelAtual = 1;
let levelAcertos = 0;

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
    const itemLevelList = getLevelMap();
    const aleatoria = itemLevelList[Math.floor(Math.random() * itemLevelList.length)];
    console.log(aleatoria)
    return aleatoria;
}

async function novaRodada() {
    document.getElementById('feedback').textContent = '?';
    criarBotoes();
    letraAtual = escolherLetraAleatoria();
    morseAtual = letraAtual.codigo;
    await tocarLetra(morseAtual);
}

function verificarResposta(resposta) {
    const feedback = document.getElementById('feedback');
    if (resposta === letraAtual.letra) {
        feedback.innerHTML = '✅ Correto! Era "' + letraAtual.letra + '" <br> ' + letraAtual.codigo;
        levelAcertos++;
        if(levelAcertos === 3){
            levelAcertos = 0;
            levelAtual++;
        }
    } else {
        feedback.innerHTML = '❌ Errado! Era "' + letraAtual.letra + '" <br> ' + letraAtual.codigo;
        levelAtual = 1;
    }
    setTimeout(novaRodada, 1500);
}

function getLevelMap(){
    return morseMap.filter(m => m.level <= levelAtual); 
}

function criarBotoes() {
    const container = document.getElementById('botoes-container');
    container.innerHTML = ''; // Limpa o conteúdo atual do container

    const itemLevelList = getLevelMap();
    itemLevelList.forEach(item => {
        const divBtn = document.createElement('div');
        divBtn.className = 'btn';
        divBtn.onclick = () => verificarResposta(item.letra);

        const divLetra = document.createElement('div');
        divLetra.textContent = item.letra;

        const divCodigo = document.createElement('div');
        divCodigo.textContent = item.codigo;

        divBtn.appendChild(divLetra);
        divBtn.appendChild(divCodigo);
        container.appendChild(divBtn);
    });
}

document.getElementById('iniciar').addEventListener('click', async () => {
    await audioContext.resume(); // necessário para ativar o áudio no primeiro clique
    document.getElementById('iniciar').style.display = 'none';
    document.getElementById('botoes-container').style.display = 'flex';
    //criarBotoes();
    setTimeout(novaRodada, 500); // aguarda um pouco para garantir que o som será tocado
});