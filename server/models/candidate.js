const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Candidate name is required"],
  },
  constituencyNumber: {
    type: String,
    required: [true, "Constituency number is required"],
  },
  party :{
    type: String,
    required: [true, "party is required"],
  },
  CNIC: {
    type: String,
    required: [true, "CNIC is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Candidate", candidateSchema);
