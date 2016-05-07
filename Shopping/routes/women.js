var json_responses;
var Client = require('node-rest-client').Client;
var http = require('http');
var count = "";
var endpoint = "http://team1ELB-153492086.us-east-1.elb.amazonaws.com/catalog?gender=women";

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

exports.allWomen = function(req, res) {

	var output = [];

	for (i in json_responses.data) {
			output.push(json_responses.data[i]);
	}

	res.render("women", {
		values : output,
		type : "wall",
		show : "Women's Collection"
	})
}

exports.allWomenWallet = function(req, res) {

	var output = [];

	for (i in json_responses.data) {
		if (json_responses.data[i].type === "wallet") {
			output.push(json_responses.data[i]);
		}
	}

	res.render("women", {
		values : output,
		type : "wwallet",
		show : "Women Wallets"
	})
}

exports.allWomenHandbag = function(req, res) {

	var output = [];

	for (i in json_responses.data) {
		if (json_responses.data[i].type === "handbag") {
			output.push(json_responses.data[i]);
		}
	}

	res.render("women", {
		values : output,
		type : "whandbag",
		show : "Women Hangbags"
	})
}

exports.allWomenClutch = function(req, res) {

	var output = [];

	for (i in json_responses.data) {
		if (json_responses.data[i].type === "clutch") {
			output.push(json_responses.data[i]);
		}
	}

	res.render("women", {
		values : output,
		type : "wclutch",
		show : "Women Clutch"
	})
}

exports.allWomenCrossbody = function(req, res) {

	var output = [];

	for (i in json_responses.data) {
		if (json_responses.data[i].type === "crossbody") {
			output.push(json_responses.data[i]);
		}
	}

	res.render("women", {
		values : output,
		type : "wcrossbody",
		show : "Women Crossbody bags"
	})

}

exports.allWomenBackpack = function(req, res) {

	var output = [];

	for (i in json_responses.data) {
		if (json_responses.data[i].type === "backpack") {
			output.push(json_responses.data[i]);
		}
	}

	res.render("women", {
		values : output,
		type : "wcrossbody",
		show : "Women Backpack"
	})

}
