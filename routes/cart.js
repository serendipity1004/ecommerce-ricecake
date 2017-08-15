const express = require('express');
const router = express.Router();

//Model
const Product = require('../models/product');

router.get('/', (req, res) => {
    let cart = req.session.cart;

    if(cart){
        let keys = Object.keys(cart);

        let productQuery = {
            _id:{$in:keys}
        };

        Product.find(productQuery, (err, productResult) => {
            if(err) throw err;
            let total = 0;

            for(let index in productResult){

                let curProduct = productResult[index];
                let orderQuantity = cart[productResult[index]['_id']];


                total += (curProduct.price * orderQuantity)

                productResult[index]['orderQuantity'] = orderQuantity
            }

            res.render('./cart/cart', {
                productResult,
                total,
                css:['/cart/cart.css'],
                js:['/cart/cart.js']
            })
        })
    }else {
        res.render('./cart/cart', {
            css:['/cart/cart.css'],
            js:['/cart/cart.js']
        })
    }



});

module.exports = router;