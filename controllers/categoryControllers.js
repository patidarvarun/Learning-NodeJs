const Category = require("../models/categoryModel");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./uploads/`);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
exports.upload = multer({ storage: storage });

exports.create_Category = async (req, res) => {
  let imagePath = "";
  if (req.file) {
    imagePath = req.file.path;
  }
  const catSave = new Category({
    name: req.body.name,
    image: imagePath,
  });
  await catSave
    .save()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

exports.get_Category = async (req, res) => {
  await Category.find()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

exports.update_Category = async (req, res) => {
  await Category.updateOne(
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

exports.delete_Category = async (req, res) => {
  await Category.deleteOne({
    _id: req.params.id,
  })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};
