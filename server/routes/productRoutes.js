var express = require('express');
const { productController } = require('../controllers/productController');
const Product = require('../models/Product');
var router = express.Router();

router.get('/', function(req, res) {
    productController.getAll() 
        .then(products => {
            res.json(products);
        }) 
        .catch(err => {
            res.status(503).send("Unexpected Error.");
        })
});

module.exports = router;