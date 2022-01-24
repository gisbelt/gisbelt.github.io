(function(){

	// Esta función se va a ejecutar cada segundo y se va a encagar de mostrar 
	// en pantalla la hora actual
	var actualizarHora = function() {

// ********************************************************************************************************

		// Estas variables solo nos trae la información, no las muestra en pantalla
		var fecha = new Date(),
			horas = fecha.getHours(),
			ampm,
			minutos = fecha.getMinutes(),
			segundos = fecha.getSeconds(),
			weekday = fecha.getDay(),
			day = fecha.getDate(),
			month = fecha.getMonth(),
			year = fecha.getFullYear();

		// Para mostrar en pantalla tenemos que acceder a cada uno de los párrafos
		var pHoras = document.getElementById("horas"),
			pAMPM = document.getElementById("ampm"),
			pMinutos = document.getElementById("minutos"),
			pSegundos = document.getElementById("segundos"),
			pWeekday = document.getElementById("weekday"),
			pDay = document.getElementById("day"),
			pMonth = document.getElementById("month"),
			pYear = document.getElementById("year");


// ********************************************************************************************************

		// Fecha
		// Agregamos un arreglo que será igual a los días de la semana
		var semana = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']; 
		// Mostramos el día de la semana en pantalla con textContent (accedemos al párrafo)
		// el weekday (está arriba en las primeras variables) nos traerá un número. Si es domingo = 0, lunes = 1, etc
		// Pero ya le estamos especificando que día tendrá cada número con la variable "semana"
		pWeekday.textContent = semana[weekday];

		pDay.textContent = day;

		var months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']; 
		pMonth.textContent = months[month];

		pYear.textContent = year;


// ********************************************************************************************************

		// Reloj
		// Hacemos un condicional para que sea de 12horas 
		// Obviamente si pasan de las 12, ya es de tarde (ampm = 'PM';)
		if (horas >= 12){
			horas = horas - 12;
			ampm = 'PM';
		} else {
			ampm = 'AM';
		}
		// Cuando sean las 0 horas, la ponga a las 12am
		if (horas == 0){
			horas = 12;
		}

		// Mostramos
		pHoras.textContent = horas;
		pAMPM.textContent = ampm;
		// La varible minuntos/segundos solo tiene almacenado un número
		// En vez de que diga "1" que diga "01"
		if (minutos < 10) {minutos = "0" + minutos};
		if (segundos < 10) {segundos = "0" + segundos};
		pMinutos.textContent = minutos;
		pSegundos.textContent = segundos;



	};

	// La llamamos para que se ejecute automáticamente
	actualizarHora();
	// Que la función actualzarHora se actualice cada segundo (1000)
	var intervalos = setInterval(actualizarHora, 1000);


}())