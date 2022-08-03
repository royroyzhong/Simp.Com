var express = require('express');
var Image = require('../models/Product');
const authJwt = require('../middleware/authJwt');
var router = express.Router();

// Image storage is simple, so all logics are stored here 
router.get('/', authJwt.verifyToken, (req, res) => {
    let data = JSON.parse(req.body);
    let image = new Image(data);
    image.save()
        .then(_img => {
            res.send("success");
        })
        .catch(_err => {
            res.status(503).send("Failed to add image");
        })
})

router.delete('/', authJwt.verifyToken, (req, res) => {
    let id = req.params['id'];
    Image.deleteOne({_id: id})
        .exec()
        .then(_i => {
            res.send("success")
        })
        .catch(_err => {
            res.status(503).send("Failed to delete image");
        })
})