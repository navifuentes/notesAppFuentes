//funciones Sort**
//Ordenar por nombre
const ordenarNotasAlfabeticamente = () =>
  listaDeNotas.sort((a, b) => {
    if (a.titulo.toLowerCase() < b.titulo.toLowerCase()) {
      return -1;
    } else if (a.titulo.toLowerCase() > b.titulo.toLowerCase()) {
      return 1;
    } else {
      return 0;
    }
  });
//Ordenar por Fecha
const ordenarNotasPorFecha = () =>
  listaDeNotas.sort((a, b) => {
    if (a.fecha > b.fecha) {
      return -1;
    } else if (b.fecha > a.fecha) {
      return 1;
    } else {
      return 0;
    }
  });

//Eventos Sort
selector.onchange = (e) => {
  let sort = selector.selectedIndex;
  if (sort === 0) {
    limpiarPanel();
    ordenarNotasPorFecha();
    buscarTexto(busqueda.value);
  } else if (sort === 2) {
    limpiarPanel();
    ordenarNotasAlfabeticamente();
    imprimirNotas(listaDeNotas);
    buscarTexto(busqueda.value);
  }
};

//Evento Busqueda
busqueda.oninput = (e) => {
  buscarTexto(busqueda.value);
  console.log(busqueda.value);
};
//funcion para buscar una string en las notas
//pasa todo a LowerCase
function buscarTexto(txt) {
  notasEncontradas.length = 0;
  if (selector.selectedIndex === 0) {
    ordenarNotasPorFecha();
  } else if (selector.selectedIndex === 2) {
    ordenarNotasAlfabeticamente();
  }
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
  limpiarPanel();
  imprimirNotas(notasEncontradas);
}
