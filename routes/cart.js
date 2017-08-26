const express = require('express');
const router = express.Router();

//Model
const Product = require('../models/product');

router.use((req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
});

router.get('/', (req, res) => {
    let cart = req.session.cart;

    if (cart) {
        let keys = Object.keys(cart);

        let productQuery = {
            _id: {$in: keys}
        };

        Product.find(productQuery, (err, productResult) => {
            if (err) throw err;
            let total = 0;

            for (let index in productResult) {

                let curProduct = productResult[index];
                let orderQuantity = cart[productResult[index]['_id']];

                total += (curProduct.price * orderQuantity);

                productResult[index]['orderQuantity'] = orderQuantity
            }

            res.render('./cart/cart', {
                productResult,
                total,
                cartCount:productResult.length,
                css: ['/cart/cart.css'],
                js: ['/cart/cart.js']
            })
        })
    } else {
        res.render('./cart/cart', {
            cartCount: 0,
            css: ['/cart/cart.css'],
            js: ['/cart/cart.js']
        })
    }
});

router.get('/checkout', (req, res) => {

    let cart = req.session.cart;

    let products = Object.keys(cart);
    let productQuery = {
        _id:
            {
                $in:products
            }
    };

    Product.find(productQuery, (err, productsResult)=>{
        if(err) throw err;
        let prodNameIdPair = {};

        let priceSum = productsResult.reduce((sum, value)=>{
            return sum += value.price * cart[value._id]
        }, 0);

        for(let index in productsResult){
            productsResult[index]['quantity'] = cart[productsResult[index]['_id']];
            prodNameIdPair[productsResult[index]._id] = productsResult[index].name;
        }

        res.render('./cart/checkout/checkout', {
            productsInCart: productsResult,
            priceToPay:priceSum,
            prodNameIdPair: encodeURIComponent(JSON.stringify(prodNameIdPair)),
            cart: encodeURIComponent(JSON.stringify(cart)),
            css: ['/cart/checkout/checkout.css'],
            js:
                [
                    '/cart/checkout/checkout.js',
                    'https://service.iamport.kr/js/iamport.payment-1.1.2.js'
                ]
        })
    });
});

module.exports = router;