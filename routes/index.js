const express = require("express");
const router = express.Router();
const { getHomePage } = require("../controllers/userController");
const { checkAuthenticated } = require("../middleware/authMiddleware");

router.get("/", checkAuthenticated, getHomePage);

module.exports = router;
