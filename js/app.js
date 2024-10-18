//Importa las claves de acceso a la api 
import config from "./config.js";

//Obtiene la fecha actual
let ts = Date.now();
//Obtiene las claves
const pubkey = config.MARVEL_PUBLIC_KEY;
const pvtkey = config.MARVEL_PRIVATE_KEY;
let hash = CryptoJS.MD5(ts + pvtkey + pubkey).toString();

//Cadena de consulta a la api
let call = `ts=${ts}&apikey=${pubkey}&hash=${hash}`;

//EndPoint de la api
let endpoint = `https://gateway.marvel.com/v1/public/characters?${call}`;

//Usando fetch 
//Realiza la solicitud a la api
fetch(endpoint)
  .then((response) => {//Si se cumple
    if (response.ok) {
      return response.json();//Se convierte la respuesta en un json
    } else {
      throw new Error("Error, la respuesta no es verdadera ");//Si la respuesta no es ok, devuelve un error
    }
  })
  .then((respuesta) => {
    //Obtiene un array de personajes
    let personajes = respuesta.data.results;

    //Iteramos sobre el array
    for (let i = 0; i < personajes.length; i++) {
        //Obtenemos el personaje actual
      let personaje = personajes[i];

      //Obtenemos la card donde iremos añadiendo los personajes
      let card = document.querySelector(".card");

      //Creamos un elemento img 
      let img = document.createElement("img");
      //Se le asigna una clase
      img.classList = "card-img-top";
      //Se le asocia el valor del src de la img
      img.src = `${personaje.thumbnail.path}.${personaje.thumbnail.extension}`;

      //Se crea un elemento parrafo
      let p = document.createElement("p");
      //Se le añade una clase
      p.classList = ".card-text";
      //Almacena el contenido del nombre del personaje
      p.textContent = personaje.name;

      //Se añaden como nodos hijos a la card
      card.appendChild(img);
      card.appendChild(p);
    }
  })
  //Manejar el error
  .catch((error) => {
    console.log(error);
  });
