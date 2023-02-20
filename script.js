let listDom = document.querySelector("#list");
let localTask = { id: "", task: "", check: false };
let arrayTask = [];
let i = 0;

// Localstorage

if (localStorage.getItem("load")) {
  ArrayTask = JSON.parse(localStorage.getItem("load"));
  ArrayTask.forEach((element) => {
    i++;
    element.id = `id${i}`;
    localStorage.setItem("load", JSON.stringify(ArrayTask));
    let liDom = document.createElement("li");
    liDom.setAttribute("id", `id${i}`);
    liDom.innerHTML = `
          ${element.task}
          <i 
          class = "fa-solid fa-xmark"
          onclick = "RemoveFunc(${i})">
          </i>
      `;
    listDom.append(liDom);
    if (ArrayTask[i - 1].check) {
      let changeLi = document.querySelector(`#id${i}`);
      changeLi.classList.add("checked");
    }
  });
}

// Button

function newElement() {
  const addTask = document.querySelector("#task");
  if (addTask.value.trim() == "") {
    $(".error").toast("show");
  } else {
    addItem(addTask.value);
    addTask.value = "";
    $(".success").toast("show");
  }
}

// Adding new list element

const addItem = (task) => {
  i++;
  localTask.task = task;
  localTask.id = `id${i}`;
  arrayTask.push(localTask);
  localStorage.setItem("load", JSON.stringify(arrayTask));
  arrayTask = JSON.parse(localStorage.getItem("load"));

  let liDom = document.createElement("li");
  liDom.setAttribute("id", `id${i}`);
  liDom.innerHTML = `
    ${task}<i class = "fa-solid fa-xmark" onclick = "RemoveFunc(${i})"></i>
    `;
  listDom.append(liDom);
};

// Removing list element

function RemoveFunc(j) {
  const element = document.querySelector(`#id${j}`);
  let index = arrayTask.findIndex((Atask) => {
    return JSON.stringify(Atask).indexOf(`id${j}`) >= 0;
  });
  arrayTask.splice(index, 1);
  localStorage.setItem("load", JSON.stringify(arrayTask));
  arrayTask = JSON.parse(localStorage.getItem("load"));
  element.remove();
}

// Checked

document.addEventListener("click", (element) => {
  if (element.target.matches("li")) {
    let elementId = element.target.id;
    let index = arrayTask.findIndex(function (Atask) {
      return JSON.stringify(Atask).indexOf(`${elementId}`) >= 0;
    });
    arrayTask[index].check = !arrayTask[index].check;
    localStorage.setItem("load", JSON.stringify(arrayTask));
    arrayTask = JSON.parse(localStorage.getItem("load"));
    let changeLi = document.querySelector(`#${elementId}`);
    changeLi.classList.toggle("checked");
  }
});
