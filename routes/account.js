const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', (req, res) => {

    let curUser = req.user;

    let curUserQuery = {
        _id:curUser
    };

    User.findOne(curUserQuery, (err, curUserResult)=>{
        if(err)throw err;

        console.log(curUserResult)

        res.render('./account/account', {
            curUser: curUserResult,
            css:['/account/account.css'],
            js:[
                '/account/account.js',
                'https://maps.googleapis.com/maps/api/js?key=AIzaSyCwcoPk4ojGTy6TINssmTtWAEzwt9zPjIE&libraries=places&callback=initAutocomplete'
            ]
        })
    });

});

module.exports = router;