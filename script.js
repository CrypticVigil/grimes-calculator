// cost for single silkscreen, starting at 1 item, then 3 or more

const silkscreenCost = [12, 6, 2, 1.5, 1, 0.6, 0.4, 0.3, 0.2, 0.16, 0.125, 0.1, 0.07]; // no silkscreen fee for 200+

// array of price break quantities

const breaks = [1, 3, 6, 9, 12, 18, 24, 36, 48, 60, 80, 100, 150, 200, 300, 400, 600, 800];

// this chart contains the pricing info for the first imprint
// to edit, enter the values for each quantity starting with a 0,
// then 1-color, 2-color, etc.

const firstImprintChart = [
  [0, 10, 16, 22, 28, 34, 40], // 1 or more
  [0, 8.5, 12.5, 16.5, 20.5, 24.5, 28.5], // 3 or more
  [0, 7, 9, 11, 13, 15, 17], // 6 or more
  [0, 5.6, 7.3, 9, 10.7, 12.4, 14.1], // 9 or more
  [0, 4.2, 5.6, 7, 8.4, 9.8, 11.2], // 12 or more
  [0, 3.8, 5.1, 6.4, 7.7, 9, 10.3], // 18 or more
  [0, 3.4, 4.6, 5.8, 7, 8.2, 9.4], // 24 or more
  [0, 3, 4.1, 5.2, 6.3, 7.4, 8.5], // 36 or more
  [0, 2.7, 3.7, 4.7, 5.7, 6.7, 7.7], // 48 or more
  [0, 2.4, 3.35, 4.3, 5.25, 6.2, 7.15], // 60 or more
  [0, 2.2, 3.1, 4, 4.9, 5.8, 6.7], // 80 or more
  [0, 2, 2.85, 3.7, 4.55, 5.4, 6.25], // 100 or more
  [0, 1.8, 2.6, 3.4, 4.2, 5, 5.8], // 150 or more
  [0, 1.6, 2.35, 3.1, 3.85, 4.6, 5.35], // 200 or more
  [0, 1.45, 2.15, 2.85, 3.55, 4.25, 4.95], // 300 or more
  [0, 1.3, 1.95, 2.6, 3.25, 3.9, 4.55], // 400 or more
  [0, 1.2, 1.8, 2.4, 3, 3.6, 4.2], // 600 or more
  [0, 1.15, 1.7, 2.25, 2.8, 3.35, 3.9] // 800 or more
];

// this chart contains the pricing info for the second imprint

const secondImprintChart = [
  [0, 8, 14, 20, 26, 32, 38], // 1 or more
  [0, 6.5, 10.5, 14.5, 18.5, 22.5, 26.5], // 3 or more
  [0, 5, 7, 9, 11, 13, 15], // 6 or more
  [0, 4.2, 5.9, 7.6, 9.3, 11, 12.7], // 9 or more
  [0, 3.4, 4.8, 6.2, 7.6, 9, 10.4], // 12 or more
  [0, 3.2, 4.5, 5.8, 7.1, 8.4, 9.7], // 18 or more
  [0, 3, 4.2, 5.4, 6.6, 7.8, 9], // 24 or more
  [0, 2.8, 3.9, 5, 6.1, 7.2, 8.3], // 36 or more
  [0, 2.6, 3.6, 4.6, 5.6, 6.6, 7.6], // 48 or more
  [0, 2.4, 3.35, 4.3, 5.25, 6.2, 7.15], // 60 or more
  [0, 2.2, 3.1, 4, 4.9, 5.8, 6.7], // 80 or more
  [0, 2, 2.85, 3.7, 4.55, 5.4, 6.25], // 100 or more
  [0, 1.8, 2.6, 3.4, 4.2, 5, 5.8], // 150 or more
  [0, 1.6, 2.35, 3.1, 3.85, 4.6, 5.35], // 200 or more
  [0, 1.45, 2.15, 2.85, 3.55, 4.25, 4.95], // 300 or more
  [0, 1.3, 1.95, 2.6, 3.25, 3.9, 4.55], // 400 or more
  [0, 1.2, 1.8, 2.4, 3, 3.6, 4.2], // 600 or more
  [0, 1.15, 1.7, 2.25, 2.8, 3.35, 3.9] // 800 or more
];

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

// Collects all the form data

const data = {};

