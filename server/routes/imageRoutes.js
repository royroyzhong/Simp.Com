var express = require("express");
var Image = require("../models/Image");
const authJwt = require("../middleware/authJwt");
var router = express.Router();

// Image storage is simple, so all logics are stored here
router.post("/", authJwt.verifyToken, (req, res) => {
  let data = req.body;
  let image = new Image({
    data: data.src,
  });

  image
    .save()
    .then((img) => {
      res.send(img._id.toString());
    })
    .catch((_err) => {
      res.status(503).send("Failed to add image");
    });
});

router.get("/", (req, res) => {
  let id = req.query.id;
  Image.findOne({ _id: id })
    .exec()
    .then((img) => {
      res.json(img);
    });
});

router.delete("/", authJwt.verifyToken, (req, res) => {
  let id = req.params["id"];
  Image.deleteOne({ _id: id })
    .exec()
    .then((_i) => {
      res.send("success");
    })
    .catch((_err) => {
      res.status(503).send("Failed to delete image");
    });
});

module.exports = router;
