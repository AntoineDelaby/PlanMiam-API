import express from "express";
import cors from "cors";
import mysql from "mysql2";
import dbconfig from "./config/dbconfig.js";

import loginRouter from "./src/routes/Login.route.js";
import mealRouter from "./src/routes/Meal.route.js";
import mealRecipeStepsRouter from "./src/routes/MealRecipeStep.route.js";
import mealIngredientRouter from "./src/routes/MealIngredient.route.js";
import userRouter from "./src/routes/User.route.js";

// --- Mise en route du serveur de l'API ---
const app = express();
const port = process.env.PORT || 3000;

// chemin vers l'API par défaut
const apiPath = "/api";

app.use(apiPath + "/login", loginRouter);
app.use(apiPath + "/meals", mealRouter);
app.use(apiPath + "/mealRecipeSteps", mealRecipeStepsRouter);
app.use(apiPath + "/mealIngredients", mealIngredientRouter);
app.use(apiPath + "/users", userRouter);

// Middleware pour parser les requêtes JSON
// Les Middleware interceptent les requêtes avant qu'elles n'arrivent sur une quelconque définition de route pour les traiter
// Sert à ne pas avoir à parser les corps de requêtes en JSON avant leur utilisation
// Renvoie directement un objet JavaScript utilisable
app.use(express.json());

app.use(cors());

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});

// --- Mise en place de la base de données ---
let connection;
try {
  connection = mysql.createConnection(dbconfig);

  connection.connect((err) => {
    if (err) {
      console.error("Erreur de connexion à la base de données :", err);
    } else {
      console.log("Connexion à la base de données réussie");
    }
  });
} catch (error) {
  console.error("Erreur lors de la connexion à la base de données :", error);
}

export default connection;
