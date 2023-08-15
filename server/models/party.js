const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const partySchema = new mongoose.Schema({
 
  name: {
    type: String,
    required: [true, "name is required"],
    unique: true
  },
  symbol: {
    type: String,
    required: [true, "symbol is required"],
  },
  partyLeader: {
    type: String,
    required: [true, " partyLeader is required"],
    
  },
});


module.exports = mongoose.model("Party", partySchema);