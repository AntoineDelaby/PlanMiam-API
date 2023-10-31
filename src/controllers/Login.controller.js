import connection from "../../App.js";
import bcrypt from "bcrypt";
import fs from "fs";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";
import UserController from "./User.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class LoginController {
  // --- QUERIES ---
  static _selectUserCredentials = "SELECT * FROM user WHERE username = ?";
  static _registerUser = "INSERT INTO user(username, password) VALUES(?, ?)";

  // Vérifie les identifiants d'un utilisateur
  static async login(credentials) {
    // Récupération des informations de l'utilisateur (Faire attention, ça fonctionne comme un fetchAll())
    const databaseCredentials = await new Promise(async (resolve, reject) => {
      connection.query(
        LoginController._selectUserCredentials,
        [credentials.username],
        (err, result) => {
          if (err) throw err;
          resolve(result);
        }
      );
    });

    if (databaseCredentials.length === 0) {
      return "";
    }

    // Comparaison avec credentials
    const match = await bcrypt.compare(
      credentials.password,
      databaseCredentials[0].password
    );

    if (match === true) {
      // Renvoie du token si les identifiants sont ok
      const key = fs.readFileSync(
        path.resolve(__dirname, "../../../../CONFIDENTIEL/planmiam_key"),
        "utf8"
      );
      const username = credentials.username;

      // Récupération de l'identifiant de l'utilisateur
      let userId = await UserController.getUserId(username);
      return {
        token: jwt.sign({ username }, key, { expiresIn: "365d" }),
        userId: userId[0].id,
      };
    } else {
      return {};
    }
  }

  static async register(credentials) {
    const saltRounds = 10;
    // On enregistre les nouveaux identifiants
    return new Promise(async (resolve, reject) => {
      // On hash le mot de passe
      const hash = await bcrypt.hash(credentials.password, saltRounds);

      connection.query(
        LoginController._registerUser,
        [credentials.username, hash],
        (err, result) => {
          if (err) throw err;
          resolve("Souscription effectuée !");
        }
      );
    });
  }
}
