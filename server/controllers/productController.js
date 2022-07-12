const Product = require("../models/Product");

async function getAll() {
    return Product.find({}).exec()
}

module.exports.productController = {
    getAll: getAll
}