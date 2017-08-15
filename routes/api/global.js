/**
 * Created by jc on 8/12/17.
 */
const express = require('express');
const router = express.Router();

router.post('/cartAmount', (req, res) => {

    let cart = req.session.cart;

    if(cart !== undefined && cart !== null){
        let noOfItems = Object.keys(cart).length;

        res.json({
            noOfItems
        })
    }else {
        res.json()
    }
});

module.exports = router;