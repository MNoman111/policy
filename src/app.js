const path = require("path")
const express = require("express");
const hbs = require("hbs")
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
} )

app.get( "/foodella/policy", (req, res) => {
    res.render("policy")
} )

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