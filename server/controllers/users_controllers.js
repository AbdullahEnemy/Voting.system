const User = require("../models/user");
const bcrypt = require("bcryptjs");
const signup = async (req, res) => {
  try {
    await User.create(req.body);
    res.status(200).json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ error: `An error occurred during signup: ${error}` });
  }
};
const login = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const auth = await bcrypt.compare(req.body.password, user.password)
        if (!auth) {
          return res.status(401).json({ message: "Password is incorrect" });
        }
        res.status(200).json({ message: "Login successful", user:user });
      } else {
        res.status(400).json({ message: "User not found." });
      }
    } catch (error) {
      res.status(500).json({ error: `An error occurred during login: ${error}` });
    }
  };
  

const userController = {
  signup: signup,
  login: login,
}

module.exports = userController;

    
  