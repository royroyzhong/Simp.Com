const Product = require("../models/Product");

async function getAll() {
    return Product.find({}).exec()
}

async function getBySellerId(sellerId) {
    return Product.find({soldBy: sellerId}).exec()
}


async function saveFromJsonString(data) {
    return new Product(data).save();
}

module.exports.productController = {
    getAll: getAll,
    getBySellerId: getBySellerId,
    saveFromJsonString: saveFromJsonString
}