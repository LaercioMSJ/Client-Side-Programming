(function(){

	fetch('http://api.tvmaze.com/shows/431?embed[]=episodes&embed[]=cast')
    .then(function(response){
        return response.json();
    })
    .then(function(json){

        var seasons = json._embedded.episodes.reduce((season, ep) => {
            season[ep.season] = season[ep.season] + 1 || 1;
            return season;
        }, {});

        var array = Object.keys(seasons).map(item => seasons[item]);

        array.unshift("Episode Count");

        var chart = c3.generate({
            bindto: '#chart',
            size: {
                height: 500,
                width: 500
            },
            data: {
                columns: [array],
                type: 'bar'
            },
            bar: {
                width: {
                    ratio: 0.5
                }
            },
            axis: {
                x: {
                    type: 'category',
                    categories: Object.keys(seasons).map(item => item)
                }
            }
        });

        console.log(seasons);

    })
})();