const express = require("express");
const userController = require("../controllers/users_controllers");
const { userVerification } = require("../middlewares/auth_middleware");

const router = express.Router();

router.post("/signup", userController.signup);
router.get("/login", userController.login);
router.post("/", userVerification);

module.exports = router;