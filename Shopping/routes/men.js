var json_responses;
var Client = require('node-rest-client').Client;
var http = require('http');
var count = "";
var endpoint = "http://team1ELB-153492086.us-east-1.elb.amazonaws.com/catalog?gender=men";

var client = new Client();
client.get(endpoint, function(data, response_raw) {
	if (response_raw) {

		if (data) {
			json_responses = {
				"data" : data
			};
		}
	}

	else {
		console.log("returned false");
	}
});

exports.allMen = function(req, res) {

	var output = [];

	for (i in json_responses.data) {
			output.push(json_responses.data[i]);
	}

	res.render("men", {
		values : output,
		show : "Men Collection"
	})
	
	
	
}

exports.allMenWallet = function(req, res) {

	var output = [];

	for (i in json_responses.data) {
		if (json_responses.data[i].type === "wallet") {
			output.push(json_responses.data[i]);
		}
	}

	res.render("men", {
		values : output,
		show : "Men Wallets"
	})
}

exports.allMenCrossbody = function(req, res) {

	var output = [];

	for (i in json_responses.data) {
		if (json_responses.data[i].type === "crossbody") {
			output.push(json_responses.data[i]);
		}
	}

	res.render("men", {
		values : output,
		show : "Men Crossbody bags"
	})
}

exports.allMenBackpack = function(req, res) {

	var output = [];

	for (i in json_responses.data) {
		if (json_responses.data[i].type === "backpack") {
			output.push(json_responses.data[i]);
		}
	}

	res.render("men", {
		values : output,
		show : "Men Backpacks"
	})
}