const express = require("express");
const voteController = require("../controllers/vote_controller");
const { userVerification } = require("../middlewares/auth_middleware");

const router = express.Router();

