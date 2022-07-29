const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    _id: {
        type: String,
        default: null
    },
    name: String,
    descriptions: [{
        title: String, 
        content: String
    }],
    tags: [String],
    lastModifiedAt: {type: Date, default: Date.now},
    soldBy: {type: Schema.Types.ObjectId, ref: 'seller'},
    price: Number,
    storage: Number
})

const Product = mongoose.model('product', productSchema);
module.exports = Product;
