const mongoose = require("mongoose");

const constituencySchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  number: {
    type: String,
    required: [true, "Constituency number is required"],
    unique: true,
  },
  district:
  {
    type: String,
    required: [true, "Constituency district is required"],
  },
  isElectionConducted: {
    type: Boolean,
    required: true,
    default: false,
  },
  electionDate: {
    type: Date,
    default: null,
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

constituencySchema.pre("save", async function (next) {
  try {
    this.id = (await mongoose.model("Constituency").countDocuments()) + 1;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Constituency", constituencySchema);