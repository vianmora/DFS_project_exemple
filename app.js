var http = require('http');
var fs = require('fs');

var monModule = require("./controler/module");
const port = 10421;

var express = require('express');

var app = express();
app.set('view engine', 'ejs')

app.use("/static", express.static(__dirname + '/static'));

app.get("/", (request, response) =>{
    response.render("index");
});

app.get("/contact", (request, response) =>{
    response.render("contact");
});

app.get('/profile/:name', (request, response) =>{
    response.render('profile', {personne:request.params.name});
});

app.get("/hello_world", (request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end("Hello world");
});

app.get("/bienvenue", (request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.end("<html><head><title>home</title></head><body><h1>sweet home</h1></body></html>");
});

app.get("/tuut", (request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');

    monModule.klaxon();
    console.log(monModule.reponse);

    response.end("regarde ta console");
});

app.get("/gutenberg", (request, response) => {
    response.writeHead(200,  {'Content-Type': 'text/html'});

    http.get("http://www.gutenberg.org/cache/epub/5781/pg5781.txt", (response_get) => {
        response_get.setEncoding('utf8');
        response_get.pipe(response)
    });
});

app.use(function (req, res, next) {
    res.status(404).render("404")
});

app.listen(port, 'localhost');
console.log(`Server running at localhost:${port}/`);