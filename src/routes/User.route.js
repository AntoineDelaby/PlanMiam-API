import express from "express";
import UserController from "../controllers/User.controller.js";

const router = express.Router();
// On doit indiquer au router d'utiliser express.json() pour parser le corps de la requête
router.use(express.json());

// --- Requêtes GET ---
router.get("/user/:id", async (req, res) => {
  const userId = req.params.id;
  const result = await UserController.getUserInformation(userId);
  res.json({ result: result });
});

router.get("/favouriteMeals/:id", async (req, res) => {
  const userId = req.params.id;
  const result = await UserController.getUserFavouriteMeals(userId);
  res.json({ result: result });
});

// --- Requêtes POST ---

export default router;
