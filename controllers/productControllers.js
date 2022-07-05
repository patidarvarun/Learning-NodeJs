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
    description: req.body.description,
    image: imagePath,
    quantity: req.body.quantity,
    cat_id: req.body.cat_id,
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

exports.pagination = async (req, res) => {
  var skip = (parseInt(req.params.page) - 1) * 5;
  if (req.params.page) {
    await Product.find()
      .skip(skip)
      .limit(5)
      // .sort({ createdAt: -1 })  its show latest product
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } else {
    await Product.find()
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  }
};
exports.get_Product_by_Category = async (req, res) => {
  let id = req.params.id;
  await Product.find({ cat_id: id })
    .populate("cat_id")
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};
