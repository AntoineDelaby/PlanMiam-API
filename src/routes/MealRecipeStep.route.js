import express from "express";
import MealRecipeStepController from "../controllers/MealRecipeStep.controller.js";

const router = express.Router();

// --- Requêtes GET ---
router.get("/steps/:mealId", async (req, res) => {
  const mealId = req.params.mealId;
  const result = await MealRecipeStepController.getMealRecipeSteps(mealId);
  res.json({ result: result });
});

// --- Requêtes POST ---

export default router;
