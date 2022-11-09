let listaStorage = JSON.parse(localStorage.getItem("listaStorage")) || [];
let lista = [];
let listaEliminados = [];
let btnAgregar = document.getElementById("botonAgregar");
const panelPop = document.getElementById("panelPop");
const selector = document.getElementById("selector");
const busqueda = document.getElementById("busqueda");
let panel = document.getElementById("panel");
let panel2 = document.getElementById("panel2");
let panelGrid = document.getElementById("panelGrid");
let panel2Grid = document.getElementById("panel2Grid");
const btnPopX = document.querySelector(".botonSalir");
let btnPopSave = document.querySelector(".botonGuardar");
let panelActivoLista = [];
let panelFocus = "";
let panelFocusId = "panel";
const inputTitulo = document.getElementById("notaInputTitulo");
const inputTexto = document.getElementById("notaInputTexto");
let climaApp = document.getElementById("climaApp");
let divPanelBtn = document.querySelector(".divPanelBtn");

//Clases *************************************************************************
class Nota {
  constructor(titulo, texto, fecha, idNota) {
    this.titulo = titulo;
    this.texto = texto;
    this.fecha = fecha;
    this.idNota = parseInt(idNota);
  }
  getLowStr() {
    return this.titulo.toLowerCase();
  }
  getTextoLowStr() {
    return this.texto.toLowerCase();
  }
  push(array) {
    return array.push(this);
  }
  scan() {
    inputTitulo.value = this.titulo;
    inputTexto.value = this.texto;
    return this;
  }
  saveEdit() {
    this.titulo = inputTitulo.value;
    this.texto = inputTexto.value;
    this.lastEdit = new Date();
    return this;
  }
  imprimir(paneliDName) {
    switch (paneliDName) {
      case panel:
        btnAgregar.remove();
        panelGrid.innerHTML += `
      <div class="nota ${this.idNota}" id="${this.idNota}">
      <div class="btnDiv">
      <button class="btnEdit">🖊</button>
      <button class="btnX">❌</button>
      </div>
      <div class="titulo">${this.titulo}</div>
      <div class="texto">${this.texto}</div>
      </div>
      `;
        panelGrid.insertAdjacentElement("afterbegin", btnAgregar);

        break;
      case panel2:
        panel2Grid.innerHTML += `
        <div class="nota" id="${this.idNota}">
          <div class="titulo">${this.titulo}</div>
          <div class="texto">${this.texto}</div>
        </div>
        `;
        break;
      default:
        console.log("not a number");
        break;
    }
  }
}
//ARRAYS *************************************************************************
//Funciones sort
Array.prototype.newFirst = function () {
  this.sort((a, b) => {
    if (a.fecha > b.fecha) {
      return -1;
    } else if (b.fecha > a.fecha) {
      return 1;
    } else {
      return 0;
    }
  });
  return this;
};
Array.prototype.oldFirst = function () {
  this.sort((a, b) => {
    if (b.fecha > a.fecha) {
      return -1;
    } else if (a.fecha > b.fecha) {
      return 1;
    } else {
      return 0;
    }
  });
  return this;
};
Array.prototype.aToZ = function () {
  this.sort((a, b) => {
    if (
      a.titulo.toLowerCase() < b.titulo.toLowerCase() &&
      a.texto.toLowerCase() < b.texto.toLowerCase()
    ) {
      return -2;
    } else if (
      a.titulo.toLowerCase() > b.titulo.toLowerCase() &&
      a.texto.toLowerCase() > b.texto.toLowerCase()
    ) {
      return 2;
    } else if (
      a.titulo.toLowerCase() < b.titulo.toLowerCase() ||
      a.texto.toLowerCase() < b.texto.toLowerCase()
    ) {
      return -1;
    } else if (
      a.titulo.toLowerCase() > b.titulo.toLowerCase() ||
      a.texto.toLowerCase() > b.texto.toLowerCase()
    ) {
      return 1;
    } else {
      return 0;
    }
  });
  return this;
};
Array.prototype.searchTxt = function (txt) {
  notasEncontradas = [];
  this.forEach((nota) => {
    copy = new Nota(nota.titulo, nota.texto, nota.fecha, nota.idNota);
    notaTitulo = copy.getLowStr();
    notaTexto = copy.getTextoLowStr();
    notaTitulo.includes(txt.toLowerCase()) ||
    notaTexto.includes(txt.toLowerCase())
      ? copy.push(notasEncontradas)
      : false;
  });
};
Array.prototype.printArray = function (panelIdName) {
  this.forEach((nota) => {
    copy = new Nota(nota.titulo, nota.texto, nota.fecha, nota.idNota);
    copy.imprimir(panelIdName);
  });
};
Array.prototype.storage = function (name) {
  localStorage.setItem(`${name}`, JSON.stringify(this));
  return this;
};
//FUNCIONES **********************************************************************
const panelPopFunct = (estado) => {
  estado == true
    ? anime({
        targets: "#panelPop",
        translateX: ["-200%", "0%"],
      })
    : anime({
        targets: "#panelPop",
        translateX: ["0%", "-200%"],
      });
  return panelPop;
};
const parsearLista = () => {
  localStorage.setItem("ListaParse", JSON.stringify(lista));
  lista = JSON.parse(localStorage.getItem("ListaParse"));
  return lista;
};
const limpiarPanel = (estado) => {
  estado === true
    ? ((panelGrid.innerHTML = ""), panelGrid.appendChild(btnAgregar))
    : (panel2Grid.innerHTML = "");
};
const limpiarPanelPop = () => {
  return (inputTitulo.value = ""), (inputTexto.value = "");
};
const openPanel = (num) => {
  let paneles = new Array(...document.getElementsByClassName("panel"));
  paneles.forEach((element) => {
    element.style.display = "none";
  });
  switch (num) {
    case 1: {
      let panelDOM = document.getElementById("panel");
      panelDOM.style.display = "block";
      break;
    }
    case 2: {
      let panelDOM = document.getElementById("panel2");
      panelDOM.style.display = "block";
      break;
    }
    default: {
      let panelDOM = document.getElementById("panel1");
      panelDOM.style.display = "block";
      break;
    }
  }
};
const getDomNotaId = (e) => {
  btnsDiv = e.parentElement;
  notaDiv = btnsDiv.parentElement;
  notaPosition = parseInt(notaDiv.id);
  return notaPosition;
};
const eliminar = () => {
  notaDiv.remove();
  listaBis = lista.filter((nota) => parseInt(notaDiv.id) == nota.idNota);
  listaEliminados.push(listaBis[0]);
  lista = lista.filter((nota) => parseInt(notaDiv.id) !== nota.idNota);
  return lista;
};
const switchToEdit = (isTrue) => {
  isTrue == true
    ? btnPopSave.setAttribute("class", "botonEditar")
    : btnPopSave.setAttribute("class", "botonGuardar");
  return isTrue;
};
const eventSort = (array) => {
  if (selector.selectedIndex === 0) {
    array.oldFirst();
    return array;
  } else if (selector.selectedIndex === 1) {
    array.newFirst();
    return array;
  } else if (selector.selectedIndex === 2) {
    array.aToZ();
    return array;
  }
};
const checkPanel = () => {
  let paneles = new Array(...document.getElementsByClassName("panel"));
  paneles.forEach((element) => {
    element.style.display == "block" ? (panelFocus = element) : false;
  });
  panelFocusId = panelFocus.id;
  return panelFocusId;
};
const elegirLista = (x) => {
  if (x == panel.id) {
    lista4 = lista;
  } else if (x == panel2.id) {
    lista5 = listaEliminados;
  }
  console.log(x);
};

//ANIMACIONES
const animarNota = (parametro) => {
  let notaAnim = document.getElementById(`${parametro}`);
  anime({
    targets: notaAnim,
    scale: [
      { value: 1.1, easing: "easeOutSine", duration: 500 },
      { value: 1, easing: "easeInOutQuad", duration: 1200 },
    ],
  });
};
const animarGrid = (nombrePanel) => {
  anime({
    targets: nombrePanel,
    scale: [
      { value: 0.9, easing: "easeOutSine", duration: 0 },
      { value: 1, easing: "easeInOutQuad", duration: 500 },
    ],
  });
};