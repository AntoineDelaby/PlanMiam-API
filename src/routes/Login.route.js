import express from "express";
import LoginController from "../controllers/Login.controller.js";

const router = express.Router();
// On doit indiquer au router d'utiliser express.json() pour parser le corps de la requête
router.use(express.json());

// --- Requêtes GET ---

// --- Requêtes POST ---
router.post("/login", async (req, res) => {
  const credentials = req.body;
  const result = await LoginController.login(credentials);
  if (result != null) {
    res.json({ result: result });
  }
});

router.post("/register", async (req, res) => {
  const credentials = req.body;
  const result = await LoginController.register(credentials);
  if (result != null) {
    res.json({ result: result });
  }
});

export default router;
