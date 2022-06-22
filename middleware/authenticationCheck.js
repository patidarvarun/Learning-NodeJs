const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];
      jwt.verify(token, process.env.LOGINKEY); //Checking for SecretKey
      const decode = jwt.decode(token);
      const expire = decode.exp * 1000;
      if (expire < new Date().getTime()) {
        res.status(400).send({
          message: "token expired !",
        });
      } else {
        next();
      }
    } else {
      // Forbidden
      res.status(403).send({
        message: "token is required !",
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "invalid Token",
      subError: error,
    });
  }
};
