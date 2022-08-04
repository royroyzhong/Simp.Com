var express = require("express");
var router = express.Router();
const { v4: uuid } = require('uuid');
const OrderModel = require('../models/Order');
const authJwt = require('../middleware/authJwt');
const SellerModel = require('../models/Seller');
const ProductModel = require('../models/Product');

// For buyer get orders
router.get('/buyer', authJwt.verifyToken, function (req, res, next) {
    OrderModel.find({ buyerEmail: res.locals.user.useremail }, function (err, result) {
        if (err) {
            res.status(400).send('Error fetching listings!');
        } else {
            res.json(result);
        }
    })
});

// For seller get orders
router.get('/seller', authJwt.verifyToken, function (req, res, next) {
    OrderModel.find({ sellerEmail: res.locals.user.useremail }, function (err, result) {
        if (err) {
            res.status(400).send('Error fetching listings!');
        } else {
            res.json(result);
        }
    })
});

// Only this one for buyer submit order
router.post('/', authJwt.verifyToken, function (req, res, next) {
    // Check if any product not exist
    var allPromise = [];
    for (let i in req.body) {
        let product = req.body[i];
        allPromise.push(ProductModel.findOne({ _id: product._id }));
    }
    Promise.all(allPromise).then((allProducts) => {
        // check if any product out of stock
        for (let i in req.body) {
            let productInStock = allProducts.find(p => p._id == req.body[i]._id);
            if (req.body[i].quantity > productInStock.storage) {
                return res.status(503).send(`Product with id: ${productInStock._id} have only ${productInStock.storage} in stock.`);
            }
        }
        
        // Create order
        let uniqueSellerIds = [... new Set(req.body.map(product => product.soldBy))];
        for (let i in uniqueSellerIds) {
            let tempSellerId = uniqueSellerIds[i];
            let tempArray = req.body.filter(p => p.soldBy === tempSellerId);
            let tempSum = tempArray.reduce((accumulator, object) => {
                return accumulator + object.price
            }, 0);
            let tempProducts = [];
            for (let i = 0 ; i < tempArray.length; i++) {
                let product = tempArray[i];
                let productInStock = allProducts.find(p => p._id == product._id);
                // Decrease product storage
                ProductModel.findOneAndUpdate( {_id: product._id}, {storage: productInStock.storage-product.quantity });
                tempProducts.push({ _id: product._id, name: product.name, quantity: product.quantity });
            }
            let seller = SellerModel.find( { _id: tempSellerId } );
            let email = res.locals.user.useremail;
            const orderToAdd = new OrderModel({
                _id: uuid(), store: seller.company, products: tempProducts, sellerEmail: seller.email, buyerEmail: email, 
                status: "Unprocessed", totalPrice: tempSum
            });
            orderToAdd.save();
        }
        return res.json(req.body);
    }).catch((err) => {
        return res.status(503).send(err);
    })
});

// For seller use only
router.patch('/', function (req, res, next) {
    const filterCondition = req.query['orderid']
    OrderModel.findByIdAndUpdate(filterCondition, { status: "Shipped" })
    .then(() => {
            OrderModel.find({ _id: filterCondition }, function (err, result) {
                if (err) {
                    res.status(400).send('Error fetching listings!');
                } else {
                    console.log(JSON.stringify(result))
                    res.json(result);
                }
            })
        })
})

module.exports = router;