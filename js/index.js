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


$.get('https://trivial-film-eoi.firebaseio.com/.json?print=pretty', function(data) {
  usuarios = data.usuarios;
  comprobarUsuario(usuarios);
  generarCategoriaRandom(data.preguntas)
});

limpiar();


function comprobarUsuario(users){
  nombresUsuarios = Object.keys(users);

  $('.btn').on("click", function(e){
      cat = $(this).attr('value');
      var coincide = 0;
      usuario = $('.jugador').val();
      if ( usuario === "" ){
        alert('Introduce un nombre')
      }
      else{
        long = nombresUsuarios.length
        for (var i = 0; i < long; i++){
          if (usuario === nombresUsuarios[i]){
              alert('Ese nombre se está usando. Introduce otro.')
              coincide = 1;
              break;
          }
        }//Fin FOR

        if (coincide == 1){
          limpiar();
        }
        else{
            setTimeout(move,1500)
        }//Fin ELSE
          
    }//Fin ELSE

  })//FIN fincion CLICK

}//FIN funcion comprobarUsuario


function limpiar(){
  $('.jugador').val('');
}

function numRandom (min, max) {
  return Math.trunc(Math.random() * (max - min) + min);
}//FIN funcion NUMRANDOM

function move(){
  url = './preguntas.html?'+cat+'?nombre='+usuario;
  window.location = url;
}


firebase.database().ref('preguntas/random').set([{"index" : 0.0,"respuestaCorrecta" : "respuestaCorrecta",
          "respuestasIncorrectas" : [ "respuesta1", "respuesta2", "respuesta3", "respuesta4" ],
          "titulo" : "Valor de la pregunta"}]
    );

function generarCategoriaRandom(preguntas){
  posicion = 0;

  categorias = Object.keys(preguntas);
  categorias.pop()

  for (var i = 0; i <= categorias.length; i++){
      listaPreguntas = preguntas[categorias[i]]
    
    for (var j = 0; j < 5; j++){
      posicion = posicion + 1;

      pregunta = listaPreguntas[numRandom(1,listaPreguntas.length)]

      firebase.database().ref().child('preguntas/random/'+posicion).set(pregunta)
    }
  
  }

}