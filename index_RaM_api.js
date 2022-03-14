const tableNode = document.getElementById('table');
const maxNumNode = document.getElementById('maxNum');
const minNumNode = document.getElementById('minNum');

const url_api = 'https://rickandmortyapi.com/api/character';

function fetchData(url_api) {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.open('GET', url_api, true);
        xhttp.onreadystatechange = function (event) {
            if(xhttp.readyState === 4) {
                (xhttp.status === 200)
                    ?resolve(JSON.parse(xhttp.responseText))
                    :reject(new Error('Ups! Error en: ' + url_api));
            }
        }
        xhttp.send();
    });
}

const request = () => {
    let speciesArray = [];
    let speciesArrayFiltered = [];
    let valueMaxNum = Number(maxNumNode.value);
    let valueMinNum = Number(minNumNode.value);
    if(valueMaxNum <= 20 && valueMinNum > 0 ) {
        fetchData(url_api)
            .then(response => {
                console.log('Respuesta petición: ', response);

                const arrayAcotado = response.results.slice(valueMinNum - 1, valueMaxNum);
                console.log('Array acotado: ', arrayAcotado);

                arrayAcotado.forEach(item => {

                    const id = document.createElement('p');
                    id.textContent = item.id;

                    const name = document.createElement('p');
                    name.textContent = item.name;

                    const imagen = document.createElement('img');
                    imagen.src = item.image;

                    const specie = document.createElement('p');
                    specie.textContent = item.species;

                    tableNode.append(id,name,imagen,specie);

                    speciesArray.push(specie.textContent);
                    console.log('Especies: ', speciesArray);
                });

                speciesArrayFiltered = filterSpecies(speciesArray);
                console.log('Array de especies filtrados: ', speciesArrayFiltered);

                graficData(speciesArrayFiltered);
            })
            .catch(err => console.error(err));
    }
}

const filterSpecies = (speciesArray) => {
    const speciesFiltered = speciesArray.reduce((objeto, item) => {
        if(!objeto[item]) {
            objeto[item] = 1;
        } else {
            objeto[item] ++;
        }
        return objeto;
    }, {});
    return speciesFiltered;
}


const graficData = (speciesArrayFiltered) => {

    const entries = Object.entries(speciesArrayFiltered);
    console.log ('Los entries son:', entries);

    const labels = entries.map(item => item[0]);
    console.log ('Los labels son:', labels);

    const values = entries.map(item => item[1]);
    console.log ('Los values son:', values);

    /*Grafica de barras
    const data = {
        labels: labels,
        datasets: [{
            label: 'Grafica de especies',
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(255, 205, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(201, 203, 207, 0.5)'],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
                ],
            borderWidth: 1,
            data: values,
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {}
    };*/

    const data = {
        labels: labels,
        datasets: [{
            label: 'Grafica de especies',
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(255, 205, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(201, 203, 207, 0.5)'],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
                ],
            data: values,
        }]
    };

    const config = {
        type: 'pie',
        data: data,
    };

    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}
