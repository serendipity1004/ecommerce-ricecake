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

router.get('/detail/:id', (req, res) => {
    let prodId = req.params.id;
    console.log(prodId)

    let prodQuery = {
        _id : prodId
    };

    Product.findOne(prodQuery, (err, prodResult) => {
        if(err)throw err;

        let groupProdQuery = {
            group : prodResult.group
        };

        Product.find(groupProdQuery, (err, groupProdResult) => {
            if(err) throw err;

            res.render('./shop/detail/detail', {
                targetProduct:groupProdResult,
                groupName:groupProdResult[0].group,
                css: ['/shop/detail/detail.css'],
                js: ['/shop/detail/detail.js']
            })
        });


    })
});

module.exports = router;