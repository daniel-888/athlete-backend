const Sport = require("../models/Sport");
const Athlete = require("../models/Athlete");

exports.getSports = async (req, res, next) => {
  try {
    const sports = await Sport.find({}).exec();
    res.send(sports);
  } catch (err) {
    next(err);
  }
};

exports.save = async (req, res, next) => {
  try {
    const athlete = await Athlete.create({
      ...req.body,
      creator: req.user._id,
      // avatar: req.file.filename
    });
    res.send(athlete);
  } catch (err) {
    next(err);
  }
};

exports.getList = async (req, res, next) => {
  try {
    const athletes = await Athlete.find({ creator: req.user._id }).exec();
    res.send(athletes);
  } catch (err) {
    next(err);
  }
};
