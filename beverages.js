/*
  Beverages list class holds the list of available beverages in the menu
*/

class beveragesList {
  constructor(beverages) {
    this.beverages = beverages;
  }

  // function to check if beverage exists in the menu 
  checkIfBeverageExist = (beverage) => beverage in this.beverages;

  //function to get the ingredients of the specified beverage
  getIngredients = (beverage) =>
    beverage in this.beverages ? this.beverages[beverage] : null;
}

exports.beveragesList = beveragesList;
