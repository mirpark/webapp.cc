#!/usr/bin/env node

var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    mime = require("mime"),
    markdown = require( "markdown" ),
    port = process.env.C9_PORT || 8002;

http.createServer(function(request, response) {
	var uri = url.parse(request.url).pathname
		, filename = path.join(process.cwd(), uri)
		, ext = filename.substr(filename.lastIndexOf(".") + 1, filename.length);

	fs.exists(filename, function(exists) {
	if(!exists) {
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("404 Not Found\n");
		response.end();
		return;
	}

	if (fs.statSync(filename).isDirectory()) filename += '/index.html';
		fs.readFile(filename, "binary", function(err, file) {
			if(err) {        
				response.writeHead(500, {"Content-Type": "text/plain"});
				response.write(err + "\n");
				response.end();
				return;
			}
			var contentType = mime.lookup(filename) || "text/plain";
			if (ext == "md") {
				contentType = "text/html";
				file = markdown.markdown.toHTML(file);
			}
			
			response.writeHead(200, {"Content-Type": contentType});
			response.write(file, "binary");
			response.end();
		});
	});
}).listen(port, "0.0.0.0");

console.log("http://localhost:" + port);
