import connection from "../../App.js";

export default class MealIngredientController {
  // --- QUERIES ---
  static _selectMealIngredientQuery =
    "SELECT * FROM meal_ingredient mi LEFT JOIN ingredient i on mi.ingredient_id = i.id WHERE mi.meal_id = ?";

  // Récupère la liste des étapes de la recette du plat dont l'id est donné
  static async getMealIngredients(mealId) {
    return new Promise(async (resolve, reject) => {
      connection.execute(
        MealIngredientController._selectMealIngredientQuery,
        [mealId],
        (err, result) => {
          if (err) throw err;
          resolve(result);
        }
      );
    });
  }
}
