//    EVENTOS*****
// Evento BtnAgregar & Notanput
btnAgregar.onclick = () => {
  setPanelPop();
  let notaPopBotonGuardar = document.querySelector(".botonGuardar");
  notaPopBotonGuardar.onclick = (e) => {
    nuevaNotaInput();
    parsearLista();
    parsearEliminados();
    limpiarPanel();
    lista.imprimir(listaEliminados);
    panelPop.remove();
  };
};
selector.onchange = (e) => {
  sortLista();
  buscarTexto(busqueda.value);
  limpiarPanel();
  lista.imprimir(notasEncontradas);
};

busqueda.oninput = (e) => {
  e.preventDefault();
  console.log(busqueda.value);
  sortLista();
  buscarTexto(busqueda.value);
  limpiarPanel();
  lista.imprimir(notasEncontradas);
};
// Evento Eliminar nota
const btnXArray = () => {
  btnXLista = document.querySelectorAll(".btnX");
  btnXLista.forEach((element) => {
    element.onclick = (e) => {
      btnXLista = document.querySelectorAll(".btnX");
      //stringify
      parsearSession(element);
      console.log(notaStorage);
      eliminar();
      actualizarLista();
    };
  });
  return listaDeNotas;
};
