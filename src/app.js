const path = require("path")
const express = require("express");
const hbs = require("hbs")
const darkSky = require("./utils/darkSky")
const app = express()
const port = process.env.PORT || 3000;

// Define paths for express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views path
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static( publicPath ))

app.get( "", (req, res) => {
    res.render("index", {
        title: "Index",
        name: "Noman Naeem"
    })
} )

app.get( "/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Noman Naeem"
    })
} )

app.get( "/help", (req, res) => {
    res.render( "help", {
        title: "Help",
        name: "Noman Naeem"
    } )
} )

app.get( "/weather", (req, res) => {
    
    if(!req.query.address){
        return res.send({
            error: "No address provided."
        })
    }

    darkSky( req.query.address, (error, urlWeather) => {        
        if( error ){
            console.log(error);
            
            return res.send({
                error
            })
        }else{            
            res.send({
                location: "Karachi",
                address: req.query.address,
                forecast: urlWeather
            })
        }
    })
    console.log('hjk');
    
} )

app.get( "/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        error: "Help Article Not Found.",
        name: "Noman Naeem"
    })
})

app.get( "*", (req, res) => {
    res.render("404", {
        title: "404",
        error: "Page Not Found.",
        name: "Noman Naeem"
    })
})


app.listen( port, () => {
    console.log("The web server is running on port " + port)
} )