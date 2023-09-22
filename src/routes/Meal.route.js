import express from "express";
import MealController from "../controllers/Meal.controller.js";

const router = express.Router();

// --- Requêtes GET ---
router.get("/meals", async (_, res) => {
  const result = await MealController.getMeals();
  res.json({ result: result });
});

// --- Requêtes POST ---

export default router;
