const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  userType: {
    type: String,
    enum: ['admin', 'voter', 'candidate'],
    default: 'voter',
    required: [true, "Missing required field 'userType'"],
  },
  CNIC: {
    type: String,
    required: [true, "CNIC is required"],
    unique: true,
  },
  constituency: {
    type: String,
    required: [true, "Constituency is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  try {
    this.id = await mongoose.model("User").countDocuments() + 1;
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);