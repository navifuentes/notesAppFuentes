//Array vacio - Lista de notas***************************************************
let lista = JSON.parse(localStorage.getItem("Lista")) || [];
let listaEliminados =
  JSON.parse(localStorage.getItem(`Lista Eliminados`)) || [];
let btnXDivCont;
let btnXLista = document.querySelectorAll(".btnX") || [];
let notasEncontradas = [];
//Querys*************************************************************************
const selector = document.getElementById("selector");
const busqueda = document.getElementById("busqueda");
const panel = document.getElementById("panel");
const btnAgregar = document.getElementById("botonAgregar");
//Constructor Obj Nota y sus metodos ******************************************
function Nota(titulo, texto, fecha, idNota) {
  this.titulo = titulo;
  this.texto = texto;
  this.fecha = fecha;
  this.idNota = parseInt(idNota);
}
Nota.prototype.push = function (array) {
  return array.push(this);
};
//Funciones Heredar****************************************************************
//Funcion  imprimir en panel nota desde Array
Array.prototype.imprimir = function (array) {
  limpiarPanel();
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
  botonesSetDom();
  return array;
};
//Funciones sort
Array.prototype.newFirst = function (array) {
  array.sort((a, b) => {
    if (a.fecha > b.fecha) {
      return -1;
    } else if (b.fecha > a.fecha) {
      return 1;
    } else {
      return 0;
    }
  });
};
Array.prototype.oldFirst = function (array) {
  array.sort((a, b) => {
    if (b.fecha > a.fecha) {
      return -1;
    } else if (a.fecha > b.fecha) {
      return 1;
    } else {
      return 0;
    }
  });
};
Array.prototype.aToZ = function (array) {
  array.sort((a, b) => {
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
};
//funcion eliminar DOM Console Storage *******************************************
const botonesSetDom = () => {
  0;
  //funcion settear evento en botones
  btnXLista = document.querySelectorAll(".btnX");
  btnEditLista = document.querySelectorAll(".btnEdit");
  btnXLista.forEach((element) => {
    //Boton X
    element.onclick = (e) => {
      parent = element.parentElement;
      notaDiv = parent.parentElement;
      eliminar(notaDiv);
    };
  });
  btnEditLista.forEach((element) => {
    //boton Edit
    element.onclick = (e) => {
      parent = element.parentElement;
      notaDiv = parent.parentElement;
      //Crear panel Pop y setear boton X
      setPanelPop();
      //Boton Guardar
      let notaPopBotonGuardar = document.querySelector(".botonGuardar");
      notaPopBotonGuardar.onclick = (e) => {
        editarNota();
        limpiarPanel();
        lista.imprimir(listaEliminados);
        panelPop.remove();
      };
      //

      //
    };
  });
};

const eliminar = (notaDiv) => {
  //remueve DOM ,
  notaDiv.remove();
  listaEliminados = listaEliminados.filter(
    (nota) => parseInt(notaDiv.id) !== nota.idNota
  );
  parsearEliminados();
  return listaEliminados;
};
//funciones guardar la lista en Storage y parsear ********************************
const parsearLista = () => {
  localStorage.setItem(`Lista`, JSON.stringify(lista));
  lista = JSON.parse(localStorage.getItem("Lista"));
  return lista;
};
const parsearEliminados = () => {
  localStorage.setItem(`Lista Eliminados`, JSON.stringify(listaEliminados));
  listaEliminados = JSON.parse(localStorage.getItem(`Lista Eliminados`));
  return listaEliminados;
};
//funciones paneles **************************************************************
const limpiarPanel = () => {
  panel.removeChild(btnAgregar);
  panel.innerHTML = ``;
  panel.insertAdjacentElement("afterbegin", btnAgregar);
};
const crearPanelPop = () => {
  let notaInput = document.createElement("section");
  notaInput.setAttribute("id", "panelPop");
  let panelPop = document.getElementById("panelPop");
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
const setPanelPop = () => {
  crearPanelPop();
  //Boton Salir
  let notaPopBotonSalir = document.querySelector(".botonSalir");
  notaPopBotonSalir.onclick = (e) => {
    panelPop.remove();
  };
};
const nuevaNotaInput = () => {
  //Funcion crea nuevo Objeto Nota y pushea al array Lista
  let titulo = document.querySelector("#notaInputTitulo").value;
  let texto = document.querySelector("#notaInputTexto").value;
  let fecha = new Date();
  let idNota = lista.length + 1;
  let nota = new Nota(titulo, texto, fecha, idNota);
  nota.push(lista);
  nota.push(listaEliminados);
};
function editarNota() {
  let esteTituli = document.getElementById("notaInputTitulo");
  let esteTexto = document.getElementById("notaInputTexto");
  let newLista = listaEliminados.filter((nota) => notaDiv.id == nota.idNota);
  newLista[0].titulo = esteTituli.value;
  newLista[0].texto = esteTexto.value;
}
//Funciones Evento Sort   ********************************************************
const sortLista = () => {
  //funcion seleccion sort
  if (selector.selectedIndex === 0) {
    lista.oldFirst(listaEliminados);
    return listaEliminados;
  } else if (selector.selectedIndex === 1) {
    lista.newFirst(listaEliminados);
    return listaEliminados;
  } else if (selector.selectedIndex === 2) {
    lista.aToZ(listaEliminados);
    return listaEliminados;
  }
};
//Funcion buscar todo en lowCase
function buscarTexto(txt) {
  //funcion para buscar una string en las notas / pasa todo a LowerCase
  notasEncontradas.length = 0;
  listaEliminados.forEach((nota) => {
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
  return notasEncontradas;
}
