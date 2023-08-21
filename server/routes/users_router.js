const express = require("express");
const userController = require("../controllers/users_controllers");
const { userVerification } = require("../middlewares/auth_middleware");

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/", userVerification);
router.get("/voter", userVerification, userController.indexvoter);
router.get("/candidates",userVerification, userController.indexCandidate);
router.get("/allvoter", userVerification, userController.indexallVoter);
router.delete("/:id", userVerification, userController.del);
router.patch("/candidates/:id", userVerification, userController.update);
router.get("/:id", userVerification, userController.show);

module.exports = router;
