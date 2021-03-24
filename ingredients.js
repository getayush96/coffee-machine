/*
  ingredient list class holds the ingredients in the machine
  
*/

class ingredientsList {
  constructor(ingredients) {
    this.ingredients = ingredients;
  }

  // check the availability of the ingredients requested
  check_availability = (ingredients) => {
    const missingIngredients = Object.entries(ingredients) // checks for missing ingrdients
      .filter(([k, v]) => !(k in this.ingredients))
      .map((e) => e[0])
      .join(",");
    const insufficientIngredients = Object.entries(ingredients) //checks for insuficient ingredients
      .filter(([k, v]) => this.ingredients[k] < v)
      .map((e) => e[0])
      .join(",");

    // return overall availability along with the list of missing and insufficient ingredients
    return {
      available: !missingIngredients.length && !insufficientIngredients.length,
      missingIngredients,
      insufficientIngredients,
    };
  };

  // reduces the amount of the ingredients speicified from the list
  fetch_ingredients = (ingredients) => {
    Object.entries(ingredients).forEach(
      ([k, v]) => (this.ingredients[k] -= v)
    );
  };

  // add/update the ingredients specified in the list
  add_ingredients = (ingredients) => {
    Object.entries(ingredients).forEach(([k, v]) => {
      k in this.ingredients
        ? (this.ingredients[k] += v)
        : (this.ingredients[k] = v);
    });
  };
  
  //returns the ingredient quantity 
  get_ingredient = (ing) => this.ingredients[ing];
}

exports.ingredientsList = ingredientsList;
