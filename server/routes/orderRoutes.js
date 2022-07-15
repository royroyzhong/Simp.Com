var express = require("express");
const mongoose = require('mongoose');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
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
    console.log("here")
    let uniqueStoreNames = [... new Set(req.body.map(product => product.soldBy))];
    for (let i in uniqueStoreNames) {
        let storeName = uniqueStoreNames[i];
        let tempArray = req.body.filter(p => p.soldBy === storeName);
        let tempSum = tempArray.reduce((accumulator, object) => {
            return accumulator + object.price
        },0);
        let tempProducts = [];
        for (let i in tempArray.length) {
            let product = tempArray[i]
            tempProducts.push({id:product.id,name:product.name})
        }
        // missing quantity
        OrderModel.create({uuid: uuidv4(), store:storeName,storeEmail: "", products:{tempProducts},
        status:"Unprocessed",totalPrice:tempSum}
        )
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
    OrderModel.findByIdAndUpdate(filterCondition, {status:"Shipped"},
      function (err, docs) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      }
    })
    OrderModel.find({}, function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json(result);
      }
    })
  })

  module.exports = router;