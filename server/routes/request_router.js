const express = require("express");
const requestController = require("../controllers/request_controller");
const { userVerification } = require("../middlewares/auth_middleware");

const router = express.Router();

router.post("/create", userVerification, requestController.create);
router.get("/", userVerification, requestController.index);
router.get("/approved", userVerification, requestController.acceptedRequests);
router.get("/rejected", userVerification, requestController.rejectedRequests);
router.patch("/approve/:id/", userVerification, requestController.approve);
router.patch("/:id/reject", userVerification, requestController.reject);
router.get("/:id", userVerification, requestController.show);

module.exports = router;
