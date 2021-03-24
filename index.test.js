const { coffee_machine } = require("./coffe_machine.js");
const { ingredientsList } = require("./ingredients");
const assert = require("assert");
const { beveragesList } = require("./beverages.js");

// Test to check coffee machine
describe("Coffee machine tests", function () {
    it("should brew all the beverages if quantity is sufficient", function () {
      const cm = new coffee_machine(
        3,
        {
          tea: { sugar: 10 },
          coffee: { water: 50 },
        },
        { water: 100, sugar: 100 }
      );
      const res = cm.brew(["tea", "coffee"]);
      assert.deepStrictEqual(res, ["tea is prepared", "coffee is prepared"]);
    });
    it("should tell user if beverage cannot be brewed in case of insufficient ingredients", function () {
      const cm = new coffee_machine(
        3,
        {
          tea: { sugar: 10 },
          coffee: { water: 50 },
        },
        { water: 100, sugar: 5 }
      );
      const res = cm.brew(["tea", "coffee"]);
      assert.deepStrictEqual(res, [
        "tea cannot be prepared because sugar is/are not sufficient",
        "coffee is prepared",
      ]);
    });
    it("should tell user if beverage cannot be brewed in case of missing ingredients", function () {
      const cm = new coffee_machine(
        3,
        {
          tea: { jaggery: 10 },
          coffee: { water: 50 },
        },
        { water: 100, sugar: 5 }
      );
      const res = cm.brew(["tea", "coffee"]);
      assert.deepStrictEqual(res, [
        "tea cannot be prepared because jaggery is/are missing",
        "coffee is prepared",
      ]);
    });
    it("should inform user in case beverage is not available (in the list)", function () {
      const cm = new coffee_machine(
        3,
        {
          tea: { jaggery: 10 },
          coffee: { water: 50 },
        },
        { water: 100, sugar: 5 }
      );
      const res = cm.brew(["lemon_tea"]);
      assert.deepStrictEqual(res, ["beverage lemon_tea is not available"]);
    });
    it("mahchine should prepare beverages after adding insufficient ingredients", function () {
      const cm = new coffee_machine(
        3,
        {
          tea: { sugar: 10 },
          coffee: { water: 50 },
        },
        { water: 100, sugar: 5 }
      );
  
      let res = cm.brew(["tea"]);
      assert.deepStrictEqual(res, [
        "tea cannot be prepared because sugar is/are not sufficient",
      ]);
      cm.add_ingredients({ sugar: 100 });
      res = cm.brew(["tea"]);
      assert.deepStrictEqual(res, ["tea is prepared"]);
    });
  });
  
// Tests to check the Ingredients list
describe("Ingredients List tests", function () {
  it("ingredients availability check  should return false if ingredients not sufficient", function () {
    const cm = new ingredientsList({ sugar: 40 });
    const res = cm.check_availability({ sugar: 50 });
    assert.strictEqual(res.available, false);
  });
  it("ingredients availability check  should return true if ingredients are sufficient", function () {
    const cm = new ingredientsList({ sugar: 40 });
    const res = cm.check_availability({ sugar: 30 });
    assert.strictEqual(res.available, true);
  });
  it("ingredients availability check  should return the list of ingredients not sufficient", function () {
    const cm = new ingredientsList({ sugar: 40 });
    const res = cm.check_availability({ sugar: 50, water: 50 });
    assert.strictEqual(res.insufficientIngredients, "sugar");
  });
  it("ingredients availability check  should return false if ingredients are missing", function () {
    const cm = new ingredientsList({ sugar: 40 });
    const res = cm.check_availability({ water: 50 });
    assert.strictEqual(res.available, false);
  });
  it("ingredients availability check  should return true if ingredients are not missing", function () {
    const cm = new ingredientsList({ sugar: 40 });
    const res = cm.check_availability({ sugar: 30 });
    assert.strictEqual(res.available, true);
  });
  it("ingredients availability check  should return the list of ingredients missing", function () {
    const cm = new ingredientsList({ sugar: 40 });
    const res = cm.check_availability({ sugar: 50, water: 50 });
    assert.strictEqual(res.missingIngredients, "water");
  });
  it("Adding ingredients should update the value in case ingredient already exists", function () {
    const cm = new ingredientsList({ sugar: 40 });
    const res = cm.add_ingredients({ sugar: 50 });
    assert.strictEqual(cm.get_ingredient("sugar"), 90);
  });
  it("Adding ingredients should add the ingrdient in the list in case in doesnt already exist", function () {
    const cm = new ingredientsList({ water: 40 });
    const res = cm.add_ingredients({ sugar: 50 });
    assert.strictEqual(cm.get_ingredient("sugar"), 50);
  });
  it("fetching ingredients from the ingredients list should decrease the amount by the requested value", function () {
    const cm = new ingredientsList({ water: 40 });
    const res = cm.fetch_ingredients({ water: 10 });
    assert.strictEqual(cm.get_ingredient("water"), 30);
  });
});

// Tests to check beverages list
describe("Beverages List tests", function () {
  it("Beverage dispensible check should return false in case beverage is not in the list", function () {
    const cm = new beveragesList({ tea: { sugar: 10 } });
    const res = cm.checkIfBeverageExist("coffee");
    assert.strictEqual(res, false);
  });
  it("Beverage dispensible check should return true in case beverage is in the list", function () {
    const cm = new beveragesList({ tea: { sugar: 10 } });
    const res = cm.checkIfBeverageExist("tea");
    assert.strictEqual(res, true);
  });
  it("fetching beverage ingredients should return the ingredients", function () {
    const cm = new beveragesList({ tea: { sugar: 10 } });
    const res = cm.getIngredients("tea");
    assert.deepStrictEqual(res, { sugar: 10 });
  });
});
