const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
// const transporter = require("../config/emailConfig");

exports.Register = async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" });
  }
  try {
    bcrypt.hash(password, 10).then(async (hash) => {
      await User.create({
        name,
        email,
        phone,
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
        if (!result) {
          return res.status(400).json({
            message: "password is incorrect",
          });
        }
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
            phone: user.phone,
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

exports.sendUserResetPassword = async (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,

    auth: { user: "example2655@gmail.com", pass: "Asus231#" },
  });

  User.findOne({ email: req.body.email }).then((user) => {
    const secret = user._id + process.env.LOGINKEY;
    const token = jwt.sign({ userID: user._id }, secret, {
      expiresIn: "15m",
    });
    if (!user) {
      return res
        .status(422)
        .json({ error: "User dont exists with that email" });
    }
    user.resetToken = token;
    user.expireToken = Date.now() + 3600000;
    const link = `http://localhost:5000/api/reset/${user._id}/${token}`;
    console.log("link", link);
    user.save().then((result) => {
      transporter.sendMail({
        to: user.email,
        from: "example2655@gmail.com",
        subject: "password reset",
        html: `
                    <p>You requested for password reset</p>
                    <h5>click in this <a href=${link}>link</a> to reset password</h5>
                    `,
      });
      res.json({ message: "check your email", token });
    });
  });
};

// const sendMail = async (user, link) => {
//   console.log(
//     "!!!!!!!!!!!!!hello",
//     process.env.EMAIL_FROM,
//     "ebbbb",
//     user.email,
//     "link",
//     link
//   );
//   await transporter.sendMail({
//     from: process.env.EMAIL_FROM, // sender address
//     to: user.email, // list of receivers
//     subject: "Password Reset Link", // Subject line
//     html: `<a href=${link}>Click Here</a> to Reset Your Password`, // html body
//   });
// };

// const { email } = req.body;
// if (email) {
//   const user = await User.findOne({ email: email });
//   // console.log("22222", user.email);
//   if (user) {
//     const secret = user._id + process.env.LOGINKEY;
//     const token = jwt.sign({ userID: user._id }, secret, {
//       expiresIn: "15m",
//     });
//     const link = `http://localhost:5000/api/reset/${user._id}/${token}`;
//     console.log("link", link);
//     // console.log("1111", process.env.EMAIL_FROM);
//     // let info = await transporter.sendMail({
//     //   from: process.env.EMAIL_FROM, // sender address
//     //   to: user.email, // list of receivers
//     //   subject: "Password Reset Link", // Subject line
//     //   html: `<a href=${link}>Click Here</a> to Reset Your Password`, // html body
//     // });
//     sendMail(user, link).then((info) => {
//       console.log("info", info);
//       res.send({
//         status: "Success",
//         message: "Password Reset Email Sent...  Please Check Your Email",
//         info: info,
//       });
//     });
//   } else {
//     res.send({ status: "failed", message: "Email doesn't exists" });
//   }
// } else {
//   res.status(400).send({ message: err.message });
// }
// };

exports.userPasswordReset = async (req, res) => {
  const { password, con_password } = req.body;
  const { id, token } = req.params;
  const user = await User.findById(id);
  const new_secret = user._id + process.env.LOGINKEY;
  try {
    jwt.verify(token, new_secret);
    if (password && con_password) {
      if (password !== con_password) {
        res.send({
          status: "failed",
          message: "Password and Confirm password doesn't match",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const newHashPAssword = await bcrypt.hash(password, salt);
        await User.findByIdAndUpdate(user._id, {
          $set: { password: newHashPAssword },
        });
        res.send({ status: "success", message: "Password reset successfully" });
      }
    } else {
      res.send({ status: "failed", message: "All fields are required" });
    }
  } catch (error) {
    console.log("error", error);
  }
};
