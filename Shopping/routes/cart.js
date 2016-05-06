var cart = [];
var json_responses;
var output = [];
var shoppingcartmain = [];
var allowtoproceed = [];
var searchOutput = [];
var search_value;
var checkout;
var orders = [];
var allOrders = [];

var Client = require('node-rest-client').Client;
var http = require('http');
var count = "";
var endpoint = "http://team1ELB-153492086.us-east-1.elb.amazonaws.com/catalog?gender=all";

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

exports.addCart = function(req, res) {
	item_code = req.param("item_code");
	console.log("item select is :" + item_code);
	cart.push(item_code);
	output = cart.reduce(function(a, b) {
		if (a.indexOf(b) < 0)
			a.push(b);
		return a;
	}, []);

	cart = output;

	console.log("items in cart")
	console.log(cart)
	/*	console.log("output of output");
	 console.log(output);
	 */
} // end of addCart

exports.deleteCart = function(req, res) {

	var cartDelete = [];
	var cartItems;
	var delete_response;

	item_code = req.param("item_code");
	console.log("Item code to be delete is : " + item_code);

	// only item codes
	cartItems = output;
	var i = cartItems.indexOf(item_code);
	if (i != -1) {
		cartItems.splice(i, 1);
	}

	cart = cartItems;
	output = cartItems;

	/*	console.log("cartItems")
	 console.log(cartItems)
	 console.log("cart")
	 console.log(cart)
	 console.log("output")
	 console.log(output)
	 */
	cartDelete = shoppingcartmain;
	/*
	 console.log("items in cart before delete");
	 console.log(cartDelete);

	 console.log("value of i");
	 console.log(i);
	 */
	for (p in cartDelete) {
		if (cartDelete[p].item_code == item_code) {
			cartDelete[p].quantity = '1';
			cartDelete.splice(p, 1);
		}
	}

	delete_response = {
		"statusCode" : 200
	};
	res.send(delete_response);

	/*	console.log("items in cart after delete");
	 console.log(cartDelete);
	 */
	shoppingcartmain = cartDelete;
	/*
	 console.log("items in main cart after delete");
	 console.log(shoppingcartmain);
	 */
}

exports.shoppingCart = function(req, res) {

	var price = 0;
	var tot_quantity = 0;
	var shoppingcart = [];
	var allow = '1';
	var allowtoproc = [];

	console.log("in shopping ccart")
	console.log(output)

	for (p in output) {
		for (i in json_responses.data) {
			if (json_responses.data[i].item_code == cart[p]) {
				shoppingcart.push(json_responses.data[i]);
			}
		}
	}

	for (a in shoppingcart) {
		if (shoppingcart[a].quantity >= 1) {

		} else {
			shoppingcart[a]['quantity'] = '1';
		}
	}

	for (i in shoppingcart) {
		var a = Number(shoppingcart[i].price);
		var b = Number(shoppingcart[i].quantity);
		var c = a * b;

		price = Number(price) + Number(c);
		//	console.log("price");
		//	console.log(price);
	}

	for (i in shoppingcart) {
		tot_quantity = Number(tot_quantity) + Number(shoppingcart[i].quantity);
	}

	shoppingcartmain = shoppingcart;

	for (i in shoppingcart) {
		//	var temp = shoppingcart[i].item_code
		//	console.log("item code cart item: "+temp) 

		for (x in json_responses.data) {
			if (json_responses.data[x].item_code == shoppingcart[i].item_code) {
				//console.log("i m in if loop : "+json_responses.data[x].item_code)
				if (Number(json_responses.data[x].avail_count) < Number(shoppingcart[i].quantity)) {
					allowtoproc[i] = '0';
				} else {
					allowtoproc[i] = '1';
				}
			}
		}

	}

	allowtoproceed = allowtoproc;

	//	console.log("allow to proceed array in refresh in main");
	//	console.log(allowtoproceed);

	for (var i = 0; i < allowtoproceed.length; i++) {
		if (allowtoproceed[i] == '0')
			allow = '0';
	}
	//	console.log("value of allow final ")
	//	console.log(allow);

	res.render('shoppingcart', {
		values : shoppingcart,
		price : price,
		quantity : tot_quantity,
		proceed : allow
	});

}

