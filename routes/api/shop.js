/**
 * Created by jc on 8/12/17.
 */
const express = require('express');
const router = express.Router();

router.post('/add', (req, res) => {

    let user = req.user;
    let prodId = req.body.prodId;
    let cart = req.session.cart;

    if(!cart){
        cart = {};
        cart[prodId] = 1;
    }else if (cart[prodId]){
        cart[prodId] += 1;
    }else{
        cart[prodId] = 1;
    }

    req.session.cart = cart;

    console.log('current cart');
    console.log(req.session.cart);

    res.json(cart)
});

module.exports = router;