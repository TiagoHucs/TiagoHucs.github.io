let itens = [];
let itemAtual = null;

const itemList = document.getElementById('item-list');
const actualItemElement = document.getElementById('actual-item');
const btnShowForm = document.getElementById('btn-show-form');
const itemForm = document.getElementById('item-form');
const tituloForm = document.getElementById('titulo-form');
const descricaoForm = document.getElementById('descricao-form');

init();

function init() {
  loadFromStorage();
  renderList();
}

function showForm() {
  itemList.classList.add('d-none');
  btnShowForm.classList.add('d-none');
  itemForm.classList.remove('d-none');
}

function saveItem() {
  const titulo = tituloForm.value.trim();
  const descricao = descricaoForm.value.trim();

  if (!titulo) return;

  let parentId = undefined
  if(itemAtual){
    parentId = itemAtual.id
  }

  const newItem = {
    id: crypto.randomUUID(),
    titulo: titulo,
    descricao: descricao,
    parentId: parentId
  };

  itens.push(newItem);
  saveToStorage();
  renderList();
  clearForm();
  hideForm();
}

function renderList() {
  itemList.innerHTML = '';
  
  let itensToRender;
  if(itemAtual){
    itensToRender = itens.filter(i => i.parentId === itemAtual.id);
  } else {
    itensToRender = itens.filter(i => i.parentId === undefined);
  }


  itensToRender.forEach(item => {
    const itemContainer = document.createElement('div');
    itemContainer.classList.add('border', 'rounded', 'p-3', 'mb-3', 'cursor-pointer' , 'item', 'list-item');
    itemContainer.style.cursor = 'pointer';

    const idDiv = document.createElement('div');
    idDiv.textContent = `ID: ${item.id}`;
    idDiv.classList.add('text-muted', 'small');

    const tituloDiv = document.createElement('div');
    tituloDiv.textContent = item.titulo;
    tituloDiv.classList.add('fw-bold', 'fs-5');

    const descricaoDiv = document.createElement('div');
    descricaoDiv.textContent = item.descricao;
    descricaoDiv.classList.add('text-secondary');

    itemContainer.appendChild(idDiv);
    itemContainer.appendChild(tituloDiv);
    itemContainer.appendChild(descricaoDiv);

    itemContainer.onclick = () => setCurrentItem(item.id);

    itemList.appendChild(itemContainer);
  });

  itemList.classList.remove('d-none');
}

function setCurrentItem(id) {
  itemAtual = itens.find(item => item.id === id);
  renderCurrentItem();
  renderList();
}

function renderCurrentItem() {
  actualItemElement.innerHTML = ''; // limpa conteúdo anterior
  if (!itemAtual) return;
  
const itemContainer = document.createElement('div');
    itemContainer.classList.add('border', 'rounded', 'p-3', 'mb-3', 'cursor-pointer' , 'item', 'actual-item');
    itemContainer.style.cursor = 'pointer';

    const idDiv = document.createElement('div');
    idDiv.textContent = `ID: ${itemAtual.id}`;
    idDiv.classList.add('text-muted', 'small');

    const tituloDiv = document.createElement('div');
    tituloDiv.textContent = itemAtual.titulo;
    tituloDiv.classList.add('fw-bold', 'fs-5');

    const descricaoDiv = document.createElement('div');
    descricaoDiv.textContent = itemAtual.descricao;
    descricaoDiv.classList.add('text-secondary');

    itemContainer.appendChild(idDiv);
    itemContainer.appendChild(tituloDiv);
    itemContainer.appendChild(descricaoDiv);

    itemContainer.onclick = () => setCurrentItem(itemAtual.parentId);

  actualItemElement.appendChild(itemContainer);
}

function cancelForm() {
  clearForm();
  hideForm();
  renderList();
}

function clearForm() {
  tituloForm.value = '';
  descricaoForm.value = '';
}

function hideForm() {
  itemForm.classList.add('d-none');
  btnShowForm.classList.remove('d-none');
}

function saveToStorage() {
  localStorage.setItem('brainMyItens', JSON.stringify(itens));
}

function loadFromStorage() {
  const stored = localStorage.getItem('brainMyItens');
  itens = stored ? JSON.parse(stored) : [];
}

function clearStorage() {
  localStorage.removeItem('brainMyItens');
}
