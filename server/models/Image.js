const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    data: String
});

const Image = mongoose.model('image', ImageSchema);

module.exports = Image;