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
	constructor(sName = '', aToppings = [], iSize = 6) {
		this.aToppings = aToppings;
		this.iSize = iSize;
		this.sName = sName;
	}

	sizePrice(oSizePrice) {
		return parseInt(oSizePrice[this.iSize]);
	}

	toppingsPrice(oToppingsPrice) {
		let toppingsTotal = 0;
		this.aToppings.forEach(function (topping) {
			toppingsTotal += parseInt(oToppingsPrice[topping]);
		});
		return toppingsTotal;
	}

	pizzaPrice(oSizePrice, oToppingsPrice) {
		return this.sizePrice(oSizePrice) + this.toppingsPrice(oToppingsPrice);
	}
}


class Order {
	constructor(PPizza = '', sAddress = '', price=0) {
		this.PPizza = PPizza;
		this.sAddress = sAddress;
		this.price = price;
	}

	orderPrice (shippingPrice=5){
		return this.price + shippingPrice;
	}

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// user interface logic
$().ready(function () {
	let orders = [];
	$('.pizza-form').submit(function (e) {
		e.preventDefault();

		$(".pizza-list").show();
		let oToppingPrice = {'Cheese': 6, 'Pepperoni': 8, 'Artichoke': 8, 'Anchovy': 8};
		let oSizePrice = {6: 6, 12: 12, 14: 14, 16: 16};

		$(".pizza").each(function () {
			let size = parseInt($(this).find(('select#size')).val());
			let pizzaName = $(this).find(("input#name")).val();
			let city = $(this).find(("input.city")).val();
			let street = $(this).find(("input.street")).val();
			let state = $(this).find(("input.state")).val();
			let toppings = [];
			$(this).find("input:checkbox[name=toppings]:checked").each(function () {
				toppings.push($(this).val());
			});
			let order = new Order();
			let pizza = new Pizza(pizzaName, toppings, size);
			let pizzaPrice = pizza.pizzaPrice(oSizePrice,oToppingPrice);
			order.price = pizzaPrice;
			order.PPizza = pizza;
			if(city && street && state){
			order.sAddress = `${street},  ${city},  ${state}`;
			}else{
				order.sAddress = '';
			}
			orders.push(order);
			let orderList = `<p class='lead'><a href='#'>${pizzaName}</a></p>`;
			$(".pizza-list").append(orderList);
		});

		// remove extra pizza field
		$(".pizza:gt(0)").remove();

		// empty fields
		$("input").val("");
		$("#size").val("");
		$('input:checkbox[name=toppings]').each(function(index, element) {
			var checked = element.checked;
			if (checked) {
				$(element).trigger('click');
			}
		});
		});



		// show feedback
		$(".pizza-list").click(() => {
			$(".pizza-detail").show();
		// caculate order total
			let total = 0;
			orders.forEach( order => {
				total += order.orderPrice();
			});
			// if address is true, only show address on the first pizza
			let detail = '';
			if(orders[0].sAddress){
				detail = `<p class='lead'>Please confirm your order: </p>
												<p class='lead'>Order Address: ${orders[0].sAddress}</p>
												<p class='lead'>Order total: $ ${total}</p>`;
			}else{
				detail = `<p class='lead'>Please confirm your order: </p>
												<p class='lead'>Order total: $ ${total - 5}</p>`;
			}

			orders.forEach(order => {
									detail +=  `
															<p class='lead'> Pizza Name: ${order.PPizza.sName}</p>
															<p class='lead'>Pizza Size: ${order.PPizza.iSize}</p>
															<p class='lead'> Toppings: ${order.PPizza.aToppings}</p>
														`;

			});
			$(".pizza-detail").html(detail);
		});

		$(".another-pizza").click(function () {
			let newPizza = `<div class="pizza my-5">
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
						<input type="checkbox" name="toppings" value="Pepperoni"> Pepperoni<br>
						<input type="checkbox" name="toppings" value="Artichoke"> Artichoke<br>
						<input type="checkbox" name="toppings" value="Anchovy"> Anchovy<br>
					</div>
				</div>

			</div>`;
			$("#pizza").append(newPizza);
		});

		$("#delivery").click(() => {
			$(".delivery-address").show();
		});
		$("#carryout").click(() => {
			$(".delivery-address").hide();
		});
		$("#reset").click( () => {
			location.reload();
		})

	});