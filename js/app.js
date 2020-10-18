// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


// EventListeners
eventListeners();
function eventListeners (){

    // Cuando el usuario envía el tweet
    formulario.addEventListener('submit', agregarTweet);    

    // cuando el documento está listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets')) || [];

        console.log(tweets);

        crearHtml();
    });
}


function agregarTweet(e) {
    e.preventDefault() //Previene cualquier acción por defecto

    const tweet = document.querySelector('#tweet').value;

    if (tweet === '') {
        mostrarError('No puedes insertar un tweet vacío');
        return; //Detiene la ejecucion del código
    }

    // crea un objeto con la fecha actual en milisegundos y el contenido del tweet
    const tweetOBj = {
        id: Date.now(),
        tweet // es lo mismo que tweet: tweet
    }
    // añadir al arreglo de tweets
    tweets = [...tweets, tweetOBj];

    //despues de agregar, creamos el Html
    crearHtml();

    // Reiniciar el formulario
    formulario.reset();
}

// Mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Elimina la alerta
    setTimeout(() => {
        mensajeError.remove();    
    }, 3000);
}


function crearHtml() {

    limpiarHtml();

    if (tweets.length > 0) {
        tweets.forEach( tweet => {

            // Crear Elementoa
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            const li = document.createElement('li');
            li.innerText = tweet.tweet;
            
            // Dar funcionalidad al elemento
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }
            
            //Asignar elementos
            listaTweets.appendChild(li);
            li.appendChild(btnEliminar);

        });
    }

    sincronizarStorage();
}

// Agrega los tweets actuales a LocalStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function borrarTweet(id) {
    // se utiliza que sea distinto de id, ya wue filter debe crear un nuevo arreglo xon todos los tweets excepto el que estoy eliminando
    tweets = tweets.filter( tweet => tweet.id != id);

    crearHtml();
}

function limpiarHtml() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
    
}