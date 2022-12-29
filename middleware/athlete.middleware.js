const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/avatar");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "." + file.originalname.split(".")[1]);
  },
});
exports.upload = multer({ storage: storage });

const { validateAthleteCreate } = require("../validation");

exports.save = (req, res, next) => {
  console.log(req.body);
  const { errors, isValid } = validateAthleteCreate(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  next();
};
