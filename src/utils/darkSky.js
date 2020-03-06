const request = require("request");
const mapBox = require("./mapBox");
const darkSky = (location, callback) => {
    mapBox( location, (error, data) => {
        if( data ){
            console.log(data.urlWeather);
            
            request( { url: data.urlWeather, json:true }, (error, response) => {
                if( error ){
                    callback("There is a connection problem.", undefined);
                }else if( response && response.body && response.body.error ){
                    callback("The location not found.", undefined);
                }else{
                    let text = "The temperature of " + data.place_name + " is " + Math.round( response.body.currently.temperature ) + "°C and there is " + response.body.currently.precipProbability + "% chance of rain.";
                    callback(undefined, text);
                }
            });
        }else {
            callback(error, undefined)
        }
    } );
}

module.exports = darkSky;