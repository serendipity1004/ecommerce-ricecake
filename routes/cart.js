const express = require('express');
const router = express.Router();

//Model
const Product = require('../models/product');

router.get('/', (req, res) => {
    let sessionCart = req.session.cart;
    let nameArray = [];

    for(let index in sessionCart){
        let curProd = sessionCart[index];

        nameArray.push(curProd.prodId)
    }

    let productQuery = {
        _id: {$in: nameArray}
    };

    console.log(nameArray)

    Product.find(productQuery, (err, productResult)=>{
        console.log('mongo caling')
        console.log(productResult)
        for(let prodIndex in productResult){
            let curProduct = productResult[prodIndex];
            for(let cartIndex in sessionCart){
                let curCartProd = sessionCart[cartIndex];

                curProduct['quantity'] = curCartProd.quantity;
                productResult[prodIndex] = curProduct;
            }
        }

        console.log(productResult);

        res.render('./cart/cart', {
            productResult,
        })
    });
});

module.exports = router;