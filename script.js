// sets up const variables to store values later

const data = {};

// cost for single silkscreen, starting at 1 item, then 3 or more

const silkscreenCost = [12, 6, 2, 1.5, 1, 0.6, 0.4, 0.3, 0.2, 0.16, 0.125, 0.1, 0.07]; // no silkscreen fee for 200+

// array of price break quantities

const breaks = [1, 3, 6, 9, 12, 18, 24, 36, 48, 60, 80, 100, 150, 200, 300, 400, 600, 800];

// object for adjustment values

const adjustments = {
  1: { index: 4 },
  3: { index: 4 },
  6: { index: 4 },
  9: { index: 4 },
  12: { index: 4 },
  18: { index: 4 },
  24: { index: 4 },
  36: { index: 4 },
  48: { index: 4 },
  60: { index: 4 },
  80: { index: 4 },
  100: { index: 4 },
  150: { index: 4 },
  200: { index: 4 },
  300: { index: 4 },
  400: { index: 4 },
  600: { index: 4 },
  800: { index: 4 }
};

// this chart contains the pricing info for the first imprint
// to edit, enter the values for each quantity starting with a 0,
// then 1-color, 2-color, etc.

const firstImprintChart = [
  [0, 11, 14, 17, 20, 23, 26], // 1 or more
  [0, 9, 11.5, 14, 16.5, 19, 21.5], // 3 or more
  [0, 7, 9, 11, 13, 15, 17], // 6 or more
  [0, 6, 7.8, 9.6, 11.4, 13.2, 15], // 9 or more
  [0, 5, 6.4, 7.8, 9.2, 10.6, 12], // 12 or more
  [0, 4.5, 5.7, 6.9, 8.1, 9.3, 10.5], // 18 or more
  [0, 4, 5.1, 6.2, 7.3, 8.4, 9.5], // 24 or more
  [0, 3.6, 4.6, 5.6, 6.6, 7.6, 8.6], // 36 or more
  [0, 3.3, 4.2, 5.1, 6, 6.9, 7.8], // 48 or more
  [0, 3, 3.8, 4.6, 5.4, 6.2, 7], // 60 or more
  [0, 2.75, 3.5, 4.25, 5, 5.75, 6.5], // 80 or more
  [0, 2.5, 3.2, 3.9, 4.6, 5.3, 6], // 100 or more
  [0, 2.2, 2.8, 3.4, 4, 4.6, 5.2], // 150 or more
  [0, 2, 2.55, 3.1, 3.65, 4.2, 4.75], // 200 or more
  [0, 2, 2.55, 3.1, 3.65, 4.2, 4.75], // 300 or more
  [0, 2, 2.55, 3.1, 3.65, 4.2, 4.75], // 400 or more
  [0, 2, 2.55, 3.1, 3.65, 4.2, 4.75], // 600 or more
  [0, 2, 2.55, 3.1, 3.65, 4.2, 4.75] // 800 or more
];

// this chart contains the pricing info for the second imprint

let secondImprintChart = [
  [0, 8, 11, 14, 17, 20, 23], // 1 or more
  [0, 6.5, 9, 11.5, 14, 16.5, 19], // 3 or more
  [0, 5, 7, 9, 11, 13, 15], // 6 or more
  [0, 4, 5.6, 7.2, 8.8, 10.4, 12], // 9 or more
  [0, 3, 4.2, 5.4, 6.6, 7.8, 9], // 12 or more
  [0, 2.7, 3.8, 4.9, 6, 7.1, 8.2], // 18 or more
  [0, 2.4, 3.4, 4.4, 5.4, 6.4, 7.4], // 24 or more
  [0, 2.2, 3.1, 4, 4.9, 5.8, 6.7], // 36 or more
  [0, 2, 2.8, 3.6, 4.4, 5.2, 6], // 48 or more
  [0, 1.8, 2.5, 3.2, 3.9, 4.6, 5.3], // 60 or more
  [0, 1.65, 2.3, 2.95, 3.6, 4.25, 4.9], // 80 or more
  [0, 1.5, 2.1, 2.7, 3.3, 3.9, 4.5], // 100 or more
  [0, 1.3, 1.85, 2.4, 2.95, 3.5, 4.05], // 150 or more
  [0, 1.2, 1.7, 2.2, 2.7, 3.2, 3.7], // 200 or more
  [0, 1.2, 1.7, 2.2, 2.7, 3.2, 3.7], // 300 or more
  [0, 1.2, 1.7, 2.2, 2.7, 3.2, 3.7], // 400 or more
  [0, 1.2, 1.7, 2.2, 2.7, 3.2, 3.7], // 600 or more
  [0, 1.2, 1.7, 2.2, 2.7, 3.2, 3.7] // 800 or more
];

