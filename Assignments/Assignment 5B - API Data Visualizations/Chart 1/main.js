(function(){

	fetch('http://api.tvmaze.com/shows/431?embed[]=episodes&embed[]=cast')
    .then(function(response){
        return response.json();
    })
    .then(function(json){

        var guntherEpisodes = json._embedded.episodes.filter(ep => ep.summary.indexOf("Gunther") != -1).length;

        var nonGuntherEpisodes = json._embedded.episodes.filter(ep => ep.summary.indexOf("Gunther") == -1).length;

        var chart = c3.generate({
            bindto: '#chart',
            size: {
                height: 500,
                width: 500
            },
            data: {
                columns: [
                    ['Gunther Episodes', guntherEpisodes],
                    ['Non-Gunther Episodes', nonGuntherEpisodes]
                ],
                type : 'pie'
            }
        });

    })
})();