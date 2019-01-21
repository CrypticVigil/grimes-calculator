// sets up const variables to store values later

const data = {};
const quotes = [];

// this chart contains the pricing info for the first imprint
// to edit, enter the values for each quantity starting with a 0,
// then 1-color, 2-color, etc.

let firstImprintChart = {
  1: [0, 11, 14, 17, 20, 23, 26], // 1 or more
  3: [0, 9, 11.5, 14, 16.5, 19, 21.5], // 3 or more
  6: [0, 7, 9, 11, 13, 15, 17], // 6 or more
  9: [0, 6, 7.8, 9.6, 11.4, 13.2, 15], // 9 or more
  12: [0, 5, 6.4, 7.8, 9.2, 10.6, 12], // 12 or more
  18: [0, 4.5, 5.7, 6.9, 8.1, 9.3, 10.5], // 18 or more
  24: [0, 4, 5.1, 6.2, 7.3, 8.4, 9.5], // 24 or more
  36: [0, 3.6, 4.6, 5.6, 6.6, 7.6, 8.6], // 36 or more
  48: [0, 3.3, 4.2, 5.1, 6, 6.9, 7.8], // 48 or more
  60: [0, 3, 3.8, 4.6, 5.4, 6.2, 7], // 60 or more
  80: [0, 2.75, 3.5, 4.25, 5, 5.75, 6.5], // 80 or more
  100: [0, 2.5, 3.2, 3.9, 4.6, 5.3, 6], // 100 or more
  150: [0, 2.2, 2.8, 3.4, 4, 4.6, 5.2], // 150 or more
  200: [0, 2, 2.55, 3.1, 3.65, 4.2, 4.75] // 200 or more
};

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
  data.exGarment = getValue('exactGar');
  data.addMarkup = document.getElementById('markup').checked;
  data.quantity = getValue('quantity');
  data.exQty = getValue('exactQty');

  data.silkscreens = getValue('silkscreens');
  data.exactScr = getValue('exactScr');
  data.imprints = [];
  data.imprints.push(getValue('colors1'));
  data.imprints.push(getValue('colors2'));
  data.imprints.push(getValue('colors3'));
  data.imprints.push(getValue('colors4'));

  data.embroidery = [];
  data.embroidery.push(getValue('emb1'));
  data.embroidery.push(getValue('emb2'));
  data.embroidery.push(getValue('emb3'));
  data.embroidery.push(getValue('emb4'));

  data.heatApp = {};
  data.heatApp.preset1 = getValue('heatPresets1');
  data.heatApp.height1 = getValue('height1');
  data.heatApp.width1 = getValue('width1');
  data.heatApp.decal1 = getValue('decal1');
  data.heatApp.preset2 = getValue('heatPresets2');
  data.heatApp.height2 = getValue('height2');
  data.heatApp.width2 = getValue('width2');
  data.heatApp.decal2 = getValue('decal2');

  data.adjust = [];
  data.adjust.push(getValue('adj1'));
  data.adjust.push(getValue('adj2'));
  data.adjust.push(getValue('adj3'));
  data.adjust.push(getValue('adj4'));
  data.adjust.push(getValue('adj5'));
  data.adjust.push(getValue('adj6'));
}

// calculates the price for a particular quantity and row

function calcCost(qty, row) {
  let total = data.garment;

  return total;
}

// sets up onclick events for price levels

(function highlight() {
  for (let i = 1; i <= 6; i++) {
    const item = document.getElementById('qty' + i);
    item.addEventListener('click', function() {
      item.classList.toggle('highlighted');
    });
  }
})();

// do this when the calculate button or enter key is pressed

function calculate() {
  getAllData();
  console.log(data);
}

// sets up click handler on calculate button

document.getElementById('submit').onclick = function() {
  calculate();
};

// sets up keypress handler for enter, e, and r keys

document.addEventListener('keypress', function(e) {
  const key = e.which || e.keyCode;
  if (key === 13 || key === 101) {
    calculate();
  } else if (key === 114) {
    location.reload();
  }
});
