const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    uuid: {
        type: String,
        default: null
    },
    store: String,
    storeEmail: String,
    products: [{
        id: String,
        name: String,
        quantity: Number
    }],
    status: String,
    totalPrice: Number,
})

const Order = mongoose.model('order', orderSchema);
module.exports = Order;
