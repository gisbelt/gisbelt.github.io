$(document).ready(function(){
	// Con jquery vamos a decir que el left que está en css en la clase ".slider-banner .banner img" vaya cambiando
	
	// Necesitamos una variable para acceder al div del banner (.banner)
	// Luego una variable para contar cuantos slide vamos a tener
	// Luego otra variable para saber en que posición se encuentra nuestro slider
	// Esas variables servirán para los dos slider que tenemos en la target

	// Vamos a hacer un objeto para el banner y el info
	var banner = {
		padre: $('#banner'),
		numeroSlide: $('#banner').children('.slide').length, //Accedemos a los hijos del banner que tienen la clase .slide, que serían las imagenes (esto para contarlos)
		posicion: 1 //Nuestro banner va a empezar en la posicion uno
	}
	var info = {
		padre: $('#info'),
		numeroSlide: $('#info').children('.slide').length, //Accedemos a los hijos del banner que tienen la clase .slide, que serían las imagenes (esto para contarlos)
		posicion: 1 //Nuestro banner va a empezar en la posicion uno
	}
	//console.log(banner.numeroSlide); //en la consola los contará

	/*****Centrado Verticalmente*****/
	var altoContenedor = function(){
		var altoVentana = $(window).height();
		if(altoVentana <= $('#contenedor').outerHeight() + 200){
			$('#contenedor').css({
				'height': ''
			});
		}else{
			$('#contenedor').css({
				'height': altoVentana + 'px'
			});
		}
	}
	altoContenedor();
	/*****Centrado Verticalmente*****/


	/* ----------------------------- */
	/* --------- BANNER ------------ */
	/* ----------------------------- */
	/*****Contando los slide del banner (img) Y calculando el alto*****/
	//Quiero que al primer hijo del banner que tenga la clase .slide le cambies el codigo css
	banner.padre.children('.slide').first().css({
		//La propiedad de left sea igual a cero (esto hará que la primera imagen se muestre en el banner)
		'left': 0 
	}); 

	//Luego Agregamos una funcion que se encargará de calcular cuánto va a medir el banner
	var altoBanner = function(){
		//Estamos calculando el alto que tiene cada slide y lo guardamos en la variable alto
		var alto = banner.padre.children('.slide').outerHeight(); 
		//cambiamos el css de la valiable padre (.banner) y le asignamo el height igual a algo mas pixeles
		banner.padre.css({
			'height': alto + 'px'
		});
		console.log(alto);
	};
	//Esta funcion como calculará el alto, será dinámica y por eso también será responsive
	//Esta función se ejecutará al inicio
	//Hay que llamar a la funcion para que ejecute el console.log(alto);, dará 300
	altoBanner(); 
	/*****Fin Contando los slide del banner (img) Y calculando el alto*****/


	/* ----------------------------- */
	/* ------- INFORMACION --------- */
	/* ----------------------------- */
	/*****Contando los slide del info (div), calculando el alto y botones span*****/
	//Quiero que al primer hijo del info que tenga la clase .slide le cambies el codigo css
	info.padre.children('.slide').first().css({
		//La propiedad de left sea igual a cero (esto hará que el primer div se muestre en la info)
		'left': 0 
	}); 

	//Luego Agregamos una funcion que se encargará de calcular cuánto va a medir el info
	var altoInfo = function(){
		//Estamos calculando el alto que tiene slide activo y lo guardamos en la variable alto
		var alto = info.padre.children('.active').outerHeight(); 
		//cambiamos el css de la valiable padre (.info) y le asignamo el height igual a algo mas pixeles
		info.padre.animate({
			'height': alto + 'px'
		});
		console.log(alto);
	};
	//Esta funcion como calculará el alto, será dinámica y por eso también será responsive
	//Esta función se ejecutará al inicio
	altoInfo();

	// Por cada elemento hijo que tenga la clase slide en info agrega la etiqueta span
	$('#info').children('.slide').each(function(){
		$('#botones').append('<span>');
	});
	// Al primero ponlo azulito, agregale la clase active
	$('#botones').children('span').first().addClass('active');
	/*****Fin Contando los slide del info (div), calculando el alto y botones span*****/

	//cuando la vamos adaptando a responsive, quedará un espacio extra que será de 150px que ejecutó o calculó en la función anterior
	//Entonces tenemos que ejecutar la funcion cada que cambiemos de tamaño nuestra ventana
	//Esta funcion se ejecutará solo cuando haya algún cambio en la ventana
	$(window).resize(function(){
		altoBanner();
		altoInfo();
		altoContenedor();
	});



	/* ----------------------------- */
	/* --------- BANNER ------------ */
	/* ----------------------------- */
	/*****Flechas banner: Cuando cliquees, que cambie la imagen*****/
	// Botón siguiente
	$('#banner-next').on('click', function(e){ //El parámetro e es para que no se agregue el simbolo # en el navegador
		e.preventDefault();

		if(banner.posicion < banner.numeroSlide){
			//Vamos a asegurar de que todos los slide empiecen desde la derecha
			//Los que no tengan la clase active, ponlos otra vez en left: 100%;
			banner.padre.children().not('.active').css({
				'left': '100%'
			});

			// Primero queremos accerder al que tenga la clase active, cuando el usuario de click en la flecha, 
			// Quitamos la clase active y se la ponemos al siguiente elemento. Y lo animamos
			// Y el siguiente elemento al que se le agregó la clase active se desplace de derecha a izquierda
			$('#banner .active').removeClass('active').next().addClass('active').animate({
				'left': '0'
			});
			// Una vez que le agregamos la clase active al siguiente elemento, Animamos al slide anterior para que se desplace hacia la izquierda
			$('#banner .active').prev().animate({
				'left': '-100%'
			});
			banner.posicion = banner.posicion + 1;

		} else {
			//Hacemos que el slide activo (es decir el ultimo), se anime hacia la izquierda
			//La ultima img desplazala a la izquierda (Al se 4 = 4 se ejecuta el "sino")
			$('#banner .active').animate({
				'left': '-100%'
			});
			//Los que no tengan la clase active, y los posicionamos a la derecha (ponlos otra vez en left: 100%;)
			banner.padre.children().not('.active').css({
				'left': '100%'
			});

			//Como la posicion 4 que es la ultima img no es menor a banner.numeroSlide para que se muestre de nuevo la primera imagen ejecutamos esto
			//Eliminamos la clase active y se la ponemos al primer elemento
			//Y accede a los elementos hijos de banner y al primero agregale la clase active
			$('#banner .active').removeClass('active'); //Remueve la clase al ultimo o el que la tenga
			banner.padre.children('.slide').first().addClass('active').animate({
				'left': '0'
			});
			//Reiniciamos la posición para que se cumpla la condicional nuevamente 
			banner.posicion = 1; 
		}
	});
	//Botón Anterior
	$('#banner-prev').on('click', function(e){ //El parámetro e es para que no se agregue el simbolo # en el navegador
		e.preventDefault();

		//Si nos encontramos en la posicion 2, 3 o 4
		if(banner.posicion > 1){
			//Vamos a asegurar de que todos los slide empiecen desde la izquierda
			//Los que no tengan la clase active, ponlos otra vez en left: -100%;
			banner.padre.children().not('.active').css({
				'left': '-100%'
			});
			//Anímalo a la derecha
			$('#banner .active').animate({
				'left': '100%'
			});

			// Primero queremos accerder al que tenga la clase active, cuando el usuario de click en la flecha, 
			// la clase active que tenga se la quitamos y la pongamos en el anterior elemento
			// Y el anterior elemento al que se le agregó la clase active se desplace de izquierda a derecha left: 0
			$('#banner .active').removeClass('active').prev().addClass('active').animate({
				'left': '0'
			});
			// Una vez que le agregamos la clase active al anterior, al siguiente desplazalo a la derecha
			$('#banner .active').next().animate({
				'left': '100%'
			});
			// Cuando le damos a la siguiente, la posicion es de dos, pero cuando le damos al anterior
			// La posicion tiene que regresar a uno
			banner.posicion = banner.posicion - 1;

		} else {
			//Al elemento activo (que es el primero) animalo a la derecha  
			$('#banner .active').animate({
				'left': '100%'
			});
			//los que no tengas la clase active, empiecen a la izquierda
			//Los que no tengan la clase active, ponlos otra vez en left: -100%;
			banner.padre.children().not('.active').css({
				'left': '-100%'
			});
			//Cuando estemos en la posicion 1 (que en este caso sería la primera) queremos que la clase active
			//Se la pongas al último elemento, 			
			$('#banner .active').removeClass('active'); //Remueve la clase 
			//Y accede a los elementos hijos de banner y al último agregale la clase active
			banner.padre.children('.slide').last().addClass('active').animate({
				'left': '0'
			}); 
			//Reiniciamos la posicion al numero de slide que tengamos, para que se cumpla la condicion
			banner.posicion = banner.numeroSlide; 
		}
	});
	/*****Fin Flechas banner: Cuando cliquees, que cambie la imagen*****/



	/* ----------------------------- */
	/* --------- INFORMACION ------- */
	/* ----------------------------- */
	/*****Flechas info: Cuando cliquees, que cambie el texto*****/
	// Botón siguiente
	$('#info-next').on('click', function(e){ //El parámetro e es para que no se agregue el simbolo # en el navegador
		e.preventDefault();

		if(info.posicion < info.numeroSlide){
			//Vamos a asegurar de que todos los slide empiecen desde la derecha
			//Los que no tengan la clase active, ponlos otra vez en left: 100%;
			info.padre.children().not('.active').css({
				'left': '100%'
			});

			// Primero queremos accerder al que tenga la clase active, cuando el usuario de click en la flecha, 
			// Quitamos la clase active y se la ponemos al siguiente elemento. Y lo animamos
			// Y el siguiente elemento al que se le agregó la clase active se desplace de derecha a izquierda
			$('#info .active').removeClass('active').next().addClass('active').animate({
				'left': '0'
			});
			// Una vez que le agregamos la clase active al siguiente elemento, Animamos al slide anterior para que se desplace hacia la izquierda
			$('#info .active').prev().animate({
				'left': '-100%'
			});

			//Al dar a siguiente, agregale la clase active al siguiennte boton con la clase active
			$('#botones').children('.active').removeClass('active').next().addClass('active');

			info.posicion = info.posicion + 1;

		} else {
			//Hacemos que el slide activo (es decir el ultimo), se anime hacia la izquierda
			//El ultimo div desplazalo a la izquierda (Al se 4 = 4 se ejecuta el "sino")
			$('#info .active').animate({
				'left': '-100%'
			});
			//Los que no tengan la clase active, y los posicionamos a la derecha (ponlos otra vez en left: 100%;)
			info.padre.children().not('.active').css({
				'left': '100%'
			});

			//Como la posicion 4 que es lel ultimo div no es menor a info.numeroSlide para que se muestre de nuevo el primer div ejecutamos esto
			//Eliminamos la clase active y se la ponemos al primer elemento
			//Y accede a los elementos hijos de info y al primero agregale la clase active
			$('#info .active').removeClass('active'); //Remueve la clase al ultimo o el que la tenga
			info.padre.children('.slide').first().addClass('active').animate({
				'left': '0'
			});

			//Remueve la clase active y agregala al primer span de los botones
			$('#botones').children('.active').removeClass('active');
			$('#botones').children('span').first().addClass('active');

			//Reiniciamos la posición para que se cumpla la condicional nuevamente 
			info.posicion = 1; 
		}
		altoInfo(); //Para que calcule el alto al hacer click
	});

	//Botón Anterior
	$('#info-prev').on('click', function(e){ //El parámetro e es para que no se agregue el simbolo # en el navegador
		e.preventDefault();

		//Si nos encontramos en la posicion 2, 3 o 4
		if(info.posicion > 1){
			//Vamos a asegurar de que todos los slide empiecen desde la izquierda
			//Los que no tengan la clase active, ponlos otra vez en left: -100%;
			info.padre.children().not('.active').css({
				'left': '-100%'
			});
			//Anímalo a la derecha
			$('#info .active').animate({
				'left': '100%'
			});

			// Primero queremos accerder al que tenga la clase active, cuando el usuario de click en la flecha, 
			// la clase active que tenga se la quitamos y la pongamos en el anterior elemento
			// Y el anterior elemento al que se le agregó la clase active se desplace de izquierda a derecha left: 0
			$('#info .active').removeClass('active').prev().addClass('active').animate({
				'left': '0'
			});
			// Una vez que le agregamos la clase active al anterior, al siguiente desplazalo a la derecha
			$('#info .active').next().animate({
				'left': '100%'
			});

			//Al dar a anterior, agregale la clase active al anterior boton con la clase active
			$('#botones').children('.active').removeClass('active').prev().addClass('active');

			// Cuando le damos a la siguiente, la posicion es de dos, pero cuando le damos al anterior
			// La posicion tiene que regresar a uno
			info.posicion = info.posicion - 1;

		} else {
			//Al elemento activo (que es el primero) animalo a la derecha  
			$('#info .active').animate({
				'left': '100%'
			});
			//los que no tengas la clase active, empiecen a la izquierda
			//Los que no tengan la clase active, ponlos otra vez en left: -100%;
			info.padre.children().not('.active').css({
				'left': '-100%'
			});
			//Cuando estemos en la posicion 1 (que en este caso sería la primera) queremos que la clase active
			//Se la pongas al último elemento, 			
			$('#info .active').removeClass('active'); //Remueve la clase 
			//Y accede a los elementos hijos de info y al último agregale la clase active
			info.padre.children('.slide').last().addClass('active').animate({
				'left': '0'
			}); 

			//Remueve la clase active y agregala al ultimo span de los botones
			$('#botones').children('.active').removeClass('active');
			$('#botones').children('span').last().addClass('active');

			//Reiniciamos la posicion al numero de slide que tengamos, para que se cumpla la condicion
			info.posicion = info.numeroSlide; 
		}
		altoInfo(); //Para que calcule el alto al hacer click
	});
	/*****Fin Flechas info: Cuando cliquees, que cambie el texto*****/

});