/**
 * Created by jc on 8/12/17.
 */
const express = require('express');
const router = express.Router();

router.post('/update', (req, res) => {

    let cart = req.body;

    req.session.cart = cart;

    res.json(cart)
});

router.post('/remove', (req,res) => {
    let deleteItem = req.body.remove;
    let cart = req.session.cart;


    console.log(deleteItem)
    delete cart[deleteItem];

    res.json(cart)

});

module.exports = router;