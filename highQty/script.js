// define variables

let garment, quantity, firstImprintColors;
let secondImprintColors, thirdImprintColors, fourthImprintColors; 
let time, totalHours;
let silkscreens = 0;
let hourlyRate = [180, 170, 160, 150, 140, 135, 130, 125];
let qtyIndex;

// gets value from HTML element

function getValue(id) {
	return Number(document.getElementById(id).value);
}

// puts value into HTML element

function setValue(id, value) {
	document.getElementById(id).innerHTML = value;
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

// calculates the total cost with tax

function calcTotal(item) {
	return ((item * quantity) * 1.06).toFixed(2);
}

// calculates the time the job will take to print

function calcTime() {
	let hours, minutes;
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

	totalHours = (time / 60).toFixed(4);

	if (minutes < 10) {
		minutes = "0" + minutes;
	}

	return hours + ":" + minutes;
}

// gets the quantity value and sets the index

function setQuantity() {

	quantity = getValue('quantity') || 100;

	if (quantity < 48) {
		quantity = 48;
	}

	if (quantity < 60) {
		qtyIndex = 0;
	} else if (quantity >= 60 && quantity < 80) {
		qtyIndex = 1;
	} else if (quantity >= 80 && quantity < 100) {
		qtyIndex = 2;
	} else if (quantity >= 100 && quantity < 200) {
		qtyIndex = 3;
	} else if (quantity >= 200 && quantity < 300) {
		qtyIndex = 4;
	} else if (quantity >= 300 && quantity < 400) {
		qtyIndex = 5;
	} else if (quantity >= 400 && quantity < 500) {
		qtyIndex = 6;
	} else if (quantity >= 500) {
		qtyIndex = 7;
	}

}

// do this when the calculate button or enter key is pressed

function calculate() {
	
	garment = getValue('garment');

	setQuantity();
		
	numSilkscreens();

	firstImprintColors = getValue("colors1st");
	secondImprintColors = getValue("colors2nd");
	thirdImprintColors = getValue("colors3rd");
	fourthImprintColors = getValue("colors4th");

	setValue("time", calcTime());

	let quote = garment + (silkscreens * 12 / quantity) + (totalHours * hourlyRate[qtyIndex] / quantity);

	setValue("qty1", quantity + " or more");
	setValue("cost1", quote.toFixed(2));

	setValue("total", calcTotal(quote.toFixed(2)));

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