const tableNode = document.getElementById('table');
const maxNumNode = document.getElementById('maxNum');
const minNumNode = document.getElementById('minNum');

const url_api = 'https://pokeapi.co/api/v2/pokemon';

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

const request = async () => {
    const urlArray = [];
    let typesArray = [];
    let typesArrayFiltered = [];
    let valueMaxNum = Number(maxNumNode.value);
    let valueMinNum = Number(minNumNode.value);
    let diference = valueMaxNum - valueMinNum;
    if(valueMaxNum > 0 && valueMinNum > 0 ) {

        try {
            const response = await fetchData(`${url_api}?limit=${diference+1}&offset=${valueMinNum-1}`);
            console.log('Respuesta principal: ', response);

            response.results.forEach(item => {
                urlArray.push(item.url);
            });
            console.log('Arrays de urls: ', urlArray);
        }
        catch (error) {
            console.error(error);
        }

        try {
            for(let i = 0; i < urlArray.length; i++) {

                const response1 =  await fetchData(urlArray[i]);
                console.log('Respuesta pokemon: ', response1);

                const id = document.createElement('p');
                id.textContent = response1.id;

                const name = document.createElement('p');
                name.textContent = response1.name.charAt(0).toUpperCase() + response1.name.slice(1);

                const imagen = document.createElement('img');
                imagen.src = `${response1.sprites.front_default}`;

                const tipo = document.createElement('p');
                tipo.textContent = response1.types[0].type.name.charAt(0).toUpperCase() + response1.types[0].type.name.slice(1);

                tableNode.append(id,name,imagen,tipo);

                typesArray.push(tipo.textContent);
                console.log('Tipo: ', typesArray);
            }

            typesArrayFiltered = filterTypes(typesArray);
            console.log('Array de tipos filtrados: ', typesArrayFiltered);

            graficData(typesArrayFiltered);
        }
        catch (error) {
            console.error(error);
        }
    }
}

const filterTypes = (typesArray) => {
    const typesFiltered = typesArray.reduce((objeto, item) => {
        if(!objeto[item]) {
            objeto[item] = 1;
        } else {
            objeto[item] ++;
        }
        return objeto;
    }, {});
    return typesFiltered;
}


const graficData = (typesArrayFiltered) => {

    const entries = Object.entries(typesArrayFiltered);
    console.log ('Los entries son:', entries);

    const labels = entries.map(item => item[0]);
    console.log ('Los labels son:', labels);

    const values = entries.map(item => item[1]);
    console.log ('Los values son:', values);

    //Grafica de barras
    /*const data = {
        labels: labels,
        datasets: [{
            label: 'Grafica de especies',
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'],
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
                'rgba(255, 99, 132, 0.7)',
                'rgba(255, 159, 64, 0.7)',
                'rgba(255, 205, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(201, 203, 207, 0.7)'],
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
