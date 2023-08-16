const express = require("express");
const candidateController = require("../controllers/candidate_controller");
const { userVerification } = require("../middlewares/auth_middleware");

const router = express.Router();
router.post("/register", userVerification, candidateController.register);
router.get("/", userVerification, candidateController.index);
router.delete("/:id", userVerification, candidateController.delete);
router.patch("/:id", userVerification, candidateController.update);
router.get("/:id", userVerification, candidateController.show);

module.exports = router;