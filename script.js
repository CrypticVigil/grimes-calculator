// define variables and price chart arrays

let garment, quantity, arrayQty, silkscreens, firstImprintColors;
let secondImprintColors, thirdImprintColors, fourthImprintColors, totalPrice; 
let adjust = [];

// cost for single silkscreen, starting at 1 item, then 3 or more

let silkscreenCost = [ 12, 6, 2, 1.5, 1, 0.60, 0.40, 0.30, 0.20, 0.16, 0.125, 0.1, 0.07, 0.05 ];

// array of price break quantities

let quantitiesList = [ 1, 3, 6, 9, 12, 18, 24, 36, 48, 60, 80, 100, 150, 200 ];

// this chart contains the pricing info for the first imprint

let firstImprintChart = [
	[0, 11, 14, 17, 20, 23, 26],			// 1 or more
	[0, 9, 11.5, 14, 16.5, 19, 21.5],		// 3 or more
	[0, 7, 9, 11, 13, 15, 17],				// 6 or more
	[0, 6, 7.8, 9.6, 11.4, 13.2, 15],		// 9 or more
	[0, 5, 6.4, 7.8, 9.2, 10.6, 12], 		// 12 or more 
	[0, 4.5, 5.7, 6.9, 8.1, 9.3, 10.5],		// 18 or more
	[0, 4, 5.1, 6.2, 7.3, 8.4, 9.5],		// 24 or more
	[0, 3.6, 4.6, 5.6, 6.6, 7.6, 8.6],		// 36 or more
	[0, 3.3, 4.2, 5.1, 6, 6.9, 7.8],		// 48 or more
	[0, 3, 3.8, 4.6, 5.4, 6.2, 7],			// 60 or more
	[0, 2.75, 3.5, 4.25, 5, 5.75, 6.5],		// 80 or more
	[0, 2.5, 3.2, 3.9, 4.6, 5.3, 6],		// 100 or more
	[0, 2.2, 2.8, 3.4, 4, 4.6, 5.2],		// 150 or more
	[0, 2, 2.55, 3.1, 3.65, 4.2, 4.75]		// 200 or more
];

// this chart contains the pricing info for the second imprint

let secondImprintChart = [
	[0, 8, 11, 14, 17, 20, 23],				// 1 or more
	[0, 6.5, 9, 11.5, 14, 16.5, 19],		// 3 or more
	[0, 5, 7, 9, 11, 13, 15],				// 6 or more
	[0, 4, 5.6, 7.2, 8.8, 10.4, 12],		// 9 or more
	[0, 3, 4.2, 5.4, 6.6, 7.8, 9],			// 12 or more
	[0, 2.7, 3.8, 4.9, 6, 7.1, 8.2],		// 18 or more
	[0, 2.4, 3.4, 4.4, 5.4, 6.4, 7.4],		// 24 or more
	[0, 2.2, 3.1, 4, 4.9, 5.8, 6.7],		// 36 or more
	[0, 2, 2.8, 3.6, 4.4, 5.2, 6],			// 48 or more
	[0, 1.8, 2.5, 3.2, 3.9, 4.6, 5.3],		// 60 or more
	[0, 1.65, 2.3, 2.95, 3.6, 4.25, 4.9],	// 80 or more
	[0, 1.5, 2.1, 2.7, 3.3, 3.9, 4.5],		// 100 or more
	[0, 1.3, 1.85, 2.4, 2.95, 3.5, 4.05],	// 150 or more
	[0, 1.2, 1.7, 2.2, 2.7, 3.2, 3.7]		// 200 or more
];

// gets value from HTML element

function getValue(id) {
	return Number(document.getElementById(id).value);
}

// puts value into HTML element

function setValue(id, value) {
	document.getElementById(id).innerHTML = value;
}

// checks if there's a value in the garment cost input
// if not, then it uses the value from the garment style select

