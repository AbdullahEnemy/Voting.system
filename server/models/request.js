const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  candidateName: {
    type: String,
    required: [false, "name is required"],
  },
  candidateEmail: {
    type: String,
    required: [true, "name is required"],
    unique: true,
  },
  constituencyNumber: {
    type: String,
    required: [true, "Symbol is required"],
  },
  party: {
    type: String,
    required: [true, "Party is required"],
  },
  votingSymbol: {
    type: String,
    required: [true, "Voting symbol is required"],
    unique: false,
  },
  status: {
    type: String,
    enum: ["pending", "rejected", "accepted"],
    default: "pending",
  },
});

module.exports = mongoose.model("Request", requestSchema);
