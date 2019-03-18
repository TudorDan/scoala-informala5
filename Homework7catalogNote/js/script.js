/**
Creăm clasa „Elev” cu o propietate de nume, un vector de note, o proprietate medie (care se actualizează in funcția adaugaNota()) și metodele: adaugaNota() (care introduce note în vectorul de note și actualizează media cu 2 zecimale, fără rotunjire), deseneazaElev() (ce actualizează tabelul cu note), sortAscNotele() și sortDescNotele(), care se ocupă de sortările notelor.
*/
function Elev(nume) {
    this.nume = nume;
    this.note = [];
    this.medie = '';
    this.adaugaNota = function(nota) {
        this.note.push(nota);
        let suma = 0;
        for(let i=0; i<this.note.length; i++) {
            suma += Number(this.note[i]);
        }
        this.medie = (Math.trunc(suma*100 / this.note.length) / 100).toFixed(2);
    }
    this.deseneazaElev = function() {
        let corpTabelNote = document.querySelector('#tabel_wrapper_elev>table>tbody');
        corpTabelNote.innerHTML = '';
        let faraNote = document.querySelector('#tabel_wrapper_elev>p');
        if(this.note.length > 0) {
            let tabelNote = document.querySelector('#tabel_wrapper_elev>table');
            tabelNote.style.display = 'table';
            faraNote.style.display = 'none';
            for(let i = 0; i < this.note.length; i++) {
                let rand = corpTabelNote.insertRow(i);
                rand.insertCell(0).innerHTML = this.note[i];
            }
        }
    }
    this.sortAscNotele = function() {
        return this.note.sort((a,b) => a - b);
    }
    this.sortDescNotele = function() {
        return this.note.sort((a,b) => b - a);
    }
}

/**
 Cream clasa „Catalog”, cu un vector de elevi și metodele: adaugaElev() (ce adaugă câte un elev în vectorul de elevi), deseneazaCatalog() (ce actualizează tabelul cu elevi și mediile lor), sortAscMediile() și sortDescMediile(), care se ocupă de sortările meiilor.
 */
function Catalog() {
    this.elevi = [];
    this.adaugaElev = function(numeElev) {
        let exista = false;
        for(let i = 0; i < this.elevi.length && !exista; i++) {
            if(this.elevi[i].nume === numeElev) {
                exista = true;
            }
        }
        if(!exista) {
            this.elevi.push(new Elev(numeElev));
        }
    }
    this.deseneazaCatalog = function() {
        let corpTabelCatalog = document.querySelector('#tabel_wrapper>table>tbody');
        corpTabelCatalog.innerHTML = '';
        let faraElevi = document.querySelector('#tabel_wrapper>p');
        if(this.elevi.length > 0) {
            let tabelCatalog = document.querySelector('#tabel_wrapper>table');
            tabelCatalog.style.display = 'table';
            faraElevi.style.display = 'none';
            for(let i = 0; i < this.elevi.length; i++) {
                let rand = corpTabelCatalog.insertRow(i);
                rand.insertCell(0).innerHTML = this.elevi[i].nume;
                rand.insertCell(1).innerHTML = this.elevi[i].medie;
                rand.insertCell(2).innerHTML = `<button class="butoaneAdaugaAscunde">Vezi notele</button>`;
                rand.cells[2].onclick = veziNoteElev.bind(i);
            }
        }
    }
    this.sortAscMediile = function() {
        return this.elevi.sort((a,b) => a.medie - b.medie);
    }
    this.sortDescMediile = function() {
        return this.elevi.sort((a,b) => b.medie - a.medie);
    }
}

//Facem obiectul „catalogElevi”, o instanțiere a clasei „Catalog”.
let catalogElevi = new Catalog();
let indiceElevAfisat = -1;

function adaugaElev() {
    event.preventDefault();
    let numeElev = document.querySelector('[name="elev"]');
    if(numeElev.value) {
        catalogElevi.adaugaElev(numeElev.value);
        numeElev.value = '';
        catalogElevi.deseneazaCatalog();
    }
}

function veziNoteElev() {
    let noteElev = document.querySelector('#note_elev_wrapper');
    noteElev.style.display = 'block';
    let numeElev = document.querySelector('#note_elev_wrapper>h2');
    indiceElevAfisat = this;
    numeElev.innerHTML = `Note elev: ${catalogElevi.elevi[this].nume}`;
    catalogElevi.elevi[this].deseneazaElev();
    let notaElev = document.querySelector('[name="nota"]');
    notaElev.value = '';
}

function ascundeNoteElev() {
    let noteElev = document.querySelector('#note_elev_wrapper');
    noteElev.style.display = 'none';
}

function adaugaNota() {
    event.preventDefault();
    let notaElev = document.querySelector('[name="nota"]');
    if(notaElev.value) {
        catalogElevi.elevi[indiceElevAfisat].adaugaNota(notaElev.value);
        notaElev.value = '';
        catalogElevi.elevi[indiceElevAfisat].deseneazaElev();
        let rows = document.querySelectorAll('#tabel_wrapper>table>tbody>tr');
        rows[indiceElevAfisat].cells[1].innerHTML = catalogElevi.elevi[indiceElevAfisat].medie;
        //console.log(catalogElevi.elevi[indiceElevAfisat].medie);
    }
}

function sortAscNote() {
    catalogElevi.elevi[indiceElevAfisat].sortAscNotele();
    catalogElevi.elevi[indiceElevAfisat].deseneazaElev();
}
function sortDescNote() {
    catalogElevi.elevi[indiceElevAfisat].sortDescNotele();
    catalogElevi.elevi[indiceElevAfisat].deseneazaElev();
}

function sortAscMedii() {
    catalogElevi.sortAscMediile();
    catalogElevi.deseneazaCatalog();
}

function sortDescMedii() {
    catalogElevi.sortDescMediile();
    catalogElevi.deseneazaCatalog();
}