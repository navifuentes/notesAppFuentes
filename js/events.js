btnAgregar.onclick = () => {
  panelPopFunct(true);
};
btnPopX.onclick = () => {
  panelPopFunct(false);
  limpiarPanelPop();
};
btnPopSave.onclick = () => {
  let nota = new Nota(
    inputTitulo.value,
    inputTexto.value,
    new Date(),
    listaStorage.length + 1
  );
  nota.push(listaStorage);
  nota.push(lista);
  nota.imprimir(panel);
  listaStorage.storage("listaStorage");
  parsearLista();
  panelPopFunct(false);
  limpiarPanelPop();
  eventsNotaOpt();
};
let btnPanel1 = document.getElementById("btnPanel1");
let btnPanel2 = document.getElementById("btnPanel2");

btnPanel1.onclick = () => {
  openPanel(1);
  btnPanel2.style.borderColor = "indianred";
  btnPanel1.style.borderColor = "firebrick";
  btnPanel1.style.backgroundColor = "#ad922e";
  btnPanel2.style.backgroundColor = "#fdd649";

  animarGrid(panel);
};
btnPanel2.onclick = () => {
  openPanel(2);
  btnPanel1.style.borderColor = "indianred";
  btnPanel2.style.borderColor = "firebrick";
  btnPanel2.style.backgroundColor = "#ad922e";
  btnPanel1.style.backgroundColor = "#fdd649";
  animarGrid(panel2);
};
const eventsNotaOpt = () => {
  btnEdit = document.querySelectorAll(".btnEdit");
  btnEliminar = document.querySelectorAll(".btnX");

  btnEliminar.forEach((element) => {
    element.onclick = (e) => {
      getDomNotaId(e.target);
      eliminar();
      panelGrid = document.getElementById("panel2Grid");
      panelGrid.innerHTML = "";
      listaEliminados.printArray(panel2);
      panelGrid = document.getElementById("panelGrid");
      panelGrid.insertAdjacentElement("afterbegin", btnAgregar);
    };
  });

  btnEdit.forEach((element) => {
    element.onclick = (e) => {
      console.log(e.target);
      panelPopFunct(true);
      switchToEdit(true);
      getDomNotaId(e.target);
      btnSaveEdit = document.querySelector(".botonEditar");
      contador = new Array(...panelGrid.children);
      notaDivIndex = contador.indexOf(notaDiv);
      nota = new Nota(
        lista[notaDivIndex - 1].titulo,
        lista[notaDivIndex - 1].texto,
        lista[notaDivIndex - 1].fecha,
        lista[notaDivIndex - 1].idNota
      );
      nota.scan();
    };
  });
};

selector.onchange = (e) => {
  checkPanel();
  if (panelFocusId == "panel") {
    eventSort(lista);
    lista.searchTxt(busqueda.value);
    limpiarPanel(true);
    notasEncontradas.printArray(panel);
    eventsNotaOpt();
  } else {
    eventSort(listaEliminados);
    listaEliminados.searchTxt(busqueda.value);
    limpiarPanel(false);
    listaEliminados.printArray(panel2);
    eventsNotaOpt();
  }
};

busqueda.oninput = (e) => {
  e.preventDefault();
  console.log(busqueda.value);
  checkPanel();
  if (panelFocusId == "panel") {
    eventSort(lista);
    lista.searchTxt(busqueda.value);
    limpiarPanel(true);
    notasEncontradas.printArray(panel);
    eventsNotaOpt();
  } else {
    eventSort(listaEliminados);
    listaEliminados.searchTxt(busqueda.value);
    limpiarPanel(false);
    notasEncontradas.printArray(panel2);
    eventsNotaOpt();
  }
};

//API CLIMA
const getClima = async () => {
  try {
    let response = await fetch(
      `https:api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&units=metric&lang=es&appid=2faad048b71379a1114e608f97d87f93`
    );
    let result = await response.json();
    let cityName = result.name;
    let tipoClima = result.weather[0].description;
    let temperatura = Math.floor(result.main.feels_like);
    console.log(cityName);
    console.log(tipoClima);
    console.log(temperatura);
    console.log(result)
    climaApp.innerHTML = `${cityName}, ${temperatura}°C - ${tipoClima}`;
  } catch (error) {
    console.log(error);
  }
};
//GEO LOCATION
const getCoords = (position) => {
  const cord = position.coords;
  latitud = cord.latitude;
  longitud = cord.longitude;
  getClima();
};
const getLocation = () => {
  navigator.geolocation.getCurrentPosition(getCoords);
};

getLocation();