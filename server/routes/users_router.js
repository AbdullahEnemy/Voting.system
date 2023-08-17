const express = require("express");
const userController = require("../controllers/users_controllers");
const { userVerification } = require("../middlewares/auth_middleware");


const router = express.Router();

router.post("/signup", userController.signup);
router.get("/login", userController.login);
router.post("/", userVerification);
router.get("/voter", userVerification, userController.indexVoter);
router.get("/candidate", userVerification, userController.indexCandidate);
router.delete("/:id", userVerification, userController.del);
router.patch("/:id", userVerification, userController.update);
router.get("/:id", userVerification, userController.show);
router.patch("/candidate/:id", userVerification, userController.registerCandidate);

module.exports = router;