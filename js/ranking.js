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


$.get('https://trivial-film-eoi.firebaseio.com/usuarios/.json?print=pretty', function(data) {
  ranking(data)
});



function ranking(dataBase){

	var usuarioJugando = window.location.search.substr(1);
	console.log(usuarioJugando)

	ranking = []

	nombres = Object.keys(dataBase)

	for (var i = 0; i < nombres.length; i++){
		usuario = nombres[i]
		ranking.push(dataBase[usuario])
	}
	
	ranking.sort(function(a, b){
    	return a.puntos - b.puntos
	})

	ranking = ranking.reverse()
	console.log(ranking)

	for (var i = 0; i < ranking.length; i++){
		if (ranking[i].nombre == usuarioJugando){
			posicion = i;
			break;
		}
		else{
			posicion = 'a';
		}

	}

	for (var i = 0; i < ranking.length; i++){
		if (posicion == i){
			$('.list-ranking').append("<li class='usuario jugador'>"+ranking[i].nombre+": "+ranking[i].puntos+" pts.</li>")
		}
		else {
			$('.list-ranking').append("<li class='usuario'>"+ranking[i].nombre+": "+ranking[i].puntos+" pts.</li>")	
		}
		
	}//Fin FOR

}//FIN funcion RANKING
