const User = require("../models/user");
const { createSecretToken } = require("../utils/secret_token");
const bcrypt = require("bcryptjs");

const signup = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    // console.log(req.body);

    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create(req.body);
    const token = createSecretToken(user._id);
    console.log(user);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(200).json({ message: "Signup successful" });
    next();
  } catch (error) {
    res
      .status(500)
      .json({ error: `An error occurred during signup: ${error}` });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const auth = await bcrypt.compare(req.body.password, user.password);
      if (!auth) {
        return res.status(401).json({ message: "Password is incorrect" });
      }
      const token = createSecretToken(user._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
      res
        .status(200)
        .json({ message: "Login successful", data: user, token: token });
    } else {
      res.status(400).json({ message: "User not found." });
    }
    // next()
  } catch (error) {
    res.status(500).json({ error: `An error occurred during login: ${error}` });
  }
};
const indexallVoter = async (req, res) => {
  try {
    if (authurize_user(req, res)) return res;

    const Users = await User.find({ userType: "voter" });
    if (!Users) {
      return res.json({ message: "No  Users Registered" });
    }

    res.status(200).json(Users);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred when fetching  Users : ${error}`,
    });
  }
};
const indexCandidate = async (req, res) => {
  try {
    if (authurize_user(req, res)) return res;
    const Users = await User.find({ userType: "candidate" });
    if (!Users) {
      return res.json({ message: "No  Users Registered" });
    }

    res.status(200).json(Users);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred when fetching  Users : ${error}`,
    });
  }
};
const indexvoter = async (req, res) => {
  try {
    if (authurize_candidate(req, res)) return res;
    const Users = await User.find({
      userType: "voter",
      constituency: req.user.constituencyNumber,
    });
    if (!Users) {
      return res.json({ message: "No Voter Registered in your Constituency" });
    }

    res.status(200).json(Users);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred when fetching Voters : ${error}`,
    });
  }
};
const del = async (req, res) => {
  try {
    if (authurize_user(req, res)) return res;

    const deletedUser = await User.findOneAndDelete({
      _id: req.params.id,
    });

    if (!deletedUser) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error: `An error occurred during User deletion: ${error}`,
    });
  }
};
const update = async (req, res) => {
  try {
    if (authurize_user(req, res)) return res;

    const existingUser = await User.findOne({
      _id: req.params.id,
    });
    if (!existingUser) {
      return res.json({ message: " No User exists" });
    }

    const updatedUser = await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          userType: "voter",
        },
      }
    );
    console.log(updatedUser);

    if (!updatedUser) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User Updated successfully" });
  } catch (error) {
    res.status(500).json({
      error: `An error occurred during User updation: ${error}`,
    });
  }
};

const show = async (req, res) => {
  try {
    if (authurize_user(req, res)) return res;

    const showUser = await User.findOne({ _id: req.params.id });

    if (!showUser) {
      return res.json({ message: "No User Found" });
    }

    res.status(200).json(showUser);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred during User fetching: ${error}`,
    });
  }
};
const authurize_user = (req, res) => {
  if (req.user && req.user.userType !== "admin")
    return res.json({
      status: 403,
      message: "You are not allowed to perform this action",
    });
};
const authurize_candidate = (req, res) => {
  if (req.user && req.user.userType !== "candidate")
    return res.json({
      status: 403,
      message: "You are not allowed to perform this action",
    });
};
const userController = {
  signup: signup,
  login: login,
  indexallVoter: indexallVoter,
  del: del,
  update: update,
  show: show,
  indexCandidate: indexCandidate,
  indexvoter: indexvoter,
};

module.exports = userController;
