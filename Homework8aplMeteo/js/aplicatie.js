function afiseazaVremea() {
    event.preventDefault();
    let input = document.querySelector('[name="oras"]');
    let oras = input.value;
    let alertaEroare = document.querySelector('#eroareOras');
    alertaEroare.innerHTML = '';
    //input.value = '';
    if(oras) {
        let url = `https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=${oras}`;
        fetch(url)
            .then(response => {
                if(response.ok) {
                    return response;
                }
                throw Error(response.statusText);
            })
            .then(response => response.json())
            .then(info => {
                let mapurl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAeQnIPlbJ_WzMeqTyG0fm_0qaquBWxsk4
                &q=${oras}`;
                document.querySelector('#hartaGoogleMaps>iframe').src = mapurl;
                document.querySelector('#hartaGoogleMaps').style.display = 'block';
                document.querySelector("#iconita").src = `https://openweathermap.org/img/w/${info.weather[0].icon}.png`;
                document.querySelector("#descriere").innerHTML = `Descriere: ${info.weather[0].description}`;
                document.querySelector("#umiditate").innerHTML = `Umiditate: ${info.main.humidity}`;
                document.querySelector("#presiune").innerHTML = `Presiune: ${info.main.pressure}`;
                document.querySelector("#temp").innerHTML = `Temperatura curentă: ${info.main.temp}`;
                document.querySelector("#min").innerHTML = `Minima zilei: ${info.main.temp_min}`;
                document.querySelector("#max").innerHTML = `Maxima zilei: ${info.main.temp_max}`;
                //stergere tabel anterior
                let tabel = document.querySelector('#vremeaUrmZile>table');
                tabel.innerHTML = `<thead>
                                        <tr></tr>
                                    </thead>
                                    <tbody></tbody>`;
            })
            .catch(error => {
                //document.querySelector('[name="oras"]').value = error;
                alertaEroare.innerHTML = `Localitatea <u>${oras}</u> nu a fost găsită! Verificați diacriticele și punctuația!`;
                console.log('There was an error: ', error)
            });
    }
}
function afiseazaPrognoza() {
    event.preventDefault();
    let input = document.querySelector('[name="oras"]');
    let oras = input.value;
    let alertaEroare = document.querySelector('#eroareOras');
    alertaEroare.innerHTML = '';
    afiseazaVremea();
    if(oras) {
        let url = `https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=${oras}`;
        fetch(url)
            .then(response => {
                if(response.ok) {
                    return response;
                }
                throw Error(response.statusText);
            })
            .then(response => response.json())
            .then(info => {
                //stergere tabel anterior
                let tabel = document.querySelector('#vremeaUrmZile>table');
                tabel.innerHTML = `<thead>
                                        <tr></tr>
                                    </thead>
                                    <tbody></tbody>`;

                //extragere date si afisare antet
                let antet = document.querySelector('#vremeaUrmZile>table>thead>tr');
                let corp = document.querySelector('#vremeaUrmZile>table>tbody');
                let date = [];
                let ore = [];
                for(p in info.list) {
                    let d = info.list[p].dt_txt.split(' ');
                    if(!date.includes(d[0])) {
                        date.push(d[0]);
                        antet.innerHTML += `<th>${d[0]}</th>`;
                    }
                    if(!ore.includes(d[1])) {
                        ore.push(d[1]);
                    }
                }
                date.sort();
                ore.sort();

                //construire tabel vid
                for(i in ore) {
                    let linie = '<tr>';
                    for(j in date) {
                        linie += '<td></td>';
                    }
                    linie += '</tr>'
                    corp.innerHTML += linie;
                }

                //completare tabel
                let linii = document.querySelectorAll('#vremeaUrmZile>table>tbody tr');
                for(p in info.list) {
                    let d = info.list[p].dt_txt.split(' ');
                    let nrLin = ore.indexOf(d[1]);
                    let nrCol = date.indexOf(d[0]);
                    linii[nrLin].cells[nrCol].innerHTML = `
                        <img src="https://openweathermap.org/img/w/${info.list[p].weather[0].icon}.png" /><br />
                        Ora: ${d[1].substring(0, 5)}<br />
                        Temperatura: ${info.list[p].main.temp}<br />
                        Descriere: ${info.list[p].weather[0].description}
                    `;
                    if(nrCol % 2 === 0) {
                        for(let i = 0; i < ore.length; i++) {
                            linii[i].cells[nrCol].style.backgroundColor = '#B5C1C4';
                        }
                    }
                }
                //console.log(linii);

                /*
                antet = data = list[i].dt_txt 1
                cell =
                    icon = list[i].weather[0].icon,
                    ora = list[i].dt_txt 2,
                    tem = list[i].main.temp,
                    desc = list[i].weather[0].description
                */
            })
            .catch(error => {
                alertaEroare.innerHTML = `Localitatea <u>${oras}</u> nu a fost găsită! Verificați diacriticele și punctuația!`;
                console.log('There was an error: ', error)
            });
    }
}