function garmentCost() {
	if (getValue('exactGar') && document.getElementById('markup').checked) {
		garment = calcMarkup(getValue('exactGar'));
	} else if (getValue('exactGar') && !document.getElementById('markup').checked) {
		garment = getValue('exactGar');
	} else {
		garment = getValue('garment');
	}
}

// takes a blank item cost and returns the price with markup

function calcMarkup(blank) {

	function markup(num, markup) {
		num = num * markup;
		num = (num * 100).toFixed();
		let lastDigit = num.slice(-1);
		num = Number(num);
		if (lastDigit >= 3) {
			num = Math.ceil(num / 10) * 10;
		} else {
			num = Math.floor(num / 10) * 10;
		}
		return (num / 100);
	}

	if (blank < 5) {
		return markup(blank, 1.5);
	} else if (blank < 10 && blank >= 5) {
		return markup(blank, 1.45);
	} else if (blank < 20 && blank >= 10) {
		return markup(blank, 1.4);
	} else if (blank < 30 && blank >= 20) {
		return markup(blank, 1.35);
	} else if (blank < 50 && blank >= 30) {
		return markup(blank, 1.3);
	} else if (blank < 80 && blank >= 50) {
		return markup(blank, 1.25);
	} else {
		return markup(blank, 1.20);
	}
}

// checks for a value in the exact qty input
// and converts it to a price break quantity

function setQty() {

	if (getValue("exactQty")) {
		quantity = getValue("exactQty");
	} else {
		quantity = getValue("quantity");
	}

	if (quantity < 3) {
		arrayQty = 0;		// 1 or more
	} else if (quantity < 6 && quantity >= 3) {
		arrayQty = 1;		// 3 or more
	} else if (quantity < 9 && quantity >= 6) {
		arrayQty = 2;		// 6 or more
	} else if (quantity < 12 && quantity >= 9) {
		arrayQty = 3;		// 9 or more
	} else if (quantity < 18 && quantity >= 12) {
		arrayQty = 4;		// 12 or more
	} else if (quantity < 24 && quantity >= 18) {
		arrayQty = 5;		// 18 or more
	} else if (quantity < 36 && quantity >= 24) {
		arrayQty = 6;		// 24 or more
	} else if (quantity < 48 && quantity >= 36) {
		arrayQty = 7;		// 36 or more
	} else if (quantity < 60 && quantity >= 48) {
		arrayQty = 8;		// 48 or more
	} else if (quantity < 80 && quantity >= 60) {
		arrayQty = 9;		// 60 or more
	} else if (quantity < 100 && quantity >= 80) {
		arrayQty = 10;		// 80 or more
	} else if (quantity < 150 && quantity >= 100) {
		arrayQty = 11;		// 100 or more
	} else if (quantity < 200 && quantity >= 150) {
		arrayQty = 12;		// 150 or more
	} else {
		arrayQty = 13;		// 200 or more
	}

}

// checks if there's a value in the exact scr input
// if not, then it uses the value from the silkscreens select

function numSilkscreens() {
	if (document.getElementById("exactScr").value) {
		silkscreens = getValue("exactScr");
	} else {
		silkscreens = getValue("silkscreens");
	}
}

// rounds a decimal up or down

function roundOff(value, adjustment) {
	value = (value * 100).toFixed();
	let lastDigit = value.toString().slice(-1);
	if (lastDigit >= 4) {
		value = Math.ceil(value / 10) * 10;
	} else {
		value = Math.floor(value / 10) * 10;
	}
	value = (value / 100) + adjustment;
	return value.toFixed(2);
}

// calculates the cost per shirt

function calcCost(key) {
	
	let firstImprintCost = Number((firstImprintChart[key])[firstImprintColors]);
	let secondImprintCost = Number((secondImprintChart[key])[secondImprintColors]);
	let thirdImprintCost = Number((secondImprintChart[key])[thirdImprintColors]);
	let fourthImprintCost = Number((secondImprintChart[key])[fourthImprintColors]);

	totalPrice = (Number(silkscreenCost[key]) * silkscreens) + firstImprintCost +
		secondImprintCost + thirdImprintCost + fourthImprintCost;

	return totalPrice;
}

