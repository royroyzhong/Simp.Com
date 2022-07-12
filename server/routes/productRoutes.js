var express = require('express');
const { productController } = require('../controllers/productController');
const authJwt = require('../middleware/authJwt');
const Product = require('../models/Product');
var router = express.Router();

router.get('/', function (req, res) {

    let sellerId = req.query.sellerId;
    let queryResult = null;

    if (sellerId === null || sellerId === undefined)
        queryResult = productController.getAll()
    else
        queryResult = productController.getBySellerId(sellerId)

    queryResult
        .then(products => {
            res.json(products);
        })
        .catch(err => {
            res.status(503).send("Unexpected Error.");
        })

});

router.post('/', authJwt.verifyToken, function (req, res) {

    let dataStr = req.body;
    let c = req.cookies;
    let queryResult = productController.saveFromJsonString(dataStr);

    queryResult
        .then(products => {
            console.log(">>>>>>>>>>>>>>>>>.Still Running");
            res.send("Product saved");
        })
        .catch(err => {
            console.error(err)
            res.status(503).send("Unexpected Error.");
        })
})


module.exports = router;