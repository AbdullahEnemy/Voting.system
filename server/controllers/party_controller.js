const party = require("../models/party");
const User = require("../models/user");

module.exports.register = async (req, res) => {
  try {
    if (authurize_user(req, res)) return res;
    const existingParty = await party.findOne({
      name: req.body.name,
    });
    console.log(req.body);
    if (existingParty) {
      return res.json({ message: "Party already exists" });
    }

    await party.create(req.body);

    res.status(200).json({ message: "Party registered successfully" });
  } catch (error) {
    res.status(500).json({
      error: `An error occurred during  Party registeration: ${error}`,
    });
  }
};
module.exports.index = async (req, res) => {
  try {
    if (authurize_user(req, res)) return res;

    const parties = await party.find();
    if (!parties) {
      return res.json({ message: "No Party Registered" });
    }

    res.status(200).json(parties);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred when fetching parties: ${error}`,
    });
  }
};
module.exports.delete = async (req, res) => {
  try {
    if (authurize_user(req, res)) return res;

    const existingParty = await party.findOne({ _id: req.params.id });

    if (!existingParty) {
      return res.status(400).json({ message: "Party not found" });
    }

    await User.updateMany(
      { party: existingParty.name },
      {
        $set: {
          userType: "voter",
        },
      }
    );

    const deletedparty = await party.findOneAndDelete({
      _id: req.params.id,
    });

    if (!deletedparty) {
      return res.status(400).json({ message: "party not found" });
    }

    res.status(200).json({ message: "party deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error: `An error occurred during party deletion: ${error}`,
    });
  }
};
module.exports.update = async (req, res) => {
  try {
    if (authurize_user(req, res)) return res;

    const updatedParty = await party.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          symbol: req.body.symbol,
          partyLeader: req.body.partyLeader,
        },
      }
    );

    if (!updatedParty) {
      return res.status(400).json({ message: "party not found" });
    }

    res.status(200).json({ message: "party Updated successfully" });
  } catch (error) {
    res.status(500).json({
      error: `An error occurred during party updation: ${error}`,
    });
  }
};
module.exports.show = async (req, res) => {
  try {
    if (authurize_user(req, res)) return res;

    const showParty = await party.findOne({ _id: req.params.id });

    if (!showParty) {
      return res.json({ message: "No party Found" });
    }

    res.status(200).json(showParty);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred during party fetching: ${error}`,
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
