const getHomePage = (req, res) => {
  res.render("index", { user: req.user });
};

const getLoginPage = (req, res) => {
  res.render("login");
};

const getRegisterPage = (req, res) => {
  res.render("register");
};

module.exports = { getHomePage, getRegisterPage, getLoginPage };