// calculates the total cost with tax

function calcTotal(item) {
	return (item * quantity) * 1.06;
}

// calculates a rough estimate of the time the job will take to print

function calcTime() {
	let time, hours, minutes;
	let multiply = [0, 0.75, 1.125, 1.5, 1.875, 2.25, 2.625];
	time = quantity * multiply[firstImprintColors];
	time += (quantity * multiply[secondImprintColors]);
	time += (quantity * multiply[thirdImprintColors]);
	time += (quantity * multiply[fourthImprintColors]);
	time += firstImprintColors * 4;
	time += secondImprintColors * 4;
	time += thirdImprintColors * 4;
	time += fourthImprintColors * 4;

	hours = Math.floor(time / 60);
	minutes = Math.floor(time % 60);

	if (minutes < 10) {
		minutes = "0" + minutes;
	}

	return hours + ":" + minutes;
}

// variables for embroidery

let stitches1st, stitches2nd, stitches3rd, stitches4th, digitize;

let embChart = {
	6:[2, 0.75, 0.5],
	12:[1.8, 0.6, 0.45],
	48:[1.6, 0.55, 0.4],
	100:[1.5, 0.5, 0.4]
};

function totalEmb(qty) {
	
	let amount = quantitiesList[qty];
	let quantityEmb, totalEmbCost;

	if (amount < 12 && amount >= 6) {
		quantityEmb = 6;
	} else if (amount < 48 && amount >= 12) {
		quantityEmb = 12;
	} else if (amount < 100 && amount >= 48) {
		quantityEmb = 48;
	} else if (amount < 500 && amount >= 100) {
		quantityEmb = 100;
	} else {
		quantityEmb = amount;
	}

	totalEmbCost = calcEmb(stitches1st, quantityEmb);

	if (stitches2nd != 0) {
		totalEmbCost += calcEmb(stitches2nd, quantityEmb);
	}

	if (stitches3rd != 0) {
		totalEmbCost += calcEmb(stitches3rd, quantityEmb);
	}

	if (stitches4th != 0) {
		totalEmbCost += calcEmb(stitches4th, quantityEmb);
	}

	return totalEmbCost;

}

// calculate embroidery cost using stitch count & quantity

function calcEmb(stitches, amt) {

	let cost, chartRow;

	if (amt == 1) {
		chartRow = embChart[6];
		cost = 3;
	} else if (amt == 3) {
		chartRow = embChart[6];
		cost = 1;
	} else {
		chartRow = embChart[amt];
		cost = 0;
	}

	if (stitches <= 10) {
		cost += chartRow[0];
		cost += chartRow[1] * (stitches - 2);
	} else {
		cost += chartRow[0];
		cost += chartRow[1] * (8);
		cost += chartRow[2] * (stitches - 10);
	}

	return cost;
}

// rounds up stitches to nearest thousand
	
function setStitches(stitches) {
	if (stitches > 500) {
		stitches = Math.ceil(stitches / 1000);
	} else {
		stitches = Math.ceil(stitches);
	}

	if (stitches < 2 && stitches !== 0) {
		stitches = 2;
	}

	return stitches;
}

// variables for heat application

let HAitem1 = 0;
let HAitem2 = 0;

// calculate how many items can fit on the roll

