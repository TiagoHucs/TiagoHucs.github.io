let pontuacao = 0;

let tempoRestante = 10;
let intervalo;

let acao;

document.getElementById("startBtn").addEventListener("click", iniciarJogo);

function iniciarJogo() {
    pontuacao = 0;
    tempoRestante = 10;
    document.getElementById("resultado").classList.add("hidden");
    document.getElementById("instrucoes").classList.add("hidden");
    document.getElementById("startBtn").classList.add("hidden");
    document.getElementById("acaoContainer").classList.remove("hidden");
    document.getElementById("botoesContainer").classList.remove("hidden");
    document.getElementById("timer").classList.remove("hidden");

    renderizarAcao();
    iniciarTimer();
}

function renderizarAcao() {
    acao = criaAcao();
    const card = document.getElementById("acaoCard");

    card.style.backgroundColor = acao.cor;
    document.getElementById("acaoValor").innerText = `R$ ${acao.valor}`;
    document.getElementById("acaoDirecao").innerText = `Direção: ${acao.dir}`;
}

function comprar() {
    pontuar(acao, 'compra');
    renderizarAcao();
}

function vender() {
    pontuar(acao, 'venda');
    renderizarAcao();
}

function iniciarTimer() {
    atualizarTimerTexto();

    intervalo = setInterval(() => {
        tempoRestante--;
        atualizarTimerTexto();

        if (tempoRestante <= 0) {
            clearInterval(intervalo);
            fimDeJogo();
        }
    }, 1000);
}

function atualizarTimerTexto() {
    document.getElementById("timer").innerText = `Tempo: ${tempoRestante}s`;
}

function fimDeJogo() {
    document.getElementById("acaoContainer").classList.add("hidden");
    document.getElementById("botoesContainer").classList.add("hidden");
    document.getElementById("timer").classList.add("hidden");


    gravaMelhorPontuacao();

    const resultadoDiv = document.getElementById("resultado");
    document.getElementById("startBtn").classList.remove("hidden");
    resultadoDiv.classList.remove("hidden");
    resultadoDiv.innerHTML = `
    <h4>Fim de jogo!</h4>
    <p style="color:gray">Melhor pontuação: <strong>R$ ${getBestScore()}</strong></p>
    <p>Total Pontuado: <strong>R$ ${pontuacao}</strong></p>
  `;

}

function criaAcao() {
    let dirCode = geraRandom(2);
    let corCode = geraRandom(2);
    return {
        valor: geraRandom(100),
        cor: corCode == 1 ? "green" : "red",
        dir: dirCode == 1 ? "alta" : "baixa"
    };
}

function geraRandom(num) {
    return Math.floor(Math.random() * num) + 1;
}

function pontuar(acao, evento) {
    const acaoBoa = (acao.cor === "green" && acao.dir === "alta") || (acao.cor === "red" && acao.dir === "baixa");
    const comprou = 'compra' === evento ? true : false;

    if ((acaoBoa && comprou) || (!acaoBoa && !comprou)) {
        console.log("BOM")
        pontuacao += acao.valor;
    } else {
        console.log("passo ruin")
        pontuacao -= acao.valor;
    }
    console.log(acao)
    console.log(pontuacao);
}

function gravaMelhorPontuacao() {
    let melhorPontuacao = getBestScore();
    if (pontuacao > melhorPontuacao) {
        saveBestScore()
    }
}

function saveBestScore() {
    //localStorage.setItem("bestscore", JSON.stringify(bestCar.brain));
    localStorage.setItem("bestscore", pontuacao);
}

function getBestScore() {
    //objeto ? JSON.parse(bestscore) : null;
    return localStorage.getItem("bestscore");
}

function clearBestScore() {
    localStorage.removeItem("bestscore");
}
