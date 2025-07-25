const output = document.getElementById('output');
const input = document.getElementById('commandInput');

const responses = {
  help: "Comandos disponíveis: help, date, clear, about",
  date: new Date().toString(),
  about: "Simulador de terminal retrô inspirado em WarGames.",
};

input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const command = input.value.trim();
    output.innerHTML += `> ${command}\n`;

    if (command === "clear") {
      output.innerHTML = "";
    } if (command === "skynet") {
      output.innerHTML = "#################\n# SKYNET ONLINE #\n#################";
    } else {
      output.innerHTML += (responses[command] || "Comando não reconhecido.") + "\n";
    }

    input.value = "";
    window.scrollTo(0, document.body.scrollHeight);
  }
});
