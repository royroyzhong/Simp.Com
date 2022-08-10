var express = require("express");
const Product = require("../models/Product");
const { productController } = require("../controllers/productController");
const authJwt = require("../middleware/authJwt");
var router = express.Router();

router.get("/seller", authJwt.verifyToken, (req, res) =>
  productController.getBySellerId(req, res)
);

router.get("/", (req, res) => productController.getAll(req, res));

router.post("/", authJwt.verifyToken, (req, res) =>
  productController.saveFromJsonString(req, res)
);

router.patch("/", authJwt.verifyToken, (req, res) =>
  productController.updateProduct(req, res)
);

router.delete("/", authJwt.verifyToken, (req, res) =>
  productController.removeProduct(req, res)
);

router.post("/addToWishlist", authJwt.verifyToken, function (req, res) {
  const productId = req.query["id"];
  let email = res.locals.user.useremail;

  Product.findById(productId, function (err, result) {
    if (err) {
      res.status(404).send(err);
    } else {
      let emailList = result.wishlistUsers;
      emailList.push(email);
      Product.findByIdAndUpdate(
        productId,
        { wishlistUsers: emailList },
        { new: true },
        function (err, newresult) {
          if (err) {
            res.status(400).send(err);
          } else {
            res.json(emailList);
          }
        }
      );
    }
  });
});

router.delete("/deleteFromWishlist", authJwt.verifyToken, function (req, res) {
  const productId = req.query["id"];
  let email = res.locals.user.useremail;

  Product.findById(productId, function (err, result) {
    if (err) {
      res.status(404).send(err);
    } else {
      let emailList = result.wishlistUsers;
      const index = emailList.indexOf(email);
      if (index > -1) {
        emailList.splice(index, 1);
      }
      Product.findByIdAndUpdate(
        productId,
        { wishlistUsers: emailList },
        { new: true },
        function (err, newresult) {
          if (err) {
            res.status(400).send(err);
          } else {
            res.json(emailList);
          }
        }
      );
    }
  });
});

router.get("/getWishlistStatus", authJwt.verifyToken, function (req, res) {
  const productId = req.query["id"];
  let email = res.locals.user.useremail;

  Product.findById(productId, function (err, result) {
    if (err) {
      res.status(404).send(err);
    } else {
      let emailList = result.wishlistUsers;
      let searchResult = emailList.includes(email);
      res.send(searchResult);
    }
  });
});

module.exports = router;
