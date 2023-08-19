const express = require("express");
const voteController = require("../controllers/vote_controller");
const { userVerification } = require("../middlewares/auth_middleware");
const router = express.Router();
router.post("/register", userVerification, voteController.register);
router.get("/", userVerification, voteController.index);
router.get("/count", userVerification, voteController.countVotes);

module.exports = router;
