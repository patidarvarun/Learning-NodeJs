const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/userModel");

exports.Register = async (req, res) => {
  const { name, email, password } = req.body;

  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" });
  }
  try {
    bcrypt.hash(password, 10).then(async (hash) => {
      await User.create({
        name,
        email,
        password: hash,
      })
        .then((user) =>
          res.status(200).json({
            message: "User successfully created",
            user,
          })
        )
        .catch((error) => {
          res.status(401).json({
            message: "User not created",
            error: error.message,
          });
        });
    });
  } catch (err) {
    res.status(401).json({
      message: "User not successful created",
      error: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  // Check if email and password is provided
  if (!email || !password) {
    return res.status(400).json({
      message: "email or Password not present",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        message: "Login not successful",
        error: "User not found",
      });
    } else {
      // comparing given password with hashed password
      bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              _id: user._id,
            },
            process.env.LOGINKEY,
            {
              expiresIn: "1h",
            }
          );

          res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: token,
          });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

exports.get_User = async (req, res) => {
  await User.find()
    .then((response) => {
      res.status(200).json({
        data: response,
      });
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

exports.update_User = async (req, res) => {
  await User.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: req.body,
    }
  )
    .then((response) => {
      res.status(200).json({
        data: response,
      });
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

exports.delete_User = async (req, res) => {
  await User.deleteOne({
    _id: req.params.id,
  })
    .then((response) => {
      res.status(200).json({
        data: response,
        Message: "User Delete Successfully",
      });
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};