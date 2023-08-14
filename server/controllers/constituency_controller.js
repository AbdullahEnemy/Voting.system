const Constituency = require("../models/constituency");

module.exports.register = async (req, res) => {
  try {
    console.log("Condition: ", !req.user && (req.user.userType !== 'admin'))
    if (req.user && (req.user.userType !== 'admin')) return res.json({ status: 403, message: "You are not allowed to perform this action"});

    const existingConstituency = await Constituency.findOne({ number: req.body.number });
    if (existingConstituency) {
      return res.json({ message: "Constituency already exists" });
    }

    await Constituency.create(req.body);

    res.status(200).json({ message: "Constituency registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: `An error occurred during constituency registeration: ${error}` });
  }
}