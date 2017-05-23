/*
 function count(orderForm, lineNumber, itemCost) {
 orderForm.line_sum[lineNumber].value = orderForm.line[lineNumber].value * itemCost;
 orderForm.line_sum[lineNumber].value = Math.ceil(orderForm.line_sum[lineNumber].value * 1000) / 1000;
 orderForm.line_sum[lineNumber].value = Math.floor(orderForm.line_sum[lineNumber].value * 1000) / 1000;
 orderForm.line_sum[lineNumber].value = Math.round(orderForm.line_sum[lineNumber].value * 100) / 100;
 if (orderForm.line_sum[lineNumber].value == "NaN") {
 alert("Error:\nYou may only enter numbers...\nPlease retry");
 orderForm.line[lineNumber].value = orderForm.line[lineNumber].value.substring(0, orderForm.line[lineNumber].value.length - 1);
 orderForm.line_sum[lineNumber].value = orderForm.line[lineNumber].value * itemCost;
 if (orderForm.line_sum[lineNumber].value == "0")
 orderForm.line_sum[lineNumber].value = "";
 } else {
 var grandTotal = 0;
 for ( i = 0; i < orderForm.line_sum.length; i++) {
 grandTotal += Math.ceil(orderForm.line_sum[i].value * 1000) / 1000;
 }
 grandTotal = Math.round(grandTotal * 1000) / 1000;
 orderForm.grand_total.value = "$ " + grandTotal;
 decimal(orderForm);
 }
 }
 */
var optionsCost;
var shippingCost;
var sizeCost;
var salesTax;
var finalCost;

function calculateTotal() {
	finalCost = 0.00;
	optionsCost = 0.00;
	sizeCost = 0.00;
	shippingCost = 0.00;
	salesTax = 0.00;
	
	optionsCost = orderForm.grand_total.value;
	//alert (optionsCost);
	
	sizeCost = orderForm.lineSize.value;
	//alert (sizeCost);
	
	shippingCost = orderForm.lineShip.value;
	//alert (shippingCost);
	
	// cost without sales tax
	finalCost = accounting.unformat(optionsCost) + accounting.unformat(sizeCost) + accounting.unformat(shippingCost);
	//alert ("Final Cost without sales tax = " + finalCost);
	
	//add sales tax for true final cost
	//calculate sales tax
	salesTax = 0.06 * finalCost;
	//alert (salesTax);
	document.orderForm.salesTaxDisplay.value = accounting.formatMoney(salesTax);
	
	//add sales tax to intermediate final cost to get true final cost
	finalCost += salesTax;
	//alert (accounting.formatMoney(finalCost));
	document.orderForm.finalTotal.value = accounting.formatMoney(finalCost);
	
	
}

function setSize(size) {
	var price = 0.0;
	document.getElementById("mySize").value = size;

	if (size == "Small") {
		price = accounting.formatMoney(680.12);
		document.getElementById("lineSize").value = price;
	}
	if (size == "Medium") {
		price = accounting.formatMoney(302.14);
		document.getElementById("lineSize").value = price;
	}
	if (size == "Large") {
		price = accounting.formatMoney(269.69);
		document.getElementById("lineSize").value = price;
	}
}

function setShipper() {
	// find the drop-down choice input
	var shipDropDown = document.getElementById("theShipper");
	var displayShipper = document.getElementById("myShipper");
	var price;

	if (shipDropDown.options[shipDropDown.selectedIndex].text == "Space X") {
		price = parseFloat(180.00);
		displayShipper.value = "Space X - $180.00";
		document.orderForm.lineShip.value = accounting.formatMoney(price);
	} else if (shipDropDown.options[shipDropDown.selectedIndex].text == "NASA") {
		price = parseFloat(88.25);
		displayShipper.value = "NASA - $88.25";
		document.orderForm.lineShip.value = accounting.formatMoney(price);
	} else if (shipDropDown.options[shipDropDown.selectedIndex].text == "JAXA") {
		price = parseFloat(123.65);
		displayShipper.value = "JAXA - $123.65";
		document.orderForm.lineShip.value = accounting.formatMoney(price);
	} else {
		price = parseFloat(5.00);
		displayShipper.value = "Planet Express - $5.00";
		document.orderForm.lineShip.value = accounting.formatMoney(price);
	}
}

function get_data(orderForm) {
	var order_data = "This Order is...\n";

	for ( i = 0; i < orderForm.line.length; i++) {
		if (orderForm.line[i].value == "") {
			orderForm.line[i].value = "0";
		}
		order_data += "Line " + i + ", Qty = " + orderForm.line[i].value + ", Cost = " + accounting.formatMoney(orderForm.line_sum[i].value) + "\n";
	}
	if (orderForm.verifyOrder.value == "") {
		orderForm.verifyOrder.value = "Nothing yet";
	}

	order_data += "Total Order value = " + orderForm.verifyOrder.value;

	document.confirmationForm.order.value = order_data;
	
	

}

function count(orderForm, lineNumber, itemCost) {
	orderForm.line_sum[lineNumber].value = orderForm.line[lineNumber].value * itemCost;
	orderForm.line_sum[lineNumber].value = Math.ceil(orderForm.line_sum[lineNumber].value * 1000) / 1000;
	orderForm.line_sum[lineNumber].value = Math.floor(orderForm.line_sum[lineNumber].value * 1000) / 1000;
	orderForm.line_sum[lineNumber].value = Math.round(orderForm.line_sum[lineNumber].value * 100) / 100;
	if (orderForm.line_sum[lineNumber].value == "NaN") {
		alert("Error:\nYou may only enter numbers...\nPlease retry");
		orderForm.line[lineNumber].value = orderForm.line[lineNumber].value.substring(0, orderForm.line[lineNumber].value.length - 1);
		orderForm.line_sum[lineNumber].value = orderForm.line[lineNumber].value * itemCost;
		if (orderForm.line_sum[lineNumber].value == "0")
			orderForm.line_sum[lineNumber].value = "";
	} else {
		var grandTotal = 0;
		for ( i = 0; i < orderForm.line_sum.length; i++) {
			grandTotal += Math.ceil(orderForm.line_sum[i].value * 1000) / 1000;
		}
		grandTotal = Math.round(grandTotal * 100) / 100;
		grandTotal = accounting.formatMoney(grandTotal);
		orderForm.grand_total.value = grandTotal;
		//decimal(orderForm);
	}
}

//end of count function

function init() {
	document.orderForm.reset();
	document.orderForm.line[0].select();
	document.orderForm.line[0].focus();
	document.confirmationForm.order.value = "";

}

window.onload = init; 