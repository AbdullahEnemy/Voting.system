const User = require("../models/user");
const { createSecretToken } = require("../utils/secret_token");
const bcrypt = require("bcryptjs");
const Constituency = require("../models/constituency");
const party = require("../models/party");


const signup = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    const existingcandidate = await candidate.findOne({ email: req.body.email });
    if (existingUser || existingcandidate) {
      return res.json({ message: "User already exists" });
    }

    const user = await User.create(req.body);
    const token = createSecretToken(user._id);
    res.cookie("token", token,{
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
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(400).json({ message: "User not found." });
    }
    // next()
  } catch (error) {
    res.status(500).json({ error: `An error occurred during login: ${error}` });
  }
};
const indexVoter= async (req, res) => {
  try {
    if (authurize_user(req, res)) return res;

    const Users = await User.find({userType:"voter"});
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
const indexCandidate= async (req, res) => {
  try {
    if (authurize_user(req, res)) return res;

    const Users = await User.find({userType:"candidate"});
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

    const updatedUser = await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
          constituency: req.body.constituency,
          usertype: req.body.userType,
          CNIC: req.body.CNIC,
        },
      }
    );

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
const registerCandidate= async (req, res) => {
  try {
    if (authurize_user(req, res)) return res;
    const existingConstituency = await Constituency.findOne({
      number: req.body.constituencyNumber,
    });
    const existingparty = await party.findOne({
      name: req.body.party,
    });
    const existingUser = await User.findOne({
      CNIC: req.body.CNIC,
    });
    if (!existingUser) {
      return res.json({
        message: " Plz signup as a voter before applying to be a candidate",
      });
    }
    if (
      existingUser.userType == "voter" &&
      existingUser.email == req.body.email &&
      existingUser.username == req.body.name &&
      existingUser.CNIC == req.body.CNIC 
    )
    {
      return res.json({ message: "Plz check your data" });
    }
    if (req.body.party==null || req.body.constituencyNumber==null)
    {
      return res.json({ message: "Plz input complete data" });
    }
    if (!existingConstituency) {
      return res.json({ message: " No such Constituency exists" });
    }
    if (!existingparty) {
      return res.json({ message: " No such Party exists" });
    }
    if (existingUser.userType==='candidate') {
      return res.json({ message: "Candidate already exists" });
    }


    if ( existingUser && existingUser.userType==='voter') {
      const updatedUser = await User.updateOne(
        { _id: req.params.id },
        {
          $set: {
            email: req.body.email,
            username: req.body.username,
            password: existingUser.password,
            constituency: existingUser.constituency,
            CNIC: req.body.CNIC,
            userType:"candidate",
            constituencyNumber:req.body.constituencyNumber,
            party:req.body.party,
          },
        }
      );
      
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
const userController = {
  signup: signup,
  registerCandidate:registerCandidate,
  login: login,
  indexVoter: indexVoter,
  del: del,
  update: update,
  show: show,
  indexCandidate:indexCandidate,
};

module.exports = userController;
