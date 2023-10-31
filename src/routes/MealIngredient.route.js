import express from "express";
import MealIngredientController from "../controllers/MealIngredient.controller.js";

const router = express.Router();

// --- Requêtes GET ---
router.get("/ingredients/:mealId", async (req, res) => {
  const mealId = req.params.mealId;
  const result = await MealIngredientController.getMealIngredients(mealId);
  res.json({ result: result });
});

// --- Requêtes POST ---

export default router;
