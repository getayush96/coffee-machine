const { ingredientsList } = require("./ingredients");
const { beveragesList } = require("./beverages");

class Machine {
  constructor(no_taps, beverages, ingredients) {
    // settitng the number of taps in the machine. taps are assumed to be constant throughout the life cycle of machine.
    this.taps = no_taps;

    // setting the beverages list to the beverages list class object
    this.beverages = new beveragesList(beverages);

    // setting the ingredients list to the ingredients list class object
    this.ingredients = new ingredientsList(ingredients);
  }

  // brew function takes in the list of beverages to be brewed and return the brewed beverages

  brew = (listOfBeverages) => {
    const output = [];
    listOfBeverages.forEach((beverage) => {
    
      const beverageExists = this.beverages.checkIfBeverageExist(beverage);  // checks if beverage exists in the menu
      if (beverageExists) {
        const ingredientsRequired = this.beverages.getIngredients(beverage);  // fetch the ingredients of the desired beverage from the beverage list
        const check = this.ingredients.check_availability(ingredientsRequired); // check the availability of the desired ingredients from the ingredients list
        if (check.available) {                                        
          this.ingredients.fetch_ingredients(ingredientsRequired);    // fetch the ingredients from the list and update the ingredients
          output.push(`${beverage} is prepared`);                     // serving the drink
        } else {
          if (check.missingIngredients.length)                        // check if there were any missing ingredients in case the beverage wasn't brewed
            output.push(
              `${beverage} cannot be prepared because ${check.missingIngredients} is/are missing`
            );
          else {
            output.push(
              `${beverage} cannot be prepared because ${check.insufficientIngredients} is/are not sufficient`
            );
          }
        }
      } else {
        output.push(`beverage ${beverage} is not available`);
      }
    });

    console.log(output);
    return output;
  };

  // function to add/refill the ingredients in the machine
  add_ingredients = (ingredients) => {
    this.ingredients.add_ingredients(ingredients);
  };
}

exports.coffee_machine = Machine;
