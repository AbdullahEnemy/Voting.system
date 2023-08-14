const express = require("express");
const constituencyController = require("../controllers/constituency_controller");
const { userVerification } = require("../middlewares/auth_middleware");

const router = express.Router();

router.post("/register", userVerification, constituencyController.register);

module.exports = router;