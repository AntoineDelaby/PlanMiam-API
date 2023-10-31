import connection from "../../App.js";
import bcrypt from "bcrypt";
import fs from "fs";
import jwt from "jsonwebtoken";
import path from "path";

export default class UserController {
  // --- QUERIES ---
  static _selectUserIdWithUsername = "SELECT id FROM user WHERE username = ?";
  static _selectUserWithId = "SELECT * FROM user WHERE id = ?";
  static _selectUserFavouriteMeals =
    "SELECT * FROM meal WHERE id IN (SELECT meal_id FROM favourite_meal WHERE user_id = ?)";

  // Récupère un identifiant à l'aide d'un nom d'utilisateur
  static async getUserId(username) {
    return new Promise(async (resolve, reject) => {
      connection.query(
        UserController._selectUserIdWithUsername,
        [username],
        (err, result) => {
          if (err) throw err;
          resolve(result);
        }
      );
    });
  }

  // Récupère les informations d'un utilisateur à l'aide d'un identifiant
  static async getUserInformation(userId) {
    return new Promise(async (resolve, reject) => {
      connection.query(
        UserController._selectUserWithId,
        [userId],
        (err, result) => {
          if (err) throw err;
          resolve(result);
        }
      );
    });
  }

  // Récupère les plats favoris d'un utilisateur
  static async getUserFavouriteMeals(userId) {
    return new Promise(async (resolve, reject) => {
      connection.query(
        UserController._selectUserFavouriteMeals,
        [userId],
        (err, result) => {
          if (err) throw err;
          resolve(result);
        }
      );
    });
  }
}
