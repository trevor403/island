var http = require("http"),
	port = process.argv[2] || 8888;

var verbPut = function(data) {
	response.writeHead(200);
	response.write('Hello', "binary");
	response.end();
};

var verbGet = function() {
	response.writeHead(200);
	response.write('Hello', "binary");
	response.end();
};

var verbDelete = function(data) {
	response.writeHead(200);
	response.write('Hello', "binary");
	response.end();
};

var parseQuery = function(str) {
	var dictionary = {};
	var parts = str.split('&');
	for (var i in parts) {
		var pair = parts[i].split('=');
		dictionary[pair[0]] = pair[1];
	}
	return dictionary;
}

var isValid = function(dict) {
	return 'x' in dict && 'y' in dict;
}

http.createServer(function(request, response) {

	if (request.method == "PUT" || request.method == "DELETE") {
		var body = '';
		request.on('data', function (data) {
			body += data;
		});
	
		request.on('end', function () {
			console.log(body);
			var dict = parseQuery(body);
			console.log(dict);
		});
	} else if (request.method == "GET") {
		console.log('GET request');
	} else {
		//error
		response.writeHead(500);
		response.write('Hello', "binary");
		response.end();
	}



}).listen(parseInt(port, 10));
