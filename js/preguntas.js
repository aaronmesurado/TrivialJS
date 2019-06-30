// Initialize Firebase
var config = {
    apiKey: "AIzaSyC_hCkuaECQSEdkmiFrO1Vklctb8EXfQsQ",
    authDomain: "trivial-film-eoi.firebaseapp.com",
    databaseURL: "https://trivial-film-eoi.firebaseio.com",
    projectId: "trivial-film-eoi",
    storageBucket: "trivial-film-eoi.appspot.com",
    messagingSenderId: "655951519588"
};
firebase.initializeApp(config);

//Funcion que coge el nombre del usuario y lo usa para mostrarlo en el header
//o almacenarlo en la base de datos
function nombreUsuario(){
    var cogerNombre = window.location.search.substr(1);
    var nombre = cogerNombre.split ("=");
    nombre = nombre[1];
    return nombre
}
$('#usuario').children('.fuente').text(' '+ nombreUsuario());


var categoria = window.location.search.substr(1);
var nombreCategoria = categoria.split ("?");
nombreCategoria = nombreCategoria[0]

var numeroPuntos = 0;
var numeroVidas = 3;

//Nos conectamos a la URL de la Base de Datos, obtenemos los datos y los pasamos a la
//funcion que genera las preguntas
$.get('https://trivial-film-eoi.firebaseio.com/preguntas/.json?print=pretty', function(data) {
    arrayPreguntas = data[nombreCategoria]
    arrayPreguntas.splice(0, 1);
    preguntas(arrayPreguntas);
});

//Genear un número aleatorio para coger una pregunta o las 2
//respuestas incorrectas
function numRandom (min, max) {
    return Math.trunc(Math.random() * (max - min) + min);
}//FIN funcion NUMRANDOM

//Obtiene un array con las preguntas y genera una de forma aleatoria
function preguntas(arrayPreguntas){

    var longitud = arrayPreguntas.length;
    var numero = numRandom(0, longitud)
    pregunta = arrayPreguntas[numero]
    var valorBotones = respuestas(pregunta)
    $('.preguntas').append('<div class="row caja-pregunta"> <div class="container-fluid"> <h3 id="titulo-pregunta">' +
        pregunta.titulo + '</h3> </div> </div>');

    //Mostramos las respuestas de forma aleatoria sin que se repitan
    var opciones = [];
    for (var i = 0; i < valorBotones.length; i ++){
        var respuesta = numRandom(0,3);
        while (respuesta === opciones[0] || respuesta === opciones[1]){
            respuesta = numRandom(0,3);
        }
        opciones.push(respuesta);
        $('#titulo-pregunta').after('<div class="row justify-content-center buttons">'+
            '<button type="button" class="btn btn-light boton">'+valorBotones[respuesta]+
            '</button></div>');

    }// FIN del FOR*/

    creadorPregunta = pregunta.usuario;

    if ( creadorPregunta != undefined){
        preguntaUsuario = $('.buttons').parent();
        $(preguntaUsuario).append('<p class="row justify-content-center preguntaUsuario">Pregunta creada por: '+
            pregunta.usuario+'</p>')
    }

    $('.boton').on("click", comprobar);

    arrayPreguntas.splice(numero, 1);

}//FIN funcion PREGUNTAS

//Obtiene la pregunta que se ha seleccionado y crea un array con las respuestas que se van a mostrar
function respuestas(pregunta){

    var arrayRespuestas = [];
    random1 = numRandom(0,4);
    random2 = numRandom(0,4);
    //Controla que las dos respuestas no sean iguales
    while (random1 === random2){
        random2 = numRandom(0,4);
    }
    arrayRespuestas.push(pregunta.respuestaCorrecta);
    arrayRespuestas.push(pregunta.respuestasIncorrectas[random1]);
    arrayRespuestas.push(pregunta.respuestasIncorrectas[random2]);
    return arrayRespuestas;

}//FIN funcion RESPUESTAS


//Elimina el contenedor de la pregunta y los botones de las respuestas
function borrar(){

    param = document.getElementsByClassName('caja-pregunta');
    if (!param){
        console.log('No existe el elemento')
    }
    else {
        padre = param[0].parentNode;
        $(padre).empty();
    }
    preguntas(arrayPreguntas);

}//FIN funcion borrar


//Comprueba que la respuesta seleccionada sea correcta o no
function comprobar(){

    valor = this.innerHTML;

    $(this).removeClass('btn-light')
    $('.boton').off('click');

    //Controla si la respuesta es correcta o no
    if (valor == pregunta.respuestaCorrecta){
        $(this).addClass('btn-success')
        puntos();
    }
    else {
        $(this).addClass('btn-danger');
        vidas();
    }

    //Quita vidas
    function vidas(){
        numeroVidas = numeroVidas - 1;
        $('#vidas').children('.fuente').text(' '+ numeroVidas);
        return numeroVidas;
    }

    //Suma puntos
    function puntos(){
        numeroPuntos = numeroPuntos + 10;
        $('#puntos').children('.fuente').text(' '+ numeroPuntos + ' pts');
        return numeroPuntos;
    }

    //Comprueba si quedan preguntas por hacer o no
    //y si el numero de vidas es superior a 0
    if (arrayPreguntas.length == 0 || numeroVidas == 0){

        anadirPuntos(numeroPuntos);
    }
    else{
        setTimeout(borrar,2000)
    }
    
    
}//FIN funcion COMPROBAR

function move(){
    var parametro = window.location.search.substr(1);
    var nombre = parametro.split ("=");
    nombre = nombre[1]

    url = './ranking.html?'+nombre;
    window.location = url;
}

function anadirPuntos(numeroPuntos){
    nombre = nombreUsuario();

    ref = numRandom(1,1000)
    dbUsuario = firebase.database().ref().child('usuarios/'+nombre)
    dbUsuario.set({"index":ref,"nombre":nombre,"puntos":numeroPuntos});  
    setTimeout(move,2000)
      
}