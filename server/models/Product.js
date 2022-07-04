const mongoose = require('mongoose');
const { Schema } = mongoose;
const uuid = require('uuid');

const productSchema = new Schema({
    uuid: {
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
})