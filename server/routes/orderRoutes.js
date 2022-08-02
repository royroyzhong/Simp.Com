var express = require("express");
var router = express.Router();
const { v4: uuid } = require('uuid');
const OrderModel = require('../models/Order');
const authJwt = require('../middleware/authJwt');
const SellerModel = require('../models/Seller');

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
            //TODO: Decrease product storage
            tempProducts.push({ _id: product.id, name: product.name, quantity: product.quantity }); 
        }
        let seller = SellerModel.find( { _id: tempSellerId } );
        let email = res.locals.user.useremail;
        const orderToAdd = new OrderModel({
            _id: uuid(), store: seller.company, products: tempProducts, sellerEmail: seller.email, buyerEmail: email, 
            status: "Unprocessed", totalPrice: tempSum
        })
        orderToAdd.save();
        i++;
    }
    res.json(req.body);
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