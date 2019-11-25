var http = require('http');
var fs = require('fs');

var monModule = require("./assets/module");

const port = 3000;

var server = http.createServer((request, response) =>{


    if (request.url === "/" || request.url === "/home") {
        response.writeHead(200,  {'Content-Type': 'text/html'});

        //file stream
        var readStream = fs.createReadStream(__dirname + "/assets/index.html", "utf8");
        readStream.pipe(response)
    }
    else if (request.url === "/hello_world") {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/plain');
        response.end("Hello world");

    }
    else if (request.url === "/bienvenue") {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html');
        response.end("<html><head><title>home</title></head><body><h1>sweet home</h1></body></html>");
    }

    else if (request.url === "/tuut") {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/plain');

        monModule.klaxon();
        console.log(monModule.reponse);

        response.end("regarde ta console");
    }

    else if (request.url === "/gutenberg"){
        response.writeHead(200,  {'Content-Type': 'text/html'});

        http.get("http://www.gutenberg.org/cache/epub/5781/pg5781.txt", (response_get) => {
            response_get.setEncoding('utf8');
            response_get.pipe(response)
        });
    }

    else {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/plain');
        response.end("erreur 404");
    }
})

server.listen(3000, 'localhost')
console.log(`Server running at localhost:${port}/`)