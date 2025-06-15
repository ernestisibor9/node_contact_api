const express = require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/userController");
const validateUser = require("../middleware/validateUser");
const validateUserLogin = require("../middleware/validateUserLogin");
const validateToken = require("../middleware/validateToken");

const router = express.Router()

router.post("/register", validateUser, registerUser);
router.post("/login", validateUserLogin, loginUser);
router.get("/current", validateToken, currentUser);

module.exports = router