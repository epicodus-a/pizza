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


$().ready(function () {
	$('.pizza-form').submit(function (e) {
		e.preventDefault();
		let oToppingPrice = {'cheese': 6, 'pepperoni': 8, 'artichoke': 8, 'anchovy': 8};
		let oSizePrice = {6: 6, 12: 12, 14: 14, 16: 16};
		let size = parseInt($('#size').val());
		let pizzaName = $("#name").val();
		let toppings = [];
		$("input:checkbox[name=toppings]:checked").each(function () {
			toppings.push($(this).val());
		});
		let pizza = new Pizza(pizzaName, toppings, size);


	});
	$(".another-pizza").click(function(){
		let newPizza = `<div class="pizza">
				<div class="form-group">
					<input type="text" class="form-control" id="name" placeholder="Name Your Pizza">
				</div>
				<div class="input-group">
					<div class="input-group-prepend">
						<lable class="input-group-text" for="size">Size</lable>
					</div>
					<select class="custom-select" id="size">
						<option value="6">6</option>
						<option value="12">12</option>
						<option value="14">14</option>
						<option value="16">16</option>
					</select>
					<div class="input-group-append">
						<button class="btn btn-outline-secondary" type="button">"</button>
					</div>
				</div><!--/#size-->
				<div class="form-group my-5">
					<h4 class="text-center my-5">Choose Some Toppings</h4>
					<div class="form-group">
						<input type="checkbox" name="toppings" value="Cheese"> Cheese<br>
						<input type="checkbox" name="toppings" value="pepperoni"> Pepperoni<br>
						<input type="checkbox" name="toppings" value="artichoke"> Artichoke<br>
						<input type="checkbox" name="toppings" value="anchovy"> Anchovy<br>
					</div>
				</div>
			</div>
		</div>`;
		$("#pizza").append(newPizza);
	});

});