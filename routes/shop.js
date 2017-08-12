const express = require('express');
const router = express.Router();

//Models
const Product = require('../models/product');

router.get('/', (req, res) => {

    Product.find({}, (err, result) => {
        if (err) throw err;

        let productArr = result;

        res.render('./shop/shop', {
            productArr,
            css: ['/shop/shop.css'],
            js: ['/shop/shop.js']
        })
    });
});

module.exports = router;