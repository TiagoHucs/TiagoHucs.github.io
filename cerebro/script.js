let itens = [];
let itemAtual;

const itemList = document.getElementById('item-list');
const actualItensElement = document.getElementById('actual-item');
const btnShowForm = document.getElementById("btn-show-form");
const itemForm = document.getElementById("item-form");
const tituloForm = document.getElementById('titulo-form');
const descricaoForm = document.getElementById('descricao-form');

getStorage();
renderList();

function showForm() {
  itemList.classList.add("hidden");
  btnShowForm.classList.add("hidden");
  itemForm.classList.remove("hidden");
  
}

function saveItem() {

  const tituloStr = tituloForm.value;
  const descricaoStr = descricaoForm.value;

  console.log('titulo:', tituloStr);
  console.log('descricao:', descricaoStr);

  const newItem = { id: crypto.randomUUID(), titulo: tituloStr, descricao: descricaoStr };

  itens.push(newItem);
  saveStorage();

  renderList();

  tituloForm.value = null;
  descricaoForm.value = null;

  itemForm.classList.add("hidden");
  btnShowForm.classList.remove("hidden");
}

function renderList() {
  itemList.innerHTML = '';
  getStorage();
  itens.forEach(item => {
    const div = document.createElement('div');
    div.textContent = item.titulo;
    div.classList.add("item");
    div.onclick = () => {
     setActualItem(item.id);
    };
    itemList.appendChild(div);
  });
  itemList.classList.remove("hidden");
}

function setActualItem(chosedId){
   itemAtual = itens.find(i => i.id === chosedId);
   renderActualIten(itemAtual);
}

function renderActualIten(item){
    const div = document.createElement('div');
    div.textContent = item.titulo;
    div.classList.add("actualItem");
    console.log('renderiou')
    actualItensElement = div;
}

function saveStorage() {
    localStorage.setItem("brainMyItens", JSON.stringify(itens));
}

function getStorage() {
    const objects = localStorage.getItem("brainMyItens");
    if(objects){
      const savedItens = JSON.parse(objects);
      itens = savedItens;
    }
}

function clearStorage() {
    localStorage.removeItem("brainMyItens");
}


