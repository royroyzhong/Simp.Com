const Product = require("../models/Product");
const { v4: uuidv4 } = require('uuid');
const Seller = require("../models/Seller");
async function getAll() {
    return Product.find({}).exec()
}

function handleGet(req, res) {

    let email = res.locals.user.useremail;
    let queryResult = Seller.findOne({ email: email }).exec()

    queryResult
        .then(seller => {
            return Product.find({ soldBy: seller._id })
        })
        .then(products => {
            console.log(`[INFO] >>> Getting products: ${JSON.stringify(products)}`);
            res.json(products);
        })
        .catch(err => {
            res.status(503).send(`Expected Error ${err}`);
        })

}

function handlePut(req, res) {

    let dataStr = req.body;
    let email = res.locals.user.useremail;
    let queryResult = Seller.findOne({ email: email }).exec()

    queryResult
        .then(seller => {
            let product = new Product(dataStr);
            product.soldBy = seller._id;
            product.uuid = uuidv4();
            return product.save()
        })
        .then(_ => {
            res.send("Product saved");
        })
        .catch(err => {
            res.status(503).send(`Expected Error ${err}`);
        })

}

function handlePatch(req, res) {

    let dataStr = req.body;
    let email = res.locals.user.useremail;
    let queryResult = Seller.findOne({ email: email }).exec()
    
    queryResult
        .then(seller => {
            return Product.findOneAndUpdate({soldBy: seller, uuid: dataStr.uuid}, dataStr).exec()
        })
        .then(_ => {
            res.send("Product updated");
        })
        .catch(err => {
            res.status(503).send(`Expected Error ${err}`);
        })
}

module.exports.productController = {
    getAll: handleGet,
    getBySellerId: handleGet,
    saveFromJsonString: handlePut,
    updateProduct: handlePatch
}