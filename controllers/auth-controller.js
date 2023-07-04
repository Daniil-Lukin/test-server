const User = require("../models/user-model");
const { validationResult } = require("express-validator");
const userService = require("../services/user-service");

class AuthController {
  async registration(req, res) {
    try {
      const { email, password } = req.body;
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        throw new Error(`Auth error`);
      }
      const userData = await userService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: e.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: e.message });
    }
  }

  async logout(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.status(200).json();
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

  async refresh(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      res.json({ message: e.message });
    }
  }

  async delete(req, res) {
    try {
      const { email } = req.body;
      const deletedUserData = await userService.deleteUser(email);
      res.clearCookie("refreshToken");
      res.status(200).json({ message: deletedUserData });
    } catch (e) {
      res.json({ message: e.message });
    }
  }
}

module.exports = new AuthController();
