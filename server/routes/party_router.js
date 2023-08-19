const express = require("express");
const partyController = require("../controllers/party_controller");
const { userVerification } = require("../middlewares/auth_middleware");

const router = express.Router();

router.post("/register", userVerification, partyController.register);
router.get("/", userVerification, partyController.index);
router.delete("/:id", userVerification, partyController.delete);
router.patch("/:id", userVerification, partyController.update);
router.get("/:id", userVerification, partyController.show);

module.exports = router;
