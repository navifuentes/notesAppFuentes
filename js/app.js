// Array vacio para pushear las notas
let listaDeNotas = JSON.parse(localStorage.getItem("listaDeNotas")) || [];
const notasEncontradas = [];
let notaStorage = JSON.parse(sessionStorage.getItem("notaStorage")) || [];
//QuerySelector
const body = document.getElementById("body");
const seccionPaneles = document.getElementById("seccionPaneles");
const panel = document.getElementById("panel");
const panelPop = document.getElementById("panelPop");
const selector = document.getElementById("selector");
const busqueda = document.getElementById("busqueda");
const btnAgregar = document.getElementById("botonAgregar");
let btnXDivCont = "";

// CONSTRUCTORES
// Objeto Nota
class Nota {
  constructor(titulo, texto, fecha, idNota) {
    this.titulo = titulo;
    this.texto = texto;
    this.fecha = fecha;
    this.idNota = idNota;
  }
}
//Funcion  imprimir nota desde Array
const imprimirNotas = (array) => {
  array.forEach((nota) => {
    let notaScan = document.createElement("div");
    notaScan.setAttribute("class", "nota");
    notaScan.setAttribute("id", nota.idNota);
    let notaScanBtnDiv = document.createElement("div");
    notaScanBtnDiv.setAttribute("class", "btnDiv");
    let notaScanBtnX = document.createElement("button");
    notaScanBtnX.setAttribute("class", "btnX");
    notaScanBtnX.innerHTML = "❌";
    let notaScanBtnEdit = document.createElement("button");
    notaScanBtnEdit.setAttribute("class", "btnEdit");
    notaScanBtnEdit.innerHTML = "🖊";
    notaScanBtnDiv.append(notaScanBtnEdit);
    notaScanBtnDiv.append(notaScanBtnX);
    notaScan.append(notaScanBtnDiv);
    let notaScanTitulo = document.createElement("div");
    notaScanTitulo.setAttribute("class", "titulo");
    notaScanTitulo.innerHTML = nota.titulo;
    notaScan.append(notaScanTitulo);
    let notaScanTexto = document.createElement("div");
    notaScanTexto.setAttribute("class", "texto");
    notaScanTexto.innerHTML = nota.texto;
    notaScan.append(notaScanTexto);
    panel.append(notaScan);
  });
  //prepara evento eliminar
  btnXArray();
  return array;
};
// Funcion Crear nota pushear al array
// se guarda guarda un Constructor en el array
const notaNuevaStorage = () => {
  let titulo = document.querySelector("#notaInputTitulo").value;
  let texto = document.querySelector("#notaInputTexto").value;
  let fecha = new Date();
  let idNota = listaDeNotas.length + 1;
  let notaNueva = new Nota(titulo, texto, fecha, idNota);
  sessionStorage.setItem("notaStorage", JSON.stringify(notaNueva));
  let notaStorage = JSON.parse(sessionStorage.getItem("notaStorage"));
  listaDeNotas.push(notaStorage);
  pasarALocalStorage(listaDeNotas);
  return listaDeNotas;
};
//Funcion parsear Nota a Session Storage
const parsearSession = (element) => {
  //crear una Nota y pushear al Session Storage
  sessionStorage.removeItem("notaStorage");
  let btnXDiv = element.parentElement;
  btnXDivCont = btnXDiv.parentElement;
  let elId = parseInt(btnXDivCont.id);
  let notaParse = listaDeNotas.filter((nota) => nota.idNota == elId);
  let notaLog = notaParse[0];
  let titulo = notaLog.titulo;
  let texto = notaLog.texto;
  let fecha = notaLog.fecha;
  let idNota = notaLog.idNota;
  let notaNueva = new Nota(titulo, texto, fecha, idNota);
  sessionStorage.setItem("notaStorage", JSON.stringify(notaNueva));
  notaStorage = JSON.parse(sessionStorage.getItem("notaStorage"));
};
// Funcion LLevar Array a LocalStorage
// purga Constructores
const pasarALocalStorage = (array) => {
  localStorage.setItem("listaDeNotas", JSON.stringify(array));
  JSON.parse(localStorage.getItem("listaDeNotas"));
};
//Funcion traer lista LocalStorage --> consola
const actualizarLista = () => {
  let listaActualizada = JSON.parse(localStorage.getItem("listaDeNotas"));
  limpiarPanel();
  imprimirNotas(listaActualizada);
  listaDeNotas = JSON.parse(localStorage.getItem("listaDeNotas"));
};
//Limpiar Panel
const limpiarPanel = () => {
  panel.removeChild(btnAgregar);
  panel.innerHTML = ``;
  panel.insertAdjacentElement("afterbegin", btnAgregar);
};
// Funcion Pasar notas Sin Imprimir
const funcionSinImprimir = () => {
  let checkNota = panel.lastChild;
  let checkNotaId = parseInt(checkNota.getAttribute("id"));
  return checkNotaId < listaDeNotas.length
    ? (limpiarPanel(), imprimirNotas(listaDeNotas))
    : false;
};
// Funcion Pasar notas Sin Imprimir
const notasSinImprimir = () => {
  if (panel.childElementCount === 1) {
    imprimirNotas(listaDeNotas);
  } else {
    funcionSinImprimir();
  }
};
// Funcion Salir del Pop Nota Input
const salirPanelPop = () => {
  let panelPop = document.getElementById("panelPop");
  panelPop.remove();
};
//Funcion Crear Pop Nota Input
const crearPanelPop = () => {
  let notaInput = document.createElement("section");
  notaInput.setAttribute("id", "panelPop");
  notaInput.setAttribute("class", "panelPop");
  notaInput.innerHTML = `
                          <div class="notaInput">
                            <div class="notaInputBotones">
                              <button class="botonGuardar">✔</button>
                              <button class="botonSalir">❌</button>
                            </div>
                            <input id="notaInputTitulo" type="text" placeholder="new note" class="titulo" />
                            <textarea id="notaInputTexto" placeholder="📝" class="texto"></textarea>
                          </div>  
                          `;
  body.insertAdjacentElement("afterbegin", notaInput);
};
//Funcion eliminar nota
const eliminar = () => {
  let parseIntId = parseInt(btnXDivCont.id);
  let listaNotasFilter = listaDeNotas.filter(
    (nota) => nota.idNota !== parseIntId
  );
  pasarALocalStorage(listaNotasFilter);
  btnXDivCont.remove();
};
//funcion para buscar una string en las notas
//pasa todo a LowerCase
function buscarTexto(txt) {
  notasEncontradas.length = 0;
  listaDeNotas.forEach((nota) => {
    //Pasar los strings a minuscula
    let stringMinusculas = txt.toLowerCase();
    let textoMinusculas = nota.texto.toLowerCase();
    let tituloMinusculas = nota.titulo.toLowerCase();
    //comparar los strings
    if (
      textoMinusculas.includes(stringMinusculas) ||
      tituloMinusculas.includes(stringMinusculas)
    ) {
      notasEncontradas.push(nota);
    }
  });
}
//Funcion Sort Lista
const sortLista = () => {
  let sort = selector.selectedIndex;
  if (sort === 0) {
    ordenarNotasPorFecha();
    buscarTexto(busqueda.value);
  } else if (sort === 2) {
    ordenarNotasAlfabeticamente();
    buscarTexto(busqueda.value);
  } else if (sort === 1) {
    ordenarNotasPorAdd();
    buscarTexto(busqueda.value);
  }
};
//Ordenar por nombre
const ordenarNotasAlfabeticamente = () => {
  listaDeNotas.sort((a, b) => {
    if (
      a.titulo.toLowerCase() < b.titulo.toLowerCase() &&
      a.texto.toLowerCase() < b.texto.toLowerCase()
    ) {
      return -2;
    } else if (
      a.titulo.toLowerCase() > b.titulo.toLowerCase() &&
      a.texto.toLowerCase() > b.texto.toLowerCase()
    ) {
      return -2;
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
};
//Ordenar por Fecha Latest added
const ordenarNotasPorFecha = () => {
  listaDeNotas.sort((a, b) => {
    if (a.fecha > b.fecha) {
      return -1;
    } else if (b.fecha > a.fecha) {
      return 1;
    } else {
      return 0;
    }
  });
};
//Ordenar por fecha New added
const ordenarNotasPorAdd = () => {
  listaDeNotas.sort((a, b) => {
    if (b.fecha > a.fecha) {
      return -1;
    } else if (a.fecha > b.fecha) {
      return 1;
    } else {
      return 0;
    }
  });
};
