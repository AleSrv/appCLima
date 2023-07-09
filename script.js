// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}

let urlBase = "https://api.openweathermap.org/data/2.5/weather";
let urlIcono = "https://openweathermap.org/img/wn/";
let api_key = "605507acf87117e111e54a3ab5238541";
let difKelvin = 273.15;

document.getElementById("botonBusqueda").addEventListener("click", () => {
  const citiName = document.getElementById("ciudadEntrada").value;
  if (citiName) {
    fectchDatosClima(citiName);
  }
});

function fectchDatosClima(cityName) {
  fetch(`${urlBase}?q=${cityName}&appid=${api_key}`)
    .then((data) => data.json())
    .then((data) => mostrarDatosClima(data));
}

function mostrarDatosClima(data) {
  const divDatosClima = document.getElementById("datosClima");
  divDatosClima.innerHTML = "";

  const ciudadNombre = data.name;
  const paisNombre = data.sys.country;
  const temperatura = data.main.temp - difKelvin;
  const humedad = data.main.humidity;
  const descripcion = data.weather[0].description;
  const icono = data.weather[0].icon;

  //CREAMOS LOS ELEMENTOS DEL HTML (NO LOS INGRESAMOS AUN)

  const ciudadTitulo = document.createElement("h2");
  ciudadTitulo.textContent = `${ciudadNombre}, ${paisNombre}`;

  const temperaturaInfo = document.createElement("p");
  temperaturaInfo.textContent = `La temperatura es: ${Math.floor(
    temperatura
  )}°C`;

  const humedadInfo = document.createElement("p");
  humedadInfo.textContent = `La humedad es: ${humedad}%`;

  const iconoInfo = document.createElement("img");
  iconoInfo.src = `${urlIcono}${icono}@2x.png`;

  const descripcionInfo = document.createElement("p");
  descripcionInfo.textContent = `La descripción meteorológica es: ${descripcion}`;

  divDatosClima.appendChild(ciudadTitulo);
  divDatosClima.appendChild(temperaturaInfo);
  divDatosClima.appendChild(iconoInfo);
  divDatosClima.appendChild(humedadInfo);
  divDatosClima.appendChild(descripcionInfo);
}
