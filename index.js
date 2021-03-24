const { coffee_machine } = require("./coffe_machine");
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("./input.json"));

//creates a coffee machine with the inout from ./input.json file
const cm = new coffee_machine(
  data.machine.outlets.count_n,
  data.machine.beverages,
  data.machine.total_items_quantity
);

// brew the desired beverages
cm.brew(Object.keys(data.machine.beverages));
