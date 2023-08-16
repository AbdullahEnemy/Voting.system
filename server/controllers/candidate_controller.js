const candidate = require("../models/candidate");
const Constituency = require("../models/constituency");
const party = require("../models/party");
const User = require("../models/user");

module.exports.register = async (req, res) => {
  try {
    if (authurize_user(req, res)) return res;

    const existingcandidate = await candidate.findOne({
      email: req.body.email,
    });
    const existingConstituency = await Constituency.findOne({
      number: req.body.constituencyNumber,
    });
    const existingparty = await party.findOne({
      name: req.body.party,
    });
    const existingUser = await User.findOne({
      CNIC: req.body.CNIC,
    });

    if (existingcandidate) {
      return res.json({ message: "Candidate already exists" });
    }
    if (!existingConstituency) {
      return res.json({ message: " No such Constituency exists" });
    }
    if (!existingparty) {
      return res.json({ message: " No such Party exists" });
    }
    if (!existingUser) {
      return res.json({
        message: " Plz signup as a voter before applying to be a candidate",
      });
    }
    if (
      existingUser.userType === "voter" &&
      existingUser.email === req.body.email &&
      existingUser.username === req.body.name
    ) {
      const deletedUser = await User.findOneAndDelete({
        CNIC: req.body.CNIC,
      });
      console.log(deletedUser);
      await candidate.create(req.body);
      res.status(200).json({ message: "Candidate registered successfully" });
    }
    else{
        return res.json({ message: "plz input your valid data" });
    }
        
  
  } catch (error) {
    res.status(500).json({
      error: `An error occurred during  Party registeration: ${error}`,
    });
  }
};
module.exports.index = async (req, res) => {
  try {
    if (authurize_user(req, res)) return res;

    const candidates = await candidate.find();
    if (!candidates) {
      return res.json({ message: "No candidate Registered" });
    }

    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred when fetching candidates: ${error}`,
    });
  }
};
module.exports.delete = async (req, res) => {
  try {
    if (authurize_user(req, res)) return res;

    const deletedcandidate = await candidate.findOneAndDelete({
      _id: req.params.id,
    });

    if (!deletedcandidate) {
      return res.status(400).json({ message: "Candidate not found" });
    }

    res.status(200).json({ message: "Candidate deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error: `An error occurred during Candidate deletion: ${error}`,
    });
  }
};
module.exports.update = async (req, res) => {
  try {
    if (authurize_user(req, res)) return res;

    const updatedCandidate = await candidate.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          party: req.body.party,
          constituencyNumber: req.body.constituencyNumber,
        },
      }
    );

    if (!updatedCandidate) {
      return res.status(400).json({ message: "Candidate not found" });
    }

    res.status(200).json({ message: "Candidate Updated successfully" });
  } catch (error) {
    res.status(500).json({
      error: `An error occurred during Candidate updation: ${error}`,
    });
  }
};
module.exports.show = async (req, res) => {
  try {
    if (authurize_user(req, res)) return res;

    const showcandidate = await candidate.findOne({ _id: req.params.id });

    if (!showcandidate) {
      return res.json({ message: "No candidate Found" });
    }

    res.status(200).json(showcandidate);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred during candidate fetching: ${error}`,
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