function checkBoth(height, width, qty) {
	let lower, perRow, perRowHeight, priceWidth, priceHeight;

	if (qty < 6) {

		priceHeight = (height * 0.5);
		priceWidth = (width * 0.5);

		if (width > 19) {
			document.getElementById("width").value = "";
			document.getElementById("width").placeholder = "19\" or less";
		}

		if (priceHeight < priceWidth) {
			lower = priceHeight;
		} else {
			lower = priceWidth;
		}
	
	} else {

		if (width > 19) {
			document.getElementById("width").value = "";
			document.getElementById("width").placeholder = "19\" or less";
		} else if (width <= 19 && width * 2 > 19) {
			perRow = 1;
		} else if (width * 2 <= 19 && width * 3 > 19) {
			perRow = 2;
		} else if (width * 3 <= 19 && width * 4 > 18) {
			perRow = 3;
		} else if (width * 4 <= 18 && width * 5 > 17.5) {
			perRow = 4;
		} else if (width * 5 <= 17.5 && width * 6 > 17) {
			perRow = 5;
		} else if (width * 6 <= 17) {
			perRow = 6;
		}

		if (height * 2 > 19) {
			perRowHeight = 1;
		} else if (height * 2 <= 19 && height * 3 > 19) {
			perRowHeight = 2;
		} else if (height * 3 <= 19 && height * 4 > 18) {
			perRowHeight = 3;
		} else if (height * 4 <= 18 && height * 5 > 17.5) {
			perRowHeight = 4;
		} else if (height * 5 <= 17.5 && height * 6 > 17) {
			perRowHeight = 5;
		} else if (height * 6 <= 17) {
			perRowHeight = 6;
		}

		priceHeight = (height * 0.5) / perRow;
		priceWidth = (width * 0.5) / perRowHeight;

		if (priceHeight < priceWidth) {
			lower = priceHeight;
		} else {
			lower = priceWidth;
		}

	}

	return Number(lower.toFixed(2));
}

function appCost(inputQty) {

	let application;
	
	if (inputQty < 6) {
		application = 3;
	} else if (6 <= inputQty && inputQty < 12) {
		application = 2.4;
	} else if (12 <= inputQty && inputQty < 24) {
		application = 2;
	} else if (24 <= inputQty && inputQty < 48) {
		application = 1.8;
	} else if (48 <= inputQty && inputQty < 100) {
		application = 1.6;
	} else if (100 <= inputQty && inputQty < 1000) {
		application = 1.4;
	}

	return application;

}

// retrieve or calculate the cost for the applied decal

function itemCost(HAqty, num) {

	let itemCost = 0;

	if (getValue("decal" + num)) {

		itemCost = getValue("decal" + num);

	} else if (getValue("height" + num)) {

		let HAwidth = getValue("width" + num) || 18;
		let HAheight = getValue("height" + num);

		itemCost = checkBoth(HAheight, HAwidth, HAqty);

	} else {

		itemCost = getValue("heatPresets" + num);
	
	}
	return itemCost;

}

// do this when the calculate button or enter key is pressed

