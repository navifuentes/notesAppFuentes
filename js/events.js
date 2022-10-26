//    EVENTOS*********
// Evento BtnAgregar & NotaInput
btnAgregar.onclick = () => {
  crearPanelPop();
  //Boton Salir
  let notaPopBotonSalir = document.querySelector(".botonSalir");
  notaPopBotonSalir.onclick = (e) => {
    salirPanelPop();
  };
  //Boton Guardar
  let notaPopBotonGuardar = document.querySelector(".botonGuardar");
  notaPopBotonGuardar.onclick = (e) => {
    notaNuevaStorage();
    limpiarPanel();
    imprimirNotas(listaDeNotas);
    salirPanelPop();
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
  sortLista();
  console.log(busqueda.value);
  limpiarPanel();
  imprimirNotas(notasEncontradas);
};

