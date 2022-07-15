var express = require('express');
const { productController } = require('../controllers/productController');
const authJwt = require('../middleware/authJwt');
const Product = require('../models/Product');
var router = express.Router();

router.get('/', authJwt.verifyToken, (req, res) => productController.getBySellerId(req, res))

router.post('/', authJwt.verifyToken, (req, res) => productController.saveFromJsonString(req, res));

router.patch('/', authJwt.verifyToken, (req, res) => productController.updateProduct(req, res));


module.exports = router;