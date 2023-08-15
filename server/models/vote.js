const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  constituencyNumber: {
    type: String,
    required: [true, "Constituency number is required"],
  },
  party :{
    type: String,
    required: [true, "party is required"],
  },
  voterId :
  {
    type: String,
    required: [true, "voterId is required"],
    unique: true,
  },
  candidateId :
  {
    type: String,
    required: [true, "voterId is required"],
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
module.exports = mongoose.model("Vote", voteSchema);
