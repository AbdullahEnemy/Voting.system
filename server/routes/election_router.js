const express = require("express");
const electionController = require("../controllers/election_controller");
const { userVerification } = require("../middlewares/auth_middleware");

const router = express.Router();

router.post("/plan", userVerification, electionController.plan);
router.get("/", userVerification, electionController.index);
router.patch("/:id", userVerification, electionController.end);
router.get("/:id", userVerification, electionController.show);
module.exports = router;
