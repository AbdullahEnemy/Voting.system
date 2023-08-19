const Vote = require("../models/vote");
const User = require("../models/user");
const Constituency = require("../models/constituency");
const party = require("../models/party");

module.exports.register = async (req, res) => {
  try {
    if (authurize_user(req, res)) return res;
    const existingVote = await Vote.findOne({
      CNIC: req.body.CNIC,
    });
    if (existingVote) {
      return res.json({ message: "Vote already exists" });
    }
    const existingUser = await User.findOne({
      CNIC: req.body.CNIC,
    });
    if (!existingUser) {
      return res.json({ message: " No such user exists" });
    }
    if (existingUser.constituency !== req.body.constituencyNumber) {
      return res.json({
        message: "You can not pool vote outside your constituency ",
      });
    }
    const existingConstituency = await Constituency.findOne({
      number: req.body.constituencyNumber,
    });
    if (!existingConstituency) {
      return res.json({ message: " No such Constituency exists" });
    }
    const existingparty = await party.findOne({
      name: req.body.party,
    });
    if (!existingparty) {
      return res.json({ message: " No such Party exists" });
    }
    const existingCandidate = await User.findOne({
      _id: req.body.candidateId,
    });
    if (!existingCandidate) {
      return res.json({ message: " No such candidate exists" });
    }
    if (existingCandidate.constituencyNumber !== req.body.constituencyNumber) {
      return res.json({
        message: "This Candidate is not standing from your constituency",
      });
    }

    await Vote.create(req.body);
    res.status(200).json({ message: "Vote registered successfully" });
  } catch (error) {
    res.status(500).json({
      error: `An error occurred during  Vote registeration: ${error}`,
    });
  }
};
module.exports.index = async (req, res) => {
  try {
    if (authurize_admin(req, res)) return res;

    const Votes = await Vote.find();
    if (!Votes) {
      return res.json({ message: "No Votes Registered" });
    }
    console.log(Votes);
    res.status(200).json(Votes);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred when fetching Votes: ${error}`,
    });
  }
};
module.exports.delete = async (req, res) => {
    try {
      if (authurize_admin(req, res)) return res;
  
      const deletedVote= await Vote.findOneAndDelete({
        _id: req.params.id,
      });
  
      if (!deletedVote) {
        return res.status(400).json({ message: "Vote not found" });
      }
  
      res.status(200).json({ message: "Vote deleted successfully" });
    } catch (error) {
      res.status(500).json({
        error: `An error occurred during Vote deletion: ${error}`,
      });
    }
  };
  module.exports.countVotes = async (req, res) => {
    try {
      if (authurize_candidate(req, res)) return res;
  
      const Votes = await Vote.count({constituency:req.user.constituencyNumber});
      if (!Votes) {
        return res.json({ message: "No Votes Registered" });
      }
      console.log(Votes);
      res.status(200).json(Votes);
    } catch (error) {
      res.status(500).json({
        error: `An error occurred when fetching Votes: ${error}`,
      });
    }
  };
  const authurize_user = (req, res) => {
    if (req.user) {
      if (req.user.userType !== "voter" && req.user.userType !== "candidate")
        return res.json({
          status: 403,
          message: "You are not allowed to perform this action",
        });
    }
  };
  const authurize_candidate = (req, res) => {
    if (req.user) {
      if (req.user.userType !== "candidate")
        return res.json({
          status: 403,
          message: "You are not allowed to perform this action",
        });
    }
  };
const authurize_admin = (req, res) => {
  if (req.user && req.user.userType !== "admin")
    return res.json({
      status: 403,
      message: "You are not allowed to perform this action",
    });
};
