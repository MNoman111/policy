const request = require("request");
const mapBox = (location, callback) => {
    let urlMap = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent( location ) + ".json?access_token=pk.eyJ1IjoibW5vbWFuMTExIiwiYSI6ImNrNzVrY2h4bzAyNTMzZHFyZWZtMXc2dGQifQ.l11XP46OPJOpMUmTt8lIKQ"
    request( { url: urlMap, json:true }, (error, response) => {
        if( error ){
            callback("There is a connection problem.", undefined);
        }else if( response && response.body && response.body.features.length === 0 ){
            callback("The location not found.", undefined);
        }else{
            let lat = response.body.features[ 0 ].center[ 1 ];
            let long = response.body.features[ 0 ].center[ 0 ];
            let urlWeather = "https://api.darksky.net/forecast/371f4fc5833da658e87b8f4eb1353612/" + lat + "," + long + "?units=si";
            let data = { 
                urlWeather,
                place_name: response.body.features[ 0 ].place_name
            }
            callback(undefined, data);
        }
    });
}

module.exports = mapBox;