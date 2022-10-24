// Array vacio para pushear las notas
const listaDeNotas = JSON.parse(localStorage.getItem("listaDeNotas")) || [];
const notasEncontradas = [];
//QuerySelector
const body = document.getElementById("body");
const seccionPaneles = document.getElementById("seccionPaneles");
const panel = document.getElementById("panel");
const selector = document.getElementById("selector");
const busqueda = document.getElementById("busqueda");
const btnAgregar = document.getElementById("botonAgregar");
// Class Constructor de lista de notas
class ConstructorDeNotas {
  constructor(titulo, texto, fecha, idNota) {
    this.titulo = titulo;
    this.texto = texto;
    this.fecha = fecha;
    this.idNota = idNota;
  }
}
//Funcion  imprimir nota
const imprimirNotas = (array) => {
  array.forEach((nota) => {
    let notaScan = document.createElement("div");
    notaScan.setAttribute("class", "nota");
    notaScan.setAttribute("id", nota.idNota);
    let notaScanBtnDiv = document.createElement("div");
    notaScanBtnDiv.setAttribute("class", "btnDiv");
    let notaScanBtnX = document.createElement("button");
    notaScanBtnX.setAttribute("class","btnX");
    notaScanBtnX.innerHTML = "❌";
    let notaScanBtnEdit = document.createElement("button")
    notaScanBtnEdit.setAttribute("class","btnEdit");
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
  return array;
};
// Funcion Pasar Nueva nota a localStorage
const notaNuevaStorage = () => {
  let titulo = document.querySelector("#notaInputTitulo").value;
  let texto = document.querySelector("#notaInputTexto").value;
  let fecha = new Date();
  let idNota = listaDeNotas.length;
  let notaNueva = new ConstructorDeNotas(titulo, texto, fecha, idNota);
  listaDeNotas.push(notaNueva);
  localStorage.setItem("listaDeNotas", JSON.stringify(listaDeNotas));
  return listaDeNotas;
};
// Funcion Pasar notas Sin Imprimir
const notasSinImprimir = () => {
  if (panel.childElementCount === 1) {
    imprimirNotas(listaDeNotas);
  } else if (panel.childElementCount > 1) {
    let checkNota = panel.lastChild;    
    let checkNotaId = parseInt(checkNota.getAttribute("id")) + 1;
    if (checkNotaId < listaDeNotas.length ) {
      limpiarPanel();
      imprimirNotas(listaDeNotas);

/*       let listaSinImpr = listaDeNotas.splice(checkNotaId);
      limpiarPanel();
      let reListaDeNotas = listaDeNotas.concat(listaSinImpr);
      imprimirNotas(reListaDeNotas)
      console.log(reListaDeNotas); */
    }
  }
};
//Limpiar Panel
const limpiarPanel = () => {
  panel.removeChild(btnAgregar);
  panel.innerHTML = ``;
  panel.insertAdjacentElement("afterbegin", btnAgregar);
};
// Funcion Salir del Pop Nota Input
const salirPanelPop = () => {
  let notaNueva = document.getElementById("panelPop");
  notaNueva.remove();
};
//Boton Agregar y eventos
btnAgregar.onclick = () => {
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
  //Boton Salir
  let notaPopBotonSalir = document.querySelector(".botonSalir");
  notaPopBotonSalir.onclick = (e) => {
    salirPanelPop();
  };
  //Boton Guardar
  let notaPopBotonGuardar = document.querySelector(".botonGuardar");
  notaPopBotonGuardar.onclick = (e) => {
    notaNuevaStorage();
    notasSinImprimir();
    salirPanelPop();
  };
};
