var admin_responses;
var Client = require('node-rest-client').Client;
var http = require('http');
var count = "";
var endpointorder = "http://team1ELB-153492086.us-east-1.elb.amazonaws.com/shopcart?user=admin";
var endpointcart = "http://team1ELB-153492086.us-east-1.elb.amazonaws.com/shopcartget?user=admin";
var jsonData;
var jsonstring;

exports.orders = function(req, res) {
	var mydata;
	
	var client = new Client();
	client.get(endpointorder, function(data, response_raw) {
		if (response_raw) {

			if (data) {
				admin_responses = {
					"data" : data
				};
				mydata = data;
			}
			
		}

		else {
			console.log("returned false");
		}
	});
	
	
	console.log("order 2")
	console.log(admin_responses.data[0].items[0]["id"])
	console.log(admin_responses.data[0].items[0]["quantity"])
	
	
	console.log("order 2")
	console.log(admin_responses.data[0].items[1]["id"])
	console.log(admin_responses.data[0].items[1]["quantity"])
	
	res.render("adminorders", {
	//	values : output,
		show : "User orders"
	})
}


exports.cart = function(req, res) {
var mydata;
	
	var client = new Client();
	client.get(endpointcart, function(data, response_raw) {
		if (response_raw) {

			if (data) {
				admin_responses = {
					"data" : data
				};
				mydata = data;
			}
			
		}

		else {
			console.log("returned false");
		}
	});
	
	console.log("admin resp  in cart")
	console.log(mydata)
	
	console.log(mydata.items[0])
	console.log(mydata.items[0]["id"])

	
	res.render("admincart", {
	//	values : output,
		show : "User cart"
	})
}