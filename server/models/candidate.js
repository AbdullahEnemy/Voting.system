const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
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
