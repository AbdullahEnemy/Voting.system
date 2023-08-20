const mongoose = require("mongoose");
const electionSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: [true, "symbol is required"],
    unique: true,
  },
  endTime: {
    type: Date,
    required: [true, "symbol is required"],
  },
  electionStatus: {
    type: String,
    enum: ["inProgress", "Completed"],
    default: "inProgress",
  },
});

module.exports = mongoose.model("election", electionSchema);
