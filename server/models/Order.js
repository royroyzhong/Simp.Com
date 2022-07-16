const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSubschema = new Schema({
    id: String,
    name: String,
    quantity: Number
})

const orderSchema = new Schema({
    uuid: {
        type: String,
        default: null
    },
    store: String,
    storeEmail: String,
    products: [orderSubschema],
    status: String,
    totalPrice: Number,
})

const Order = mongoose.model('order', orderSchema);
module.exports = Order;
