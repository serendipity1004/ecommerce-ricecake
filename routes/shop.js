const express = require('express');
const router = express.Router();

//Models
const Product = require('../models/product');

router.get('/', (req, res) => {
    let addProduct = req.query.add;
    let cart = req.session.cart;

    if(addProduct){
        if (!cart){
            cart = [];
        }

    }else {
        Product.find({}, (err, result) => {
            if (err) throw err;

            console.log('found from datatbase');
            console.log(result);

            let productArr = result;

            res.render('./shop/shop', {
                productArr,
                css:['/shop/shop.css'],
                js:['/shop/shop.js']
            })
        });
    }
});

module.exports = router;