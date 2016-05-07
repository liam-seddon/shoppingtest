//loading the 'cart' angularJS module
var cart = angular.module('cart', []);
console.log("in angular cart")
//defining the cart controller
cart.controller('cart', function($scope, $http) {
	console.log("in angular cart - 1")
	$scope.addCart = function(data) {
		$scope.itemcode = data;
		console.log("button in angular: " + $scope.itemcode);
		$http({
			method : "POST",
			url : '/addcart',
			data : {
				"item_code" : $scope.itemcode
			}
		}).success(function(data) {
			if (data.statusCode == 401) {
				console.log("yes");
			} else {
				console.log("no"); 
			}
		}).error(function(error) {
			console.log("no no");
		});
	};

	//	updateQty
	$scope.invalid_update = true;
	$scope.updateQty = function(data) {
		$scope.itemcode = data;
		console.log("item code to update: " + $scope.itemcode);
		$http({
			method : "POST",
			url : '/updatecart',
			data : {
				"quantity" : $scope.quantity,
				"item_code" : $scope.itemcode
			}
		}).success(function(data) {
			if (data.statusCode == 401) {
				$scope.invalid_update = false;
				console.log("yes in update");
			} else {
				console.log("no in update");
				window.location.assign("/updatedcart");
			}
		}).error(function(error) {
			console.log("no no in update");
		});
	};

	//deleteItem
	$scope.invalid_delete = true;
	$scope.deleteItem = function(data) {
		$scope.itemcode = data;
		console.log("item code to delete: " + $scope.itemcode);
		$http({
			method : "POST",
			url : '/deletecart',
			data : {
				"item_code" : $scope.itemcode
			}
		}).success(function(data) {
			if (data.statusCode == 401) {
				$scope.invalid_delete = true;
				console.log("yes in delete");
				
			} else {
				$scope.invalid_delete = false;
				console.log("no in delete");
				//sleep(0);
				window.location.assign("/updatedcart");
			}
		}).error(function(error) {
			console.log("no no in delete");
		});
	};

	$scope.invalid_search = true;
	$scope.submit = function() {
		$http({
			method : "POST",
			url : '/checkSearch',
			data : {
				"search_input" : $scope.search
			}
		}).success(function(data) {
	
			if (data.statusCode == 401) {

				$scope.invalid_search = false;

			} else {
				console.log("in angular data fetch")
				window.location.assign("/search");

			}
		}).error(function(error) {

			$scope.invalid_search = true;
		});
	};

})