function calculate() {
	
	garmentCost();

	let quote1 = garment;
	let quote2 = garment;
	let quote3 = garment;
	let quote4 = garment;

	setQty();

	adjust[1] = getValue("adj1");
	adjust[2] = getValue("adj2");
	adjust[3] = getValue("adj3");
	adjust[4] = getValue("adj4");

	if (getValue("colors1st")) {
		
		numSilkscreens();

		firstImprintColors = getValue("colors1st");
		secondImprintColors = getValue("colors2nd");
		thirdImprintColors = getValue("colors3rd");
		fourthImprintColors = getValue("colors4th");

		quote1 += calcCost(arrayQty);

		if (arrayQty != 13) {
			quote2 += calcCost(arrayQty + 1);
		}

		if (arrayQty != 12 && arrayQty != 13) {
			quote3 += calcCost(arrayQty + 2);
		}

		if (arrayQty != 11 && arrayQty != 12 && arrayQty != 13) {
			quote4 += calcCost(arrayQty + 3);
		}

		setValue("time", calcTime());
		
	}

	if (getValue("emb1")) {

		stitches1st = setStitches(getValue("emb1"));
		stitches2nd = setStitches(getValue("emb2"));
		stitches3rd = setStitches(getValue("emb3"));
		stitches4th = setStitches(getValue("emb4"));

		// calculate embroidery cost
		quote1 += totalEmb(arrayQty);

		if (arrayQty != 13) {
			quote2 += totalEmb(arrayQty + 1);
		}

		if (arrayQty != 12 && arrayQty != 13) {
			quote3 += totalEmb(arrayQty + 2);
		}

		if (arrayQty != 11 && arrayQty != 12 && arrayQty != 13) {
			quote4 += totalEmb(arrayQty + 3);
		}

		// calculate digitizing fee - $4 per thousand stitches
		digitize = stitches1st * 4 + stitches2nd * 4 + stitches3rd * 4 + stitches4th * 4;
			
		setValue("costDig", digitize);

	}

	if (getValue('heatPresets1') != 0 || getValue('height1') || getValue('decal1')) {

		let heatQty1 = quantitiesList[arrayQty];
		let heatQty2 = quantitiesList[arrayQty + 1];
		let heatQty3 = quantitiesList[arrayQty + 2];
		let heatQty4 = quantitiesList[arrayQty + 3];

		if (getValue('heatPresets2') != 0 || getValue('height2') || getValue('decal2')) {

			quote1 += itemCost(heatQty1, "1") + itemCost(heatQty1, "2") + (appCost(heatQty1 * 2) * 2);

			if (arrayQty != 13) {
				quote2 += itemCost(heatQty2, "1") + itemCost(heatQty2, "2") + (appCost(heatQty2 * 2) * 2);
			}

			if (arrayQty != 12 && arrayQty != 13) {
				quote3 += itemCost(heatQty3, "1") + itemCost(heatQty3, "2") + (appCost(heatQty3 * 2) * 2);
			}

			if (arrayQty != 11 && arrayQty != 12 && arrayQty != 13) {
				quote4 += itemCost(heatQty4, "1") + itemCost(heatQty4, "2") + (appCost(heatQty4 * 2) * 2);			
			}

		} else {

			quote1 += itemCost(heatQty1, "1") + (appCost(heatQty1));

			if (arrayQty != 13) {
				quote2 += itemCost(heatQty2, "1") + (appCost(heatQty2));
			}

			if (arrayQty != 12 && arrayQty != 13) {
				quote3 += itemCost(heatQty3, "1") + (appCost(heatQty3));
			}

			if (arrayQty != 11 && arrayQty != 12 && arrayQty != 13) {
				quote4 += itemCost(heatQty4, "1") + (appCost(heatQty4));			
			}

		}

	}

	setValue("qty1", quantitiesList[arrayQty] + " or more");
	setValue("cost1", roundOff(quote1, adjust[1]));

	if (arrayQty == 13) {
		setValue("qty2", "Use price chart");
		setValue("cost2", "");
	} else {
		setValue("qty2", quantitiesList[arrayQty + 1] + " or more");
		setValue("cost2", roundOff(quote2, adjust[2]));			
	}

	if (arrayQty == 12 || arrayQty == 13) {
		setValue("qty3", "Use price chart");
		setValue("cost3", "");
	} else {
		setValue("qty3", quantitiesList[arrayQty + 2] + " or more");
		setValue("cost3", roundOff(quote3, adjust[3]));
	}

	if (arrayQty == 11 || arrayQty == 12 || arrayQty == 13) {
		setValue("qty4", "Use price chart");
		setValue("cost4", "");
	} else {
		setValue("qty4", quantitiesList[arrayQty + 3] + " or more");
		setValue("cost4", roundOff(quote4, adjust[4]));
	}

	setValue("total", calcTotal(roundOff(quote1, adjust[1])).toFixed(2));

}

document.getElementById("submit").onclick = function() {

	calculate();

};

document.addEventListener('keypress', function(e) {

	let key = e.which || e.keyCode;
	if (key === 13) {

		calculate();

	}

});