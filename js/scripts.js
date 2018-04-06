// A website for a pizza company where a user can choose one or more individual toppings (cheese, pepperoni,
// artichoke, anchovy, etc) and a size to order a pizza and see the final cost.
//
// 	Allow the user to choose toppings and size for the pizza they'd like to order.
// Create a pizza object constructor with properties for toppings and size.
// 	Create a prototype method for the cost of a pizza depending on the selections chosen. Use your own formula for this.
//
// Style your site with CSS and images.
// 	Allow users to order more than one pizza with different toppings.
// 	Display the list of pizzas ordered as links that can be clicked for details.
//  Offer a delivery option that then requires address information.

class Pizza {
	constructor(sName = '', aToppings = [], iSize = 0) {
		this.aToppings = aToppings;
		this.iSize = iSize;
		this.sName = sName;
	}

	sizePrice(oSizePrice) {
		return oSizePrice[this.iSize];
	}

	toppingsPrice(oToppingsPrice) {
		let toppingsTotal = 0;
		this.aToppings.forEach(function (topping) {
			toppingsTotal += oToppingsPrice[topping]
		});
		return toppingsTotal;
	}

	pizzaPrice(oSizePrice, oToppingsPrice) {
		return this.sizePrice(oSizePrice) + this.toppingsPrice(oToppingsPrice);
	}
}