// gets value from HTML element

function getValue(id) {
  return Number(document.getElementById(id).value);
}

// puts value into HTML element

function setValue(id, value) {
  document.getElementById(id).innerHTML = value;
}

// puts final cost into HTML element

function setFinalCost(num, index, value) {
  if (index > 17) {
    document.getElementById(`cost${num}`).innerHTML = '';
    document.getElementById(`qty${num}`).innerHTML = '';
  } else {
    // value += adjustments[data.quantity];
    value += adjustments[breaks[index]].value ? adjustments[breaks[index]].value : 0;
    document.getElementById(`cost${num}`).innerHTML = roundOff(value);
    document.getElementById(`qty${num}`).innerHTML = `${breaks[index]} or more`;
  }
}

// figures out what the quantity array index should be

function setIndex() {
  let number = 0;

  if (data.exactQty) {
    number = data.exactQty;
  } else {
    number = data.quantity;
  }

  if (number < 3) {
    return 0;
  } else if (number >= 3 && number < 6) {
    return 1;
  } else if (number >= 6 && number < 9) {
    return 2;
  } else if (number >= 9 && number < 12) {
    return 3;
  } else if (number >= 12 && number < 18) {
    return 4;
  } else if (number >= 18 && number < 24) {
    return 5;
  } else if (number >= 24 && number < 36) {
    return 6;
  } else if (number >= 36 && number < 48) {
    return 7;
  } else if (number >= 48 && number < 60) {
    return 8;
  } else if (number >= 60 && number < 80) {
    return 9;
  } else if (number >= 80 && number < 100) {
    return 10;
  } else if (number >= 100 && number < 150) {
    return 11;
  } else if (number >= 150 && number < 200) {
    return 12;
  } else if (number >= 200 && number < 300) {
    return 13;
  } else if (number >= 300 && number < 400) {
    return 14;
  } else if (number >= 400 && number < 600) {
    return 15;
  } else if (number >= 600 && number < 800) {
    return 16;
  } else if (number >= 800) {
    return 17;
  }
}

// Collects all the form data

function getAllData() {
  data.garment = getValue('garment');
  data.exGarment = getValue('exactGar');
  data.addMarkup = document.getElementById('markup').checked;
  data.quantity = getValue('quantity');
  data.exactQty = getValue('exactQty');
  data.qtyIndex = setIndex();

  if (data.exactQty) {
    data.quantity = breaks[data.qtyIndex];
    document.getElementById('quantity').selectedIndex = data.qtyIndex;
  }

  data.addition = getValue('additional');

  data.silkscreens = getValue('exactScr') || getValue('silkscreens');
  data.imprints = [];
  data.imprints.push(getValue('colors1'));
  data.imprints.push(getValue('colors2'));
  data.imprints.push(getValue('colors3'));
  data.imprints.push(getValue('colors4'));
  data.imprints.sort((a, b) => b - a);

  data.embroidery = [];
  data.embroidery.push(setStitches(getValue('emb1')));
  data.embroidery.push(setStitches(getValue('emb2')));
  data.embroidery.push(setStitches(getValue('emb3')));
  data.embroidery.push(setStitches(getValue('emb4')));

  data.heatApp = {};
  data.heatApp.preset1 = getValue('heatPresets1');
  data.heatApp.height1 = getValue('height1');
  data.heatApp.width1 = getValue('width1');
  data.heatApp.decal1 = getValue('decal1');
  data.heatApp.preset2 = getValue('heatPresets2');
  data.heatApp.height2 = getValue('height2');
  data.heatApp.width2 = getValue('width2');
  data.heatApp.decal2 = getValue('decal2');
}

// rounds a decimal up or down

function roundOff(value) {
  value = (value * 100).toFixed();
  const lastDigit = value.toString().slice(-1);
  if (lastDigit >= 4) {
    value = Math.ceil(value / 10) * 10;
  } else {
    value = Math.floor(value / 10) * 10;
  }
  value = value / 100;
  return value.toFixed(2);
}

// chart of embroidery prices

const embChart = {
  6: [2, 0.7, 0.5],
  12: [1.8, 0.6, 0.45],
  24: [1.7, 0.55, 0.45],
  48: [1.6, 0.5, 0.4],
  100: [1.5, 0.45, 0.4],
  200: [1.4, 0.4, 0.4]
};

