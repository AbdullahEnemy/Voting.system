const express = require("express");
const constituencyController = require("../controllers/constituency_controller");
const { userVerification } = require("../middlewares/auth_middleware");

const router = express.Router();

router.post("/register", userVerification, constituencyController.register);
router.get("/", userVerification, constituencyController.index);
router.delete("/:id", userVerification, constituencyController.delete);
router.patch("/:id", userVerification, constituencyController.update);
router.get("/:id", userVerification, constituencyController.show);


module.exports = router;
