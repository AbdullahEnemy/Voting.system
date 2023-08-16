const express = require("express");
const userController = require("../controllers/users_controllers");
const { userVerification } = require("../middlewares/auth_middleware");


const router = express.Router();

router.post("/signup", userController.signup);
router.get("/login", userController.login);
router.post("/", userVerification);
router.get("/", userVerification, userController.index);
router.delete("/:id", userVerification, userController.del);
router.patch("/:id", userVerification, userController.update);
router.get("/:id", userVerification, userController.show);

module.exports = router;