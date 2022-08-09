const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSubschema = new Schema({
  _id: String,
  name: String,
  quantity: Number,
  price: Number,
});

const orderSchema = new Schema({
  _id: {
    type: String,
    default: null,
  },
  store: String,
  products: [orderSubschema],
  sellerEmail: String,
  buyerEmail: String,
  status: String,
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now },
  lastModifiedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("order", orderSchema);
module.exports = Order;
