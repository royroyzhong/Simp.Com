var express = require("express");
var router = express.Router();
const { v4: uuid } = require("uuid");
const OrderModel = require("../models/Order");
const authJwt = require("../middleware/authJwt");
const SellerModel = require("../models/Seller");
const ProductModel = require("../models/Product");
// For buyer get orders
router.get("/buyer", authJwt.verifyToken, function (req, res, next) {
  OrderModel.find(
    { buyerEmail: res.locals.user.useremail },
    function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.json(result);
      }
    }
  );
});

// For seller get orders
router.get("/seller", authJwt.verifyToken, function (req, res, next) {
  OrderModel.find(
    { sellerEmail: res.locals.user.useremail },
    function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        let obj = result;
        for (let each of obj) {
          for (let product of each.products) {
            delete product["_id"];
          }
        }
        res.json(result);
      }
    }
  );
});

// Only this one for buyer submit order
router.post("/", authJwt.verifyToken, async function (req, res, next) {
  // Check if any product not exist
  for (let i in req.body) {
    let product = await ProductModel.findOne({ _id: req.body[i]._id });
    if (!product) {
      return res
        .status(503)
        .send(`Product with id: ${req.body[i]._id} not found`);
    } else if (req.body[i].quantity > product.storage) {
      return res
        .status(503)
        .send(
          `Product with id: ${product._id} have only ${product.storage} in stock.`
        );
    }
  }
  // Create order
  let uniqueSellerIds = [...new Set(req.body.map((product) => product.soldBy))];
  for (let i in uniqueSellerIds) {
    let tempSellerId = uniqueSellerIds[i];
    let tempArray = req.body.filter((p) => p.soldBy === tempSellerId);
    let tempSum = tempArray.reduce((accumulator, object) => {
      return accumulator + object.price * object.quantity;
    }, 0);

    let tempProducts = [];
    for (let i = 0; i < tempArray.length; i++) {
      let product = tempArray[i];
      let productInStock = await ProductModel.findOne({ _id: product._id });
      // Decrease product storage
      await ProductModel.findOneAndUpdate(
        { _id: product._id },
        { storage: productInStock.storage - product.quantity },
        { new: true }
      );
      tempProducts.push({
        _id: product._id,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
      });
    }
    let email = res.locals.user.useremail;
    let seller = await SellerModel.findOne({ _id: tempSellerId });
    if (!seller) {
      return res.status(503).send("Seller not found:" + tempSellerId);
    } else {
      const orderToAdd = new OrderModel({
        _id: uuid(),
        store: seller.company,
        products: tempProducts,
        sellerEmail: seller.email,
        buyerEmail: email,
        status: "Unprocessed",
        totalPrice: tempSum,
      });
      orderToAdd.save();
    }
  }
  return res.json(req.body);
});

// For seller use only
router.patch("/", async function (req, res) {
  const filterCondition = req.query["orderid"];
  const type = req.query["type"];
  let order = await OrderModel.findById(filterCondition);
  if (!order) {
    return res.status(404).send("No such as order!");
  }

  if (type === "send") {
    // process order
    let updatedOrder = await OrderModel.findByIdAndUpdate(filterCondition, {
      status: "Shipped",
      lastModifiedAt: new Date(),
    });
  } else {
    //remove unprocess order
    let products = order.products;
    for (let each of products) {
      let productID = each._id;
      let quantity = each.quantity;
      let updatedProduct = await ProductModel.findOneAndUpdate(
        { _id: productID },
        { $inc: { storage: quantity } }
      );
    }
    let updatedOrder = await OrderModel.findByIdAndUpdate(
      filterCondition,
      {
        status: "Refunded",
        lastModifiedAt: new Date(),
      },
      { new: true }
    );
  }
  //find order and return array type result
  OrderModel.find({ _id: filterCondition }, function (err, result) {
    if (err) {
      res.status(400).send("Error fetching listings!");
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
