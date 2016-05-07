
var express = require('express')
, routes = require('./routes')
, user = require('./routes/user')
, http = require('http')
, path = require('path');


var men = require("./routes/men");
var women = require("./routes/women");
var cart = require("./routes/cart");
var admin = require("./routes/admin");

var app = express();

//all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//development only
if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}

//GET Requests
app.get('/', routes.index);
app.get('/shoppingcart',cart.shoppingCart);
app.get('/checkout',cart.checkout);
app.get('/updatedcart',cart.refreshCart);
app.get('/search',cart.printSearch);
app.get('/about',function(req,res){
	res.render('about', { title: 'About us' });
});
app.get('/confirmorder',cart.confirmOrder)
app.get('/orders',cart.orders)
app.get('/guest',cart.guestSelect);
app.get('/confirmorderguest',cart.guestOrder);
app.get('/okguest',cart.guestOK);
app.get('/login',function(req,res){
	res.render('login', { title: 'Login' });
});
app.get('/userpage',function(req,res){
	res.render('userpage', { title: 'Login' });
});

app.get('/adminorders',cart.adminOrders)
app.get('/admincart',cart.adminCart)

app.get('/user',cart.userSelect);
app.get('/confirmorderadmin',cart.adminOrder);
app.get('/usercancel',cart.usercancel);




app.get('/men',men.allMen);
app.get('/menwallet',men.allMenWallet);
app.get('/mencrossbody',men.allMenCrossbody);
app.get('/menbackpack',men.allMenBackpack);

app.get('/women',women.allWomen);
app.get('/womenwallet',women.allWomenWallet);
app.get('/womenhandbag',women.allWomenHandbag);
app.get('/womenclutch',women.allWomenClutch);
app.get('/womencrossbody',women.allWomenCrossbody);
app.get('/womenbackpack',women.allWomenBackpack);

//POST Requests
app.post('/addcart', cart.addCart);
app.post('/updatecart', cart.updateCart);
app.post('/deletecart', cart.deleteCart);
app.post('/checkSearch', cart.searchItem);


	http.createServer(app).listen(app.get('port'), function(){
		console.log('Server listening on port ' + app.get('port'));
	});  
