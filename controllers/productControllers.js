const Product = require("../models/productModel");
const multer = require("multer");
const { mongoose } = require("mongoose");

const ObjectId = mongoose.Types.ObjectId();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./uploads/`);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
exports.upload = multer({ storage: storage });

exports.Get_All_Product = async (req, res) => {
  await Product.find()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

exports.Create_Product = async (req, res) => {
  let imagePath = "";
  if (req.file) {
    imagePath = req.file.path;
  }
  const data = new Product({
    // _id: ObjectId,
    name: req.body.name,
    price: req.body.price,
    image: imagePath,
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

exports.Update_Product = async (req, res) => {
  let data = await Product.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: req.body,
    }
  )
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

exports.Delete_Product = async (req, res) => {
  let data = Product.deleteOne({
    _id: req.params.id,
  })
    .then((response) => {
      res.status(200).json({ data: response, Message: "Successful delete" });
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

exports.Searching = async (req, res) => {
  await Product.find({
    $or: [{ name: { $regex: req.params.key } }],
  })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};
