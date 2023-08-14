const Constituency = require("../models/constituency");

module.exports.register = async (req, res) => {
  try {
    if (authurize_user(req, res)) return res;

    const existingConstituency = await Constituency.findOne({
      number: req.body.number,
    });
    if (existingConstituency) {
      return res.json({ message: "Constituency already exists" });
    }

    await Constituency.create(req.body);

    res.status(200).json({ message: "Constituency registered successfully" });
  } catch (error) {
    res.status(500).json({
      error: `An error occurred during constituency registeration: ${error}`,
    });
  }
};

module.exports.index = async (req, res) => {
  try {
    if (authurize_user(req, res)) return res;

    const constituencies = await Constituency.find();
    if (!constituencies) {
      return res.json({ message: "No Constituency Registered" });
    }

    res.status(200).json(constituencies);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred when fetching constituencies: ${error}`,
    });
  }
};

module.exports.delete = async (req, res) => {
  try {
    if (authurize_user(req, res)) return res;

    const deletedConstituency = await Constituency.findOneAndDelete({
      _id: req.params.id,
    });

    if (!deletedConstituency) {
      return res.status(400).json({ message: "Constituency not found" });
    }

    res.status(200).json({ message: "Constituency deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error: `An error occurred during constituency deletion: ${error}`,
    });
  }
};

module.exports.update = async (req, res) => {
  try {
    if (authurize_user(req, res)) return res;

    const constituency = await Constituency.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { district: req.body.district } }
    );

    if (!constituency) {
      return res.status(400).json({ message: "Constituency not found" });
    }

    res.status(200).json({ message: "Constituency Updated successfully" });
  } catch (error) {
    res.status(500).json({
      error: `An error occurred during constituency updation: ${error}`,
    });
  }
};

module.exports.show = async (req, res) => {
  try {
    if (authurize_user(req, res)) return res;

    const constituency = await Constituency.findOne({ _id: req.params.id });

    if (!constituency) {
      return res.json({ message: "No Constituency Found" });
    }

    res.status(200).json(constituency);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred during constituency fetching: ${error}`,
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