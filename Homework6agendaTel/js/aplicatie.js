function adaugaContact(event) {
	event.preventDefault();
	let nume = document.querySelector('[name="nume"]');
	let telefon = document.querySelector('[name="telefon"]');

	if(nume.value && telefon.value) {
		// Find table body in table
		let table = document.querySelector('tbody');

		let nrLinie = -1;
		let linii = document.querySelectorAll('tr');
		for(let i = 0; i < linii.length; i++) {
			if (linii[i].cells[0].innerHTML === nume.value) {
				nrLinie = i;
			}
		}

		if(nrLinie === -1) { //nume nou
			// Create an empty <tr> element and add it to the 1st position of the table:
			let row = table.insertRow(0);

			// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
			row.insertCell(0).innerHTML = nume.value;
			row.insertCell(1).innerHTML = telefon.value;

			let cellModifica = row.insertCell(2);
			cellModifica.innerHTML = 'Modifica'.link('#');
			cellModifica.onclick = modifica;

			let cellSterge = row.insertCell(3);
			cellSterge.innerHTML = 'Sterge'.link('#');
			cellSterge.onclick = sterge;
		} else {
			linii[nrLinie].cells[1].innerHTML = telefon.value;
		}
	}
}
function verificaNume(nume, event) {
	if(event.keyCode !== 13) {
		// Find table body in table
		let table = document.querySelector('tbody');

		let nrLinie = -1;
		let linii = document.querySelectorAll('tr');
		for(let i = 0; i < linii.length; i++) {
			if(linii[i].cells[0].innerHTML === nume.value) {
				nrLinie = i;
			}
		}

		if(nrLinie !== -1) {  //nume deja existent
			let eroareNume = document.querySelector('#eroareNume');
			eroareNume.innerHTML = `Există deja numele: ${nume.value}<br />`;
		} else {
			eroareNume.innerHTML = '';
		}
	}
}
function verificaTelefon(telefon, event) {
	if(event.keyCode !== 13) {
		// Find table body in table
		let table = document.querySelector('tbody');

		let nrLinie = -1;
		let linii = document.querySelectorAll('tr');
		for(let i = 0; i < linii.length; i++) {
			if(linii[i].cells[1].innerHTML === telefon.value) {
				nrLinie = i;
			}
		}

		if(nrLinie !== -1) {  //telefon deja existent
			let eroareTelefon = document.querySelector('#eroareTelefon');
			eroareTelefon.innerHTML = `Există deja numarul: ${telefon.value}<br />`;
		} else {
			eroareTelefon.innerHTML = '';
		}
	}
}

function modifica(elem) {
	let nume = document.querySelector('[name="nume"]');
	let telefon = document.querySelector('[name="telefon"]');
	console.log(elem);
	let cells = elem.path[2].cells;
	nume.value = cells[0].innerHTML;
	telefon.value = cells[1].innerHTML;
}

function sterge(elem) {
	let linie = elem.path[2];
	linie.parentNode.removeChild(linie);
}