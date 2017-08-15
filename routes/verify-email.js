/**
 * Created by jc on 8/14/17.
 */
const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/:hash', (req, res) => {
    let verificationHash = req.params.hash;
    console.log(verificationHash);

    let userQuery = {
        verificationHash
    };

    User.update(userQuery, {
        verified:true,
        verificationHash:undefined
    }, (err, result)=>{
        console.log(result)
    });

    res.render('./verify-email/verify-email', {
        css:['/verify-email/verify-email.css'],
        js:['/verify-email/verify-email.js']
    })
});

module.exports = router;