const container = document.querySelector(".container");
const input = document.querySelector(".input");
const addButton = document.querySelector(".add");

function addTarefa(nomeDaTarefa) {
  const itemTarefa = document.createElement("div");
  itemTarefa.classList.add("item");

  const inputTarefa = document.createElement("input");
  inputTarefa.type = "text";
  inputTarefa.disabled = true;
  inputTarefa.value = nomeDaTarefa;
  inputTarefa.classList.add("item-input");

  const btnEditar = document.createElement("button");
  btnEditar.classList.add("editar");
  btnEditar.innerText = "EDITAR";
  btnEditar.addEventListener("click", () =>
    editarTarefa(inputTarefa, nomeDaTarefa)
  );

  const btnRemover = document.createElement("button");
  btnRemover.classList.add("remover");
  btnRemover.innerText = "REMOVER";
  btnRemover.addEventListener("click", () =>
    deletarTarefa(itemTarefa, nomeDaTarefa)
  );

  container.appendChild(itemTarefa);
  itemTarefa.appendChild(inputTarefa);
  itemTarefa.appendChild(btnEditar);
  itemTarefa.appendChild(btnRemover);
}
function savetasks(){
  window.localStorage.setItem("tasks", JSON.stringify(tasks))
}
function editarTarefa(input, nomeDaTarefa) {
input.disabled = !input.disabled
if (!input.disabled) {
  const [index] = tasks.indexOf(nomeDaTarefa)
  tasks[index] = input.value
  savetasks()
}
}

function deletarTarefa(itemTarefa, nomeDaTarefa) {
 container.removeChild(itemTarefa)
 const index = tasks.indexOf(nomeDaTarefa)
 tasks.splice(index, 1)
 savetasks()
}
function checkinput() {
  const valorinput = input.value;
  if (valorinput !== "") {
    addTarefa(valorinput)
    tasks.push(valorinput)
    savetasks()
    input.value=''
  }
}
addButton.addEventListener('click', checkinput)
window.addEventListener('keypress',(e) => {
  if( e.key ==='Enter'){
    checkinput()
  }
})
const tasks = JSON.parse(window.localStorage.getItem("tasks")) ||[]
for (const task of tasks){
  addTarefa(task)
}