// updateCart
exports.updateCart = function(req, res) {

	var update_response;
	var price = 0;
	var tot_quantity = 0;
	var shoppingcart = [];
	var allowtoproc = [];

	shoppingcart = shoppingcartmain;

	item_code = req.param("item_code");
	quantity = req.param("quantity");
	console.log("Item code to be update is : " + item_code);
	console.log("Quantity is : " + quantity);

	if (quantity > 0) {
		update_response = {
			"statusCode" : 200
		};

		for (p in shoppingcart) {
			if (shoppingcart[p].item_code == item_code) {
				shoppingcart[p].quantity = quantity;
			}
		}

		for (i in shoppingcart) {
			var a = Number(shoppingcart[i].price);
			var b = Number(shoppingcart[i].quantity);
			var c = a * b;

			price = Number(price) + Number(c);
			//	console.log("price in updated");
			//	console.log(price);
		}

		for (i in shoppingcart) {
			tot_quantity = Number(tot_quantity)
					+ Number(shoppingcart[i].quantity);
		}

		shoppingcartmain = shoppingcart;
		res.send(update_response);

	} else {
		console.log("in 401 phase")
		update_response = {
			"statusCode" : 401
		};
		res.send(update_response);
	}
}

// refresh
exports.refreshCart = function(req, res) {
	var price = 0;
	var tot_quantity = 0;
	var shoppingcart = [];
	var allow = '1';
	var allowtoproc = [];

	shoppingcart = shoppingcartmain;

	for (i in shoppingcart) {
		var a = Number(shoppingcart[i].price);
		var b = Number(shoppingcart[i].quantity);
		var c = a * b;

		price = Number(price) + Number(c);
		//	console.log("price in updated");
		//	console.log(price);
	}

	for (i in shoppingcart) {
		tot_quantity = Number(tot_quantity) + Number(shoppingcart[i].quantity);
	}

	for (i in shoppingcart) {
		//	var temp = shoppingcart[i].item_code
		//	console.log("item code cart item: "+temp) 

		for (x in json_responses.data) {
			if (json_responses.data[x].item_code == shoppingcart[i].item_code) {
				//console.log("i m in if loop : "+json_responses.data[x].item_code)
				if (Number(json_responses.data[x].avail_count) < Number(shoppingcart[i].quantity)) {
					allowtoproc[i] = '0';
				} else {
					allowtoproc[i] = '1';
				}
			}
		}

	}

	allowtoproceed = allowtoproc;

	//	console.log("allow to proceed array in refresh in main");
	//	console.log(allowtoproceed);

	for (var i = 0; i < allowtoproceed.length; i++) {
		if (allowtoproceed[i] == '0')
			allow = '0';
	}
	//	console.log("value of allow final ")
	//	console.log(allow);

	// here
	res.render('shoppingcart', {
		values : shoppingcart,
		price : price,
		quantity : tot_quantity,
		proceed : allow
	});

}

// searchItem
exports.searchItem = function(req, res) {

	var search_response;
	var output = [];
	var search_input = req.param("search_input");
	console.log(search_input + " is the input");

	search_input = search_input.toLowerCase();

	//	console.log(search_input + " after lower case");

	search_value = search_input;

	for (i in json_responses.data) {
		if (json_responses.data[i].type == search_input) {
			output.push(json_responses.data[i]);
		}
	}

	if (output.length == '0') {
		//console.log("in no data search")
		search_response = {
			"statusCode" : 401
		};
		res.send(search_response);
	} else {
		//console.log("in yes data search")
		search_response = {
			"statusCode" : 200
		};
		res.send(search_response);
	}

	//	console.log("search output");
	// console.log(output);

	searchOutput = output;

}

// printSearch

exports.printSearch = function(req, res) {

	var output = [];

	output = searchOutput;

	//	console.log("in print search")

	res.render("search", {
		values : output,
		search_value : search_value
	})

}

exports.checkout = function(req, res) {
	checkout = JSON.parse(JSON.stringify(shoppingcartmain));

	for (i in checkout)
		checkout[i]['status'] = 'ready';

	res.render('checkout');
}

exports.confirmOrder = function(req, res) {
	for (i in checkout)
		checkout[i].status = 'ordered'

	res.render('thankyou');

	shoppingcartmain = [];

	output = [];

	cart = [];

	orders = JSON.parse(JSON.stringify(checkout));

	checkout = [];

}

exports.orders = function(req, res) {

	var currentOrder = JSON.parse(JSON.stringify(orders));

	for (i in currentOrder)
		allOrders.push(orders[i]);

	orders = [];

	res.render('orders', {
		values : allOrders
	});
}
