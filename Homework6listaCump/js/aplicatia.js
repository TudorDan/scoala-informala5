function Item(description) {
	this.description = description;
	this.bought = false;
	this.buy = function() {
		this.bought = true;
	}
}

function ShoppingList() {
	this.items = [];
	this.addItem = function(description) {
		let exists = false;
		let itemError = document.querySelector('#itemError');
		for(let i = 0; i < this.items.length && !exists; i++) {
			if(this.items[i].description === description) {
				exists = true;
			}
		}
		if(!exists) {
			this.items.push( new Item(description) );
			itemError.innerHTML = '';
		} else {
			itemError.innerHTML = `Item <u>${description}</u> is already in the list!`;
		}
	}
	this.display = function() {
		let table = document.querySelector('tbody');
		table.innerHTML = '';

		if( this.items.length > 0 ) {
			let entireTable = document.querySelector('table');
			entireTable.style.display = 'block';
			for(let i = 0; i < this.items.length; i++) {
				let row = table.insertRow(i);
				row.insertCell(0).innerHTML = this.items[i].description;
				if( this.items[i].bought ) {
					row.cells[0].style.textDecoration = 'line-through';
				}
				row.insertCell(1).innerHTML = `<button id="buyButton">Mark as buyed</buton>`;
				row.cells[1].onclick = buy;
			}
		}
	}
	this.sortAsc = function() {
		for(let i = 0; i < this.items.length - 1; i++) {
			for(let j = i + 1; j < this.items.length; j++) {
				if(this.items[i].description > this.items[j].description) {
					[this.items[i], this.items[j]] = [this.items[j], this.items[i]];
				}
			}
		}
	}
	this.sortDesc = function() {
		for(let i = 0; i < this.items.length - 1; i++) {
			for(let j = i+1; j < this.items.length; j++) {
				if(this.items[i].description < this.items[j].description) {
					[this.items[i], this.items[j]] = [this.items[j], this.items[i]];
				}
			}
		}
	}
}

let sh = new ShoppingList();

function addItem(event) {
	event.preventDefault();
	let description = document.querySelector('[name="description"]');
	if( description.value ) {
		sh.addItem(description.value);
		sh.display();
		console.log(sh);
	}
}

function buy(elem) {
	let cell0 = elem.path[2].cells[0];
	cell0.style.textDecoration = 'line-through';
	for(let i = 0; i < sh.items.length; i++) {
		if(sh.items[i].description === cell0.innerHTML) {
			sh.items[i].bought = true;
		}
	}
}

function sortAsc() {
	sh.sortAsc();
	sh.display();
}

function sortDesc() {
	sh.sortDesc();
	sh.display();
}

function verifica(event) {
	if(event.keyCode !== 13) {
		let exists = false;
		let itemError = document.querySelector('#itemError');
		let elem = event.srcElement;
		for(let i = 0; i < sh.items.length && !exists; i++) {
			if(sh.items[i].description === elem.value) {
				exists = true;
			}
		}
		if(exists) {
			itemError.innerHTML = `Item <u>${elem.value}</u> is already in the list!`;
		} else {
			itemError.innerHTML = '';
		}
	}
}

document.querySelector('[name="description"]').addEventListener("keyup", verifica, false);