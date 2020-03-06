console.log("Console is Wokring!");

let form = document.querySelector("form");
let search = document.querySelector("#location");
let address = document.querySelector("#locationText");
let temperature = document.querySelector("#temperature");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let location = search.value;
    address.textContent = '';
    temperature.textContent = '';
    fetch("/weather?address=" + location).then( (response) => {
        response.json().then( (data) => {
            if( data && data.error ){
                temperature.textContent = data.error;
            }else if( data && data.forecast ){
                address.textContent = data.address;
                temperature.textContent = data.forecast;
            }            
        } )
    } )
})