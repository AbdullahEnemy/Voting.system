const User = require("../models/user");

const signup = async (req, res) => {
  try {
    await User.create(req.body);
    res.status(200).json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ error: `An error occurred during signup: ${error}` });
  }
};


const userController = {
  signup: signup,
  login: login,
}

module.exports = userController;

    
  