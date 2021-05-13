(function(){

	fetch('http://api.tvmaze.com/shows/431?embed[]=episodes&embed[]=cast')
    .then(function(response){
        return response.json();
    })
    .then(function(json){

        var timeSerie = json._embedded.episodes.reduce((years, ep) => {
            if (years.length == 0) {
                years = [];
            }
            if (years.indexOf(ep.airdate.substr(0, 4)) == -1) {
                years.push(ep.airdate.substr(0, 4));
            }
            return years;
        }, []);
        

        var episodesByYear = {};

        timeSerie.map(year => episodesByYear[year] = json._embedded.episodes.reduce((obj, ep) => {
            if (typeof obj[year] === "undefined") {
                obj[year] = 0;
            }
            if (year == ep.airdate.substr(0, 4)) {
                obj[year] = obj[year] + 1;
            }
            return obj
        }, {}));


        var runtime = {};
        var total = 0;

        timeSerie.map(year => runtime[year] = json._embedded.episodes.reduce((obj, ep) => {
            if (typeof obj[year] === "undefined") {
                obj[year] = 0;
            }
            if (year == ep.airdate.substr(0, 4)) {
                total += ep.runtime
                obj[year] = total;
            }
            return obj
        }, {}));


        timeSerie = timeSerie.map(year => year+"-00-00");
        timeSerie.unshift("x");


        var episodes = ["episodes"];
        Object.keys(episodesByYear).map(ep => episodes.push(Object.values(episodesByYear[ep])));

        var totalRuntime = ["total_runtime"];
        Object.keys(runtime).map(time => totalRuntime.push(Object.values(runtime[time])));

        var chart = c3.generate({
            bindto: '#chart',
            data: {
                x: 'x',
                columns: [
                    timeSerie,
                    episodes,
                    totalRuntime
                ],
                types: {
                    episodes: 'bar',
                    total_runtime: 'area-spline'
                },
                axes: {
                    episodes: 'y',
                    total_runtime: 'y2'
                }
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%Y'
                    }
                },
                y2: {
                    show: true
                }
            }
        });

    })
})();