function getAllData() {
  data.garment = garmentCost();
  data.addMarkup = document.getElementById('markup').checked;
  data.quantity = getValue('quantity');
  data.exactQty = getQty();
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

  data.heatApp.app1 = false;
  data.heatApp.preset1 = getValue('heatPresets1');
  data.heatApp.height1 = getValue('height1');
  data.heatApp.width1 = getValue('width1');
  data.heatApp.decal1 = getValue('decal1');

  data.heatApp.app2 = false;
  data.heatApp.preset2 = getValue('heatPresets2');
  data.heatApp.height2 = getValue('height2');
  data.heatApp.width2 = getValue('width2');
  data.heatApp.decal2 = getValue('decal2');

  if (data.heatApp.preset1 || data.heatApp.height1 || data.heatApp.decal1) {
    data.heatApp.app1 = true;
  }
  if (data.heatApp.preset2 || data.heatApp.height2 || data.heatApp.decal2) {
    data.heatApp.app2 = true;
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

// rounds a decimal up or down

function roundOff(value, index) {
  if (index <= 13) {
    value = (value * 100).toFixed();
    const lastDigit = value.toString().slice(-1);
    if (lastDigit >= 4) {
      value = Math.ceil(value / 10) * 10;
    } else {
      value = Math.floor(value / 10) * 10;
    }
    value = value / 100;
  }

  return value.toFixed(2);
}

// checks if there's a value in the garment cost input
// if not, then it uses the value from the garment style select

function garmentCost() {
  let cost = 0;
  if (getValue('exactGar') && document.getElementById('markup').checked) {
    cost = calcMarkup(getValue('exactGar'));
  } else if (getValue('exactGar') && !document.getElementById('markup').checked) {
    cost = getValue('exactGar');
  } else {
    cost = getValue('garment');
  }
  return cost;
}

// takes a blank item cost and returns the price with markup

function calcMarkup(blank) {
  function markup(num, markup) {
    num = num * markup;
    num = (num * 100).toFixed();
    const lastDigit = num.slice(-1);
    num = Number(num);
    if (lastDigit >= 3) {
      num = Math.ceil(num / 10) * 10;
    } else {
      num = Math.floor(num / 10) * 10;
    }
    return num / 100;
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
    return markup(blank, 1.2);
  }
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

  if (amt === 1) {
    chartRow = embChart[6];
    cost = 3;
  } else if (amt === 3) {
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

// calculate how many items can fit on the roll

function checkBoth(height, width, qty) {
  let lower, perRow, perRowHeight, priceWidth, priceHeight;

  if (qty < 6) {
    priceHeight = height * 0.5;
    priceWidth = width * 0.5;

    if (width > 19) {
      document.getElementById('width').value = '';
      document.getElementById('width').placeholder = '19" or less';
    }

    if (priceHeight < priceWidth) {
      lower = priceHeight;
    } else {
      lower = priceWidth;
    }
  } else {
    if (width > 19) {
      document.getElementById('width').value = '';
      document.getElementById('width').placeholder = '19" or less';
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
  } else if (100 <= inputQty) {
    application = 1.4;
  }

  return application;
}

// retrieve or calculate the cost for the applied decal

function itemCost(qty, num) {
  let itemCost;

  if (getValue('decal' + num)) {
    itemCost = getValue('decal' + num);
  } else if (getValue('height' + num)) {
    const width = getValue('width' + num) || 18;
    const height = getValue('height' + num);
    itemCost = checkBoth(height, width, qty);
  } else {
    itemCost = getValue('heatPresets' + num);
  }
  return itemCost;
}

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

  calcTime();
}

// calculates the price for a particular quantity and row

function calcCost(index) {
  if (index > 17) {
    return 0;
  }

  let total = data.garment;

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

    let digitize = 0;

    for (let item of data.embroidery) {
      digitize += item * 4;
    }

    setValue('costDig', digitize);
  }

  if (data.heatApp.app1 && data.heatApp.app2) {
    total += appCost(breaks[index] * 2) * 2;
    total += itemCost(breaks[index], 1);
    total += itemCost(breaks[index], 2);
  } else if (data.heatApp.app1) {
    total += appCost(breaks[index]);
    total += itemCost(breaks[index], 1);
  }

  // TODO: add digitize fee and total cost

  return total;
}

// puts final cost into HTML element

function setFinalCost(num, index, value) {
  if (index > 17) {
    document.getElementById(`cost${num}`).innerHTML = '';
    document.getElementById(`qty${num}`).innerHTML = '';
  } else {
    // value += adjustments[data.quantity];
    value += adjustments[breaks[index]].value ? adjustments[breaks[index]].value : 0;
    document.getElementById(`cost${num}`).innerHTML = roundOff(value, index);
    document.getElementById(`qty${num}`).innerHTML = `${breaks[index]} or more`;
    if (num === '1') {
      calcTotal(roundOff(value, index));
    }
  }
}

// calculates a rough estimate of the time the job will take to print

function calcTime() {
  const quantity = data.exactQty || data.quantity;
  const multiply = [0, 0.75, 1.125, 1.5, 1.875, 2.25, 2.625];

  let time = 0;
  for (let item of data.imprints) {
    if (item) {
      time += quantity * multiply[item];
      time += item * 4;
    }
  }

  const hours = Math.floor(time / 60);
  let minutes = Math.floor(time % 60);

  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  setValue('time', `${hours}:${minutes}`);
}

// calculates the total cost with sales tax

function calcTotal(value) {
  const qty = data.exactQty ? data.exactQty : data.quantity;
  setValue('total', (value * qty * 1.06).toFixed(2));
}

// gets value from HTML element

function getValue(id) {
  return Number(document.getElementById(id).value);
}

// puts value into HTML element

function setValue(id, value) {
  document.getElementById(id).innerHTML = value;
}

// checks for exact quantity

function getQty() {
  const value = document.getElementById('exactQty').value;
  if (value.indexOf('+') > -1) {
    const array = value.split('+');
    const nums = array.map(item => Number(item));
    document.getElementById('exactQty').value = nums.reduce(add);
    return nums.reduce(add);
  } else {
    return Number(value);
  }
}

const add = (a, b) => a + b;

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
  calculate();
}

const adjList = document.querySelectorAll('.adjust');

for (let item of adjList) {
  item.addEventListener('change', adjustHandler);
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
