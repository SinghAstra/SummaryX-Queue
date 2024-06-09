const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  registerController,
  loginController,
  logOutController,
} = require("../controllers/authController");
const {
  getRegisterPage,
  getLoginPage,
} = require("../controllers/userController");
const {
  checkNotAuthenticated,
  checkAuthenticated,
} = require("../middleware/authMiddleware");

router.get("/login", checkNotAuthenticated, getLoginPage);

router.get("/register", checkNotAuthenticated, getRegisterPage);

router.post("/login", checkNotAuthenticated, loginController);

router.post("/register", checkNotAuthenticated, registerController);

router.delete("/logout", checkAuthenticated, logOutController);

module.exports = router;
