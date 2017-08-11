const express = require('express');
const router = express.Router();

//Models
const Product = require('../models/product');

router.get('/', (req, res) => {
    let addProduct = req.query.add;
    let cart = req.session.cart;
    let prodId = req.query.add;
    let match = false;

    console.log('add product is');
    console.log(addProduct);
    console.log(cart);

    if(!cart){
        cart = {};
        cart[prodId] = 1;
    }else if(!cart[prodId]){
        cart[prodId] = 1;
    }else{
        cart[prodId] += 1;
    }

    req.session.cart = cart;

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