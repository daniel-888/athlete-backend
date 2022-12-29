const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const _getUser = async (id) => {
  const user = await User.findById(id).exec();
  return user;
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await _getUser(req.user._id);
    res.send(user);
  } catch (err) {
    console.log("find user error", err);
    next(err);
  }
};

exports.registerUser = async (req, res, next) => {
  let errors = {};
  let profile, account, user;
  try {
    const { password, username, firstName, lastName } = req.body;

    user = await User.findOne({ username });
    if (user) {
      errors.username = "Username already exists";

      return res.status(400).send(errors);
    }

    user = new User({ password, username, firstName, lastName });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.send({
      success: true,
      message: "An Email sent to your account. please verify",
    });
  } catch (err) {
    if (user) await User.find({ id: user.id }).remove().exec();
    next(err);
  }
};

exports.login = (req, res, next) => {
  const { password, username } = req.body;

  User.findOne({ username: username })
    .select("+password")
    .then(async (user) => {
      if (!user) {
        return res.status(400).send({
          username: "This credential does not exist.",
        });
      }

      bcrypt
        .compare(password, user.password)
        .then(async (isMatch) => {
          if (!isMatch) {
            return res.status(400).send({
              password: "Password is incorrect.",
            });
          }

          if (!user.isActive) {
            return res.status(400).send({
              username: "Account is not active",
            });
          }

          const userData = await _getUser(user.id);
          const payload = {
            user: {
              _id: userData._id,
              username: userData.username,
              firstName: userData.firstName,
              lastName: userData.lastName,
            },
          };

          jwt.sign(
            payload,
            "Athlete",
            { expiresIn: 3600 },
            (err, serviceToken) => {
              if (err) {
                console.log("jwt sign error", err);
                next(err);
              }
              return res.json({ serviceToken, user: userData });
            }
          );
        })
        .catch((err) => {
          console.log("bcrypt compare error", err);
          next(err);
        });
    })
    .catch((err) => {
      console.log("find user error", err);
      next(err);
    });
};
