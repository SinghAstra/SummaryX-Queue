const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    req.flash("success_msg", "You are registered and can now log in");
    res.redirect("/auth/login");
  } catch (err) {
    req.flash("error_msg", "Error registering user");
    res.redirect("/auth/register");
  }
};

const loginController = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true,
});

const logOutController = async (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        throw err;
      }
      req.flash("success_msg", "You are logged out");
      res.redirect("/auth/login");
    });
  } catch (e) {
    req.flash("error_msg", "Error logging out");
  }
};

module.exports = {
  registerController,
  loginController,
  logOutController,
};
