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

$.get('https://trivial-film-eoi.firebaseio.com/preguntas/.json?print=pretty', function(data) {
	preguntasAnadidas = data
	anadirPreguntas(preguntasAnadidas)
});

function mayuscula(string){
	return string.charAt(0).toUpperCase() + string.slice(1)
}


function anadirPreguntas(preguntasAnadidas){

	categorias =Object.keys(preguntasAnadidas)
	categorias.pop()

	for(var i = 0; i < categorias.length; i++){
		$('#default').after("<option value="+categorias[i]+">"+mayuscula(categorias[i])+"</option>");
	}

	$('.enviar-pregunta').on("click", function(e){
		usuario = $('.usuario').val();
		titulo = $('.titulo').val();
		rc = $('.respuestaCorrecta').val();
		ri1 = $('.ri1').val();
		ri2 = $('.ri2').val();
		ri3 = $('.ri3').val();
		ri4 = $('.ri4').val();
		cat = $('.categoria').val()

		if ( usuario === "" || titulo === "" || rc === "" || ri1 === "" || ri2 === "" || ri3 === ""
				|| ri4 === "" || cat == "0"){
			var reiniciar = confirm('Faltan campos por rellenar. \n¿Reiniciar formulario?');
			if (reiniciar == true){
				limpiar();
			}
		}
		else{

			long = preguntasAnadidas[cat].length

			dbPregunta = firebase.database().ref().child('preguntas/'+cat+'/'+long)
			dbPregunta.set({"index":long,"usuario":usuario,"titulo":titulo,
		 	"respuestaCorrecta":rc,"respuestasIncorrectas":[ri1, ri2, ri3, ri4]});
		 	limpiar();
		 	alert('Formulario enviado correctamente');

			
		}

	})
}

function limpiar(){
	$('.usuario').val('');
	$('.titulo').val('');
	$('.respuestaCorrecta').val('');
	$('.ri1').val('');
	$('.ri2').val('');
	$('.ri3').val('');
	$('.ri4').val('');
	$('.categoria').val('0');
}