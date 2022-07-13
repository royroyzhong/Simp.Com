const Product = require("../models/Product");
const Seller = require("../models/Seller");

async function getAll() {
    return Product.find({}).exec()
}

async function getBySellerId(sellerId) {
    return Product.find({soldBy: sellerId}).exec()
}

async function saveFromJsonString(data, selleremail) {
    return Seller.findOne({email: selleremail}).then(seller => {
        
    })
    return new Product(data).save();
}

module.exports.productController = {
    getAll: getAll,
    getBySellerId: getBySellerId,
    saveFromJsonString: saveFromJsonString
}