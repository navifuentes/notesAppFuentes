//    EVENTOS*********
// Evento BtnAgregar & NotaInput
btnAgregar.onclick = () => {
  setPanelPop();
  //Boton Guardar
  let notaPopBotonGuardar = document.querySelector(".botonGuardar");
  notaPopBotonGuardar.onclick = (e) => {
    nuevaNotaInput();
    limpiarPanel();
    lista.imprimir(listaEliminados);
    panelPop.remove();
  };
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
//Eventos Sort
selector.onchange = (e) => {
  sortLista();
  limpiarPanel();
  imprimirNotas(notasEncontradas);
};
//Evento Busqueda
busqueda.oninput = (e) => {
  sortLista(busqueda.value);
  console.log(busqueda.value);
  limpiarPanel();
  imprimirNotas(notasEncontradas);
};
