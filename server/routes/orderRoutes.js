var express = require("express");
const mongoose = require('mongoose');
var router = express.Router();
const { v4: uuid } = require('uuid');
const OrderModel = require('../models/Order')

router.get('/', function (req, res, next) {
    OrderModel.find({}, function (err, result) {
        if (err) {
            res.status(400).send('Error fetching listings!');
        } else {
            res.json(result);
        }
    })
});

router.post('/', function (req, res, next) {
    let uniqueStoreNames = [... new Set(req.body.map(product => product.soldBy))];
    for (let i in uniqueStoreNames) {
        let storeName = uniqueStoreNames[i];
        let tempArray = req.body.filter(p => p.soldBy === storeName);
        let tempSum = tempArray.reduce((accumulator, object) => {
            return accumulator + object.price
        }, 0);
        let tempProducts = [];
        for (let i = 0 ; i < tempArray.length; i++) {
            let product = tempArray[i];
            console.log(product);
            tempProducts.push({ id: product.id, name: product.productName, quantity: product.quantity});
            console.log(tempProducts);
        }
        const orderToAdd = new OrderModel({
            uuid: uuid(), store: storeName, storeEmail: "", products: tempProducts,
            status: "Unprocessed", totalPrice: tempSum
        })
        orderToAdd.save();
        i++;
    }
    OrderModel.find({}, function (err, result) {
        if (err) {
            res.status(400).send('Error fetching listings!');
        } else {
            res.json(result)
        }
    })
})

router.patch('/', function (req, res, next) {
    const filterCondition = req.query['orderid']
    OrderModel.findByIdAndUpdate(filterCondition, { status: "Shipped" })
    .then(() => {
            OrderModel.find({}, function (err, result) {
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