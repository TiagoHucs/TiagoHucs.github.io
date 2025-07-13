let itens = [
  {
    titulo: "Viagem Espacial",
    descricao: "Uma jornada interplanetária repleta de descobertas científicas, desafios técnicos e maravilhas além da nossa compreensão."
  },
  {
    titulo: "Café & Códigos",
    descricao: "Um ambiente acolhedor para programadores apaixonados por tecnologia, café forte e boas conversas sobre inovação."
  },
  {
    titulo: "Mercado Futuro",
    descricao: "Explore tendências econômicas, criptomoedas e investimentos que moldam o amanhã em um mundo cada vez mais digital e veloz."
  }
];

const itemList = document.getElementById('item-list');
const itemForm = document.getElementById("item-form");
const tituloForm = document.getElementById('titulo-form');
const descricaoForm = document.getElementById('descricao-form');

renderList();

function showForm() {
  itemList.classList.add("hidden");
  itemForm.classList.remove("hidden");
}

function saveItem() {

  const tituloStr = tituloForm.value;
  const descricaoStr = descricaoForm.value;

  console.log('titulo:', tituloStr);
  console.log('descricao:', descricaoStr);

  const newItem = { titulo: tituloStr, descricao: descricaoStr };

  itens.push(newItem);

  renderList();

  tituloForm.value = null;
  descricaoForm.value = null;

  itemForm.classList.add("hidden");
}

function renderList() {
  itemList.innerHTML = '';
  itens.forEach(item => {
    const div = document.createElement('div');
    div.textContent = item.titulo;
    div.classList.add("item");
    itemList.appendChild(div);
  });
  itemList.classList.remove("hidden");
}

