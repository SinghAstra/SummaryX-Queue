const express = require("express");
const app = express();
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
var methodOverride = require("method-override");
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");
require("dotenv").config();
require("./config/database");
require("./config/passport")(passport);

app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60,
    },
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", indexRoutes);
app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
