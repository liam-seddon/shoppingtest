var Client = require('node-rest-client').Client;
var http = require('http');
var count = "";
var endpoint = "http://team1ELB-153492086.us-east-1.elb.amazonaws.com/catalog?gender=all";
var json_responses;

exports.index = function(req, res) {

	var client = new Client();
	client.get(endpoint, function(data, response_raw) {
		if (response_raw) {

			if (data) {
				json_responses = {
					"data" : data
				};
			}

			res.render('index', {
				values : data
			});
		}

		else {
			console.log("returned false");
			//		res.render('/womenerr');
		}
	});
};
