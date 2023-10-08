import connection from "../../App.js";

export default class MealRecipeStepController {
  // --- QUERIES ---
  static _selectMealRecipeStepsQuery =
    "SELECT * FROM meal_recipe_step WHERE meal_id = ?";

  // Récupère la liste des étapes de la recette du plat dont l'id est donné
  static async getMealRecipeSteps(mealId) {
    return new Promise(async (resolve, reject) => {
      connection.execute(
        MealRecipeStepController._selectMealRecipeStepsQuery,
        [mealId],
        (err, result) => {
          if (err) throw err;
          resolve(result);
        }
      );
    });
  }
}
