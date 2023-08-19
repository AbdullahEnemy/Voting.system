const Request = require("../models/request");
const User = require("../models/user");
const Constituency = require("../models/constituency");
const party = require("../models/party");
module.exports.create = async (req, res) => {
  try {
    if (authurize_user("voter", req, res)) return res;

    const existingRequest = await Request.findOne({
      candidateEmail: req.body.candidateEmail,
    });
    const existingConstituency = await Constituency.findOne({
      number: req.body.constituencyNumber,
    });
    const existingparty = await party.findOne({
      name: req.body.party,
    });
    const existingUser = await User.findOne({
      email: req.body.candidateEmail,
    });
    console.log(existingConstituency);
    if (!existingConstituency) {
      return res.json({ message: " No such Constituency exists" });
    }
    if (!existingUser) {
      return res.json({ message: " No User exists" });
    }
    if (!existingparty) {
      return res.json({ message: " No such Party exists" });
    }
    if (existingRequest) {
      return res.json({ message: "Request already exists" });
    }

    await Request.create(req.body);
    res.status(200).json({ message: "Request registered successfully" });
  } catch (error) {
    res.status(500).json({
      error: `An error occurred during  Request registeration: ${error}`,
    });
  }
};
module.exports.index = async (req, res) => {
  try {
    if (authurize_user("admin", req, res)) return res;

    const Requests = await Request.find({ status: "pending" });
    if (!Requests) {
      return res.json({ message: "No pending Request " });
    }

    res.status(200).json(Requests);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred when fetching Requests: ${error}`,
    });
  }
};
module.exports.acceptedRequests = async (req, res) => {
  try {
    if (authurize_user("admin", req, res)) return res;

    const Requests = await Request.find({ status: "accepted" });
    if (!Requests) {
      return res.json({ message: "No accepted requests " });
    }

    res.status(200).json(Requests);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred when fetching Requests: ${error}`,
    });
  }
};
module.exports.rejectedRequests = async (req, res) => {
  try {
    if (authurize_user("admin", req, res)) return res;

    const Requests = await Request.find({ status: "rejected" });
    if (!Requests) {
      return res.json({ message: "No rejected request " });
    }

    res.status(200).json(Requests);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred when fetching Requests: ${error}`,
    });
  }
};
module.exports.approve = async (req, res) => {
  try {
    if (authurize_user("admin", req, res)) return res;
    const existingUser = await User.findOne({
      _id: req.params.id,
    });
    if (!existingUser) {
      return res.json({ message: " No User exists" });
    }
    if (existingUser.userType === "candidate") {
      return res.json({ message: "Candidate already exists" });
    }
    const approvedRequest = await Request.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: "accepted",
        },
      }
    );
    if (!approvedRequest) {
      return res.status(400).json({ message: "request not found" });
    }
    if (existingUser && existingUser.userType === "voter") {
      await User.updateOne(
        { email: req.body.candidateEmail },
        {
          $set: {
            userType: "candidate",
            constituencyNumber: req.body.constituencyNumber,
            party: req.body.party,
          },
        }
      );
    }
    res.status(200).json({ message: "Request Accepted" });
  } catch (error) {
    res.status(500).json({
      error: `An error occurred during request acceptance: ${error}`,
    });
  }
};
module.exports.reject = async (req, res) => {
  try {
    if (authurize_user("admin", req, res)) return res;
    const existingUser = await User.findOne({
      email: req.body.candidateEmail,
    });
    if (!existingUser) {
      return res.json({ message: " No User exists" });
    }
    const approvedRequest = await Request.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: "rejected",
        },
      }
    );
    if (!approvedRequest) {
      return res.status(400).json({ message: "Request not found" });
    }
    res.status(200).json({ message: "request rejected successfully" });
  } catch (error) {
    res.status(500).json({
      error: `An error occurred during request rejection: ${error}`,
    });
  }
};
module.exports.show = async (req, res) => {
  try {
    if (authurize_user("admin", req, res)) return res;

    const showRequest = await Request.findOne({ _id: req.params.id });

    if (!showRequest) {
      return res.json({ message: "No request Found" });
    }

    res.status(200).json(showParty);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred during request fetching: ${error}`,
    });
  }
};
const authurize_user = (type, req, res) => {
  if (req.user && req.user.userType !== type)
    return res.json({
      status: 403,
      message: "You are not allowed to perform this action",
    });
};
