var http = require("http"),
	port = process.argv[2] || 8888;

var verbPut = function(res, d) {
	response.writeHead(200);
	response.write('Hello', "binary");
	response.end();
};

var verbGet = function() {
	response.writeHead(200);
	response.write('Hello', "binary");
	response.end();
};

var verbDelete = function(res, d) {
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

var throwError = function(res, err) {
	res.writeHead(500);
	res.write(err, "binary");
	res.end();
}

http.createServer(function(request, response) {

	if (request.method == "PUT" || request.method == "DELETE") {
		var body = '';
		request.on('data', function (data) {
			body += data;
		});
	
		request.on('end', function () {
			var dict = parseQuery(body);
			if (!isValid(dict)) {
				throwError(response, 'Invalid params');
			} else {
				if (request.method == "PUT") verbPut(response, dict);
				if (request.method == "DELETE") verbDelete(response, dict);
			}
		});
	} else if (request.method == "GET") {
		console.log('GET request');
	} else {
		throwError(response, 'Invalid method');
	}



}).listen(parseInt(port, 10));