function totalEmb(qty) {
  const amount = breaks[qty];
  let quantityEmb;

  if (amount < 12 && amount >= 6) {
    quantityEmb = 6;
  } else if (amount < 24 && amount >= 12) {
    quantityEmb = 12;
  } else if (amount < 48 && amount >= 24) {
    quantityEmb = 24;
  } else if (amount < 100 && amount >= 48) {
    quantityEmb = 48;
  } else if (amount < 200 && amount >= 100) {
    quantityEmb = 100;
  } else if (amount >= 200) {
    quantityEmb = 200;
  } else {
    quantityEmb = amount;
  }

  let totalEmbCost = 0;

  for (let item of data.embroidery) {
    if (item) {
      totalEmbCost += calcEmb(item, quantityEmb);
    }
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
    cost += chartRow[1] * 8;
    cost += chartRow[2] * (stitches - 10);
  }

  return cost;
}

// rounds up stitches to nearest thousand

function setStitches(stitches) {
  if (stitches > 250) {
    stitches = Math.ceil(stitches / 1000);
  } else {
    stitches = Math.ceil(stitches);
  }

  if (stitches < 2 && stitches !== 0) {
    stitches = 2;
  }

  return stitches;
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

  setFinalCost('1', data.qtyIndex, calcCost(data.qtyIndex));
  setFinalCost('2', data.qtyIndex + 1, calcCost(data.qtyIndex + 1));
  setFinalCost('3', data.qtyIndex + 2, calcCost(data.qtyIndex + 2));
  setFinalCost('4', data.qtyIndex + 3, calcCost(data.qtyIndex + 3));
  setFinalCost('5', data.qtyIndex + 4, calcCost(data.qtyIndex + 4));
  setFinalCost('6', data.qtyIndex + 5, calcCost(data.qtyIndex + 5));

  document.getElementById('adj1').selectedIndex = adjustments[breaks[data.qtyIndex]].index;
  document.getElementById('adj2').selectedIndex = data.qtyIndex < 17 ? adjustments[breaks[data.qtyIndex + 1]].index : 4;
  document.getElementById('adj3').selectedIndex = data.qtyIndex < 16 ? adjustments[breaks[data.qtyIndex + 2]].index : 4;
  document.getElementById('adj4').selectedIndex = data.qtyIndex < 15 ? adjustments[breaks[data.qtyIndex + 3]].index : 4;
  document.getElementById('adj5').selectedIndex = data.qtyIndex < 14 ? adjustments[breaks[data.qtyIndex + 4]].index : 4;
  document.getElementById('adj6').selectedIndex = data.qtyIndex < 13 ? adjustments[breaks[data.qtyIndex + 5]].index : 4;

  document.getElementById('adj1').setAttribute('name', breaks[data.qtyIndex]);
  document.getElementById('adj2').setAttribute('name', breaks[data.qtyIndex + 1]);
  document.getElementById('adj3').setAttribute('name', breaks[data.qtyIndex + 2]);
  document.getElementById('adj4').setAttribute('name', breaks[data.qtyIndex + 3]);
  document.getElementById('adj5').setAttribute('name', breaks[data.qtyIndex + 4]);
  document.getElementById('adj6').setAttribute('name', breaks[data.qtyIndex + 5]);
}

// calculates the price for a particular quantity and row

function calcCost(index) {
  if (index > 17) {
    return 0;
  }

  let total = data.exGarment || data.garment;

  total += data.addition;
  if (index <= 12) {
    total += data.silkscreens * silkscreenCost[index];
  }

  let loopIndex = 0;
  for (let item of data.imprints) {
    total += loopIndex === 0 ? firstImprintChart[index][item] : secondImprintChart[index][item];
    loopIndex++;
  }

  if (data.embroidery[0] || data.embroidery[1] || data.embroidery[2] || data.embroidery[3]) {
    total += totalEmb(index);
  }

  // TODO: add heat-application cost
  // TODO: make sure heat-application checks width vs height and if we can fit several on the roll

  return total;
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

// sets up change handler for adjustment selects

function adjustHandler(event) {
  adjustments[event.target.name].value = Number(event.target.value);
  adjustments[event.target.name].index = Number(event.target.selectedIndex);
}

const adjList = document.querySelectorAll('.adjust');

for (let item of adjList) {
  item.addEventListener('change', adjustHandler);
}
