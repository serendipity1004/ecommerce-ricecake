const express = require('express');
const router = express.Router();

//Models
const Product = require('../models/product');

router.get('/', (req, res) => {
    let addProduct = req.query.add;
    let cart = req.session.cart;
    let prodId = req.query.add;
    let match = false;

    console.log('add product is')
    console.log(addProduct)
    console.log(cart)

    if (addProduct !== undefined) {
        if(cart === undefined){
            req.session.cart = [{
                prodId,
                quantity:1
            }]
        }else{
            let pass = false;
            for(let index in cart){
                let curProd = cart[index];

                if(curProd.prodId === prodId){
                    curProd.quantity += 1;
                    req.session.cart = cart;
                    pass = true;
                    break;
                }
            }
            if(!pass){
                cart.push({
                    prodId,
                    quantity:1
                })
                req.session.cart = cart;
            }
        }
    }

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