    const button = document.getElementById('morseButton');
    const resultadoSpan = document.getElementById('resultado');

    let startTime = 0;
    let textoFinal = '';
    let bufferLetra = '';
    let ultimoSolto = 0;
    let letraProcessada = true;

    const duracaoLimite = 250;
    const intervaloEntreLetras = 800;

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

    function registrarSinal(duracaoPressionado) {
      const simbolo = duracaoPressionado < duracaoLimite ? '.' : '-';
      bufferLetra += simbolo;
      atualizarVisual();
      letraProcessada = false;
    }

    function processarLetra(buffer) {
      if (buffer.length === 0) return;
      const letra = morseToChar[buffer] || '?';
      textoFinal += letra;
      console.log(`Letra detectada: ${letra} (morse: ${buffer})`);
      atualizarVisualLimpo();
      bufferLetra = '';
    }

    function atualizarVisual() {
      resultadoSpan.textContent = textoFinal + bufferLetra;
    }

    function atualizarVisualLimpo() {
      resultadoSpan.textContent = textoFinal;
    }

    function iniciarPressao() {
      startTime = performance.now();
    }

    function finalizarPressao() {
      const duracao = performance.now() - startTime;
      registrarSinal(duracao);
      ultimoSolto = performance.now();
    }

    setInterval(() => {
      const agora = performance.now();
      const tempoDesdeUltimo = agora - ultimoSolto;
      console.log('loop')
      if (!letraProcessada && bufferLetra.length > 0 && tempoDesdeUltimo > intervaloEntreLetras) {
        processarLetra(bufferLetra);
        letraProcessada = true;
      }
    }, 100);

    button.addEventListener('mousedown', iniciarPressao);
    button.addEventListener('mouseup', finalizarPressao);

    button.addEventListener('touchstart', e => {
      e.preventDefault();
      iniciarPressao();
    }, { passive: false });

    button.addEventListener('touchend', finalizarPressao);