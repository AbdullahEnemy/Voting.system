const election = require("../models/election");

module.exports.plan = async (req, res) => {
  try {
    if (authurize_user("admin", req, res)) return res;
    const ElectioninProgress = await election.find({
      electionStatus: "inProgress",
    });

    if (ElectioninProgress.length > 0) {
      return res.json({
        message: "an Election is already in Progress",
      });
    }
    if (Date.parse(req.body.startTime) > Date.parse(req.body.endTime)) {
      return res.json({
        message: "Election cannot be planned",
      });
    }
    await election.create(req.body);
    res.status(200).json({ message: "Election Planned successfully" });
  } catch (error) {
    res.status(500).json({
      error: `An error occurred during  election planning: ${error}`,
    });
  }
};
module.exports.index = async (req, res) => {
  try {
    if (authurize_user("admin", req, res)) return res;

    const elections = await election.find();
    if (!elections) {
      return res.json({ message: "No Party Registered" });
    }

    res.status(200).json(elections);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred when fetching parties: ${error}`,
    });
  }
};
module.exports.end = async (req, res) => {
  try {
    if (authurize_user(req, res)) return res;

    const updatedelection = await election.updateOne(
      { _id: req.params.id },
      {
        $set: {
          electionStatus: "Completed",
        },
      }
    );
    if (!updatedelection) {
      return res.status(400).json({ message: "Election not found" });
    }
    res.status(200).json({ message: "Election Ended successfully" });
  } catch (error) {
    res.status(500).json({
      error: `An error occurred during party updation: ${error}`,
    });
  }
};
module.exports.show = async (req, res) => {
  try {
    if (authurize_user(req, res)) return res;

    const showelection = await election.findOne({ _id: req.params.id });

    if (!showelection) {
      return res.json({ message: "No election Found" });
    }

    res.status(200).json(showelection);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred during election fetching: ${error}`,
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
