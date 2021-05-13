(function(){
    function startApp() {

        fetch('https://www.swapi.tech/api/films')
        .then(function(response){
            return response.json();
        })
        .then(function(json){

            var starWarsMoviesStats = {};

            json.result.map(movie => {  
                temp = {};
                
                temp.characters = movie.properties.characters.length;
                temp.planets = movie.properties.planets.length;
                temp.starships = movie.properties.starships.length;
                temp.vehicles = movie.properties.vehicles.length;
                temp.species = movie.properties.species.length;

                starWarsMoviesStats[movie.properties.title] = temp;
            });

            var chart = c3.generate({
                bindto: '#chart',
                data: {
                    columns: [],
                    onclick: function () { 

                        document.getElementById("chart").innerHTML = '';

                        var table = document.createElement("TABLE");
                        table.setAttribute("id", "theTable");
                        document.getElementById("chart").appendChild(table);

                        buildTable(arguments[0]);
                        
                    },
                    type: 'bar'
                },
                axis: {
                    x: {
                        type: 'category',
                        categories: Object.keys(starWarsMoviesStats).map(movie => movie)
                    }
                },
                bar: {
                    width: {
                        ratio: 0.5
                    }
                }
            });


            Object.keys(starWarsMoviesStats[Object.keys(starWarsMoviesStats)[0]]).map(stats => {
                let temp = Object.keys(starWarsMoviesStats).map(movie => starWarsMoviesStats[movie][stats]);
                temp.unshift(stats);

                chart.load({
                    columns: [temp]
                });
            });


            function buildTable(arg) {
                document.getElementById("title").innerHTML = arg.id.charAt(0).toUpperCase() + arg.id.slice(1) + ' Stats';
                var mainProps;

                switch(arg.id) {
                    case "characters":
                        mainProps = ["name", "hair_color", "eye_color", "skin_color", "gender", "birth_year", "height", "mass"];
                        buildTableHeader(mainProps);

                        json.result[arg.index].properties[arg.id].map(character => 
                            buildTableBody(character, "people", mainProps))

                        break;

                    case "planets":
                        mainProps = ["name", "population", "terrain", "climate", "gravity", "orbital_period", "rotation_period", "diameter"];
                        buildTableHeader(mainProps);

                        json.result[arg.index].properties[arg.id].map(planet => 
                            buildTableBody(planet, "planets", mainProps))

                        break;
                    
                    case "starships":
                        mainProps = ["name", "model", "starship_class", "manufacturer", "crew", "passengers", "length", "max_atmosphering_speed", "hyperdrive_rating", "MGLT", "cargo_capacity", "consumables", "cost_in_credits"];
                        buildTableHeader(mainProps);

                        json.result[arg.index].properties[arg.id].map(starship => 
                            buildTableBody(starship, "starships", mainProps))

                        break;
                
                    case "vehicles":
                        mainProps = ["name", "model", "vehicle_class", "manufacturer", "crew", "passengers", "length", "max_atmosphering_speed", "cargo_capacity", "consumables", "cost_in_credits"]
                        buildTableHeader(mainProps);
                        
                        json.result[arg.index].properties[arg.id].map(vehicle => 
                            buildTableBody(vehicle, "vehicles", mainProps))

                        break;
                
                    case "species":
                        mainProps = ["name", "designation", "language", "hair_colors", "eye_colors", "skin_colors", "average_height", "average_lifespan", "classification"]
                        buildTableHeader(mainProps);
                        
                        json.result[arg.index].properties[arg.id].map(specie => 
                            buildTableBody(specie, "species", mainProps))

                        break;

                    default:
                        console.log("switch is not working");
                } 
            }


            function buildTableHeader(header) {
                let row = document.createElement("TR");

                for (let i = 0; i < header.length; i++) {
                    let cell = document.createElement("TH");
                    cell.innerHTML = (header[i].charAt(0).toUpperCase() + header[i].slice(1)).replace(/_/g, " ");
                    row.appendChild(cell);
                }

                let cell = document.createElement("TH");
                cell.innerHTML = "Link"
                row.appendChild(cell);
                document.getElementById("theTable").appendChild(row);
            }


            function buildTableBody(data, type, prop) {
                fetch(data)
                .then(function(response){
                    return response.json();
                })
                .then(function(json){
                    let row = document.createElement("TR");

                    for (let i = 0; i < prop.length; i++) {
                        let cell = document.createElement("TD");
                        cell.innerHTML = json.result.properties[prop[i]]
                        row.appendChild(cell);
                    }


                    let button = document.createElement("BUTTON");
                    button.textContent = type == "people" ? type.charAt(0).toUpperCase() + type.slice(1) + " Stats" : type.charAt(0).toUpperCase() + type.slice(1, -1) + " Stats";
                    button.addEventListener("click", function(){
                        buildCharts(json.result, type, prop[6], prop[7])
                    });

                    let cell = document.createElement("TD");
                    cell.appendChild(button);
                    row.appendChild(cell);
                    document.getElementById("theTable").appendChild(row);
                })
            }


            function buildCharts(item, thing, firstProp, secondProp) {
                fetch('https://www.swapi.tech/api/' + thing + '?page=1&limit=100')
                .then(function(response){
                    return response.json();
                })
                .then(function(json){
                    document.getElementById("chart").innerHTML = '';
                    document.getElementById("title").innerHTML = item.properties.name + ' Stats';

                    let pieArray = [[item.properties.name, "1"],["Other " + thing + " in the Star Wars universe", json.total_records -1]];
                    buildPieChart(pieArray);

                    let mainFirstProp = [item.properties.name];
                    let mainSecondProp = [item.properties.name];
                    let axisLabel = [];
                    let otherFirstProp = [];
                    let otherSecondProp = [];
                    let j = 0;

                    json.results.filter(it => it.uid != item.uid).map(it => {

                        mainFirstProp.push(isNaN(item.properties[firstProp]) ? 0 : parseInt(item.properties[firstProp]));
                        mainSecondProp.push(isNaN(item.properties[secondProp]) ? 0 : parseInt(item.properties[secondProp]));

                        fetch(it.url)
                        .then(function(response){
                            return response.json();
                        })
                        .then(function(json2){
                            axisLabel.push(json2.result.properties.name);
                            for (let k = 0; k < json.total_records - 1; k++) {
                                if (j == 0) {
                                    otherFirstProp.push(["Other "+thing, isNaN(json2.result.properties[firstProp]) ? 0 : parseInt(json2.result.properties[firstProp])]);
                                    otherSecondProp.push(["Other "+thing, isNaN(json2.result.properties[secondProp]) ? 0 : parseInt(json2.result.properties[secondProp])]);
                                }
                                else if (k >= j) {
                                    otherFirstProp[k].push(isNaN(json2.result.properties[firstProp]) ? 0 : parseInt(json2.result.properties[firstProp]));
                                    otherSecondProp[k].push(isNaN(json2.result.properties[secondProp]) ? 0 : parseInt(json2.result.properties[secondProp]));
                                } else {
                                    otherFirstProp[k].push(0);
                                    otherSecondProp[k].push(0);
                                }
                            }
                            j += 1;
                        })
                    });
                    let time = (200 * json.total_records) + 6000;
                    timeout1 = setTimeout(function () {
                        document.getElementById("title").innerHTML = mainFirstProp[0] + " " + firstProp.replace(/_/g, " ") + " compared to others";
                        buildBarChart(axisLabel, mainFirstProp, otherFirstProp);
                    }, 5000);
                    timeout2 = setTimeout(function () {
                        document.getElementById("title").innerHTML = mainSecondProp[0] + " " + secondProp.replace(/_/g, " ") + " compared to others";
                        buildBarChart(axisLabel, mainSecondProp, otherSecondProp);
                    }, time);
                })
            }


            function buildPieChart(array) {
                var chart = c3.generate({
                    bindto: '#chart',
                    size: {
                        height: 500,
                        width: 500
                    },
                    data: {
                        columns: array,
                        type : 'pie'
                    },
                    pie: {
                        label: {
                            format: function(value) {
                                return value;
                            }
                        }
                    }
                });
            }


            function buildBarChart(axisLabel, lineArray, barsArray) {
                var chart = c3.generate({
                    bindto: '#chart',
                    size: {
                        height: 700,
                    },
                    data: {
                        columns: [lineArray],
                        type: 'bar',
                        types: {[lineArray[0]] : 'spline'},
                    },
                    padding: {
                        bottom: 120
                    },
                    axis: {
                        x: {
                            type: 'category',
                            categories: axisLabel.map(label => label)
                        }
                    },
                    bar: {
                        width: {
                            ratio: 0.5
                        }
                    }
                });
                let delay = 0;
                barsArray.map(bar => {
                    setTimeout(function () {
                        chart.load({
                            columns: [bar]
                        });
                    }, delay);
                    delay += 180;
                });
            }
        })
    }

    var timeout1;
    var timeout2;

    let btn = document.createElement("BUTTON");
    btn.textContent = "Restart";
    btn.addEventListener("click", function(){
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        startApp();
        document.getElementById("title").innerHTML = "Star Wars Stats";
    });
    document.body.insertBefore(btn, document.body.firstChild);

    startApp();
})();