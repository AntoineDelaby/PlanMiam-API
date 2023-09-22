import connection from "../../App.js";

export default class MealController {
  // --- QUERIES ---
  static _selectMealsQuery = "SELECT * FROM meal";

  // Récupère la liste des plats présents dans la base
  static async getMeals() {
    return new Promise(async (resolve, reject) => {
      connection.query(MealController._selectMealsQuery, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
}
