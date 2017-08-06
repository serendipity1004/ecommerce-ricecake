const express = require('express');
const router = express.Router();

//Models
const Product = require('../models/product');

router.get('/', (req, res) => {
    Product.find({}, (err, result) => {
        if (err) throw err;

        console.log('found from datatbase');
        console.log(result)

        let productArr = result;

        res.render('./shop/shop', {
            productArr
        })
    });


});

module.exports = router;