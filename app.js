const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  homeRoute(req, res);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function homeRoute(req, res) {
	if(req.url === "/") {
		res.statusCode = 200;
	  	res.setHeader('Content-Type', 'text/plain');
	  	res.write("Header\n");
	  	res.write("Search\n");
	  	res.end("Footer\n");
	}
}