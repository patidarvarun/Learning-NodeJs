const Cart = require("../models/CartModel");

exports.AddProToCart = async (req, res) => {
  const data = new Cart({
    userId: req.body.userId,
    productId: req.body.productId,
    quantity: req.body.quantity,
  });
  await data
    .save()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};
