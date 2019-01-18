// sets up object to store values later

const data = {};

// gets value from HTML element

function getValue(id) {
	return Number(document.getElementById(id).value);
}

// puts value into HTML element

function setValue(id, value) {
	document.getElementById(id).innerHTML = value;
}

// Collects all the form data

function getAllData() {
	data.garment = getValue('garment');
	data.garmentCost = getValue('exactGar');
	data.addMarkup = document.getElementById('markup').checked
	data.quantity = getValue('quantity');

	data.silkscreens = getValue('silkscreens');
	data.exactScr = getValue('exactScr');
	data.imprints = [];
	data.imprints.push(getValue('colors1'));
	// TODO: keep adding imprints
}

// do this when the calculate button or enter key is pressed

function calculate() {
	getAllData();
	console.log(data);
}

// sets up click handler on calculate button

document.getElementById("submit").onclick = function() {

	calculate();

};

// sets up keypress handler for enter, e, and r keys

document.addEventListener('keypress', function(e) {

	let key = e.which || e.keyCode;
	if (key === 13 || key === 101) {
		calculate();
	} else if (key === 114) {
		location.reload();
	}

});