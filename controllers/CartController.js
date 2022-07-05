const Cart = require("../models/CartModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.AddProToCart = async (req, res) => {
  let pro = [];
  let proId = [];
  const cartData = await Cart.findOne({ userId: req.body.userId });
  if (!cartData) {
    const data = new Cart({
      userId: req.body.userId,
      cart: req.body.cart,
    });
    await data
      .save()
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } else {
    cartData &&
      cartData.cart.map((aa) => {
        pro.push(aa.product.toString());
      });
    req.body.cart &&
      req.body.cart.map((bb) => {
        proId.push(bb.product);
      });

    console.log("pro", pro);
    console.log("proId", proId);
    const item = pro.filter((j) => j === proId[0]);
    for (i = 0; i < item.length; i++) {
      console.log(item[i], "daatatatat");
      Cart.findByIdAndUpdate(
        {
          _id: item[i],
        },
        {
          product: req.body.cart,
        }
      )
        .then((response) => {
          console.log(response, "response");
        })
        .catch((err) => {
          res.status(400).send({ message: err.message });
        });
    }
  }

  if (!alreadyCart) {
    res.send("Product not added in Cart");
  } else {
    res.send(alreadyCart);
  }
};

exports.get_Cart_data = async (req, res) => {
  try {
    const userid = req.query.userid;
    var productOfCart = [];
    if (!ObjectId.isValid(userid) && !ObjectId(userid)) {
      res.status(400).send({
        message: "product id is not valid",
      });
    }
    if (!userid) {
      res.status(400).send({
        message: "userid is required !",
      });
    } else {
      User.findById(userid).then((userinfo) => {
        if (!userinfo) {
          res.status(400).send({
            message: "user not found",
          });
        } else {
          Cart.find({ userId: userid })
            .populate({ path: "cart.product" })
            .then((cartInfo) => {
              if (cartInfo.length === 0) {
                res.status(200).send({
                  message: "No product in your cart",
                });
              } else {
                res.status(200).send({
                  message: " your cart porduct",
                  productOfCart: cartInfo,
                });
              }
            })
            .catch((error) => {
              res.status(400).send({
                message: "no cart data ",
                subError: error.message,
              });
            });
        }
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "Oops!something went wrong in get product from cart",
      subError: error.message,
    });
  }
};

// for (i = 0; i <= productAlready.products.length; i++) {
//   proId.push(productAlready.products[i]);
// }
