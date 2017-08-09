const express = require('express');
const router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const passport = require('passport');

const saltRounds = 10;

//Models
const Product = require('../models/product');
const User = require('../models/user');

let uploads = multer({dest: 'public/temp'});

router.get('/', (req, res) => {


    let flash = req.flash('error').length !== 0 ? true: false;

    console.log(flash)

    res.render('./login/login', {
        error: flash,
        css: ['/login/login.css'],
        js: ['/login/login.js']
    })
});

router.post('/', uploads.fields([{name:'password'}, {name:'username'}]), passport.authenticate('local',{
    successRedirect: '/shop',
    failureRedirect: '/login',
    failureFlash: true
}));

// router.post('/', uploads.fields([{name: 'email'}, {name: 'password'}]), (req, res) => {
//     bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
//         if (err) throw err;
//
//         const password = hash;
//         const email = req.body.email;
//
//         let userQuery = {
//             email,
//             password
//         };
//
//         User.findOne(userQuery, (err, result) => {
//             if(result === undefined){
//
//             }
//         })
//     })
// });

router.post('/new', uploads.fields([{name: 'email'}, {name: 'password'}]), (req, res) => {

    User.findOne({email:req.body.email}, (err, result)=>{
        if(err) throw err;

        console.log(result)

        if(result !== null){
            res.render('./login/login', {
                failed: true,
            })
        }else {
            bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                if (err) throw err;

                const password = hash;
                const email = req.body.email;

                console.log(email)

                let user = new User({
                    email,
                    password
                });

                user.save((err, result) => {
                    if (err) throw err;

                    console.log('stored user');

                    User.findOne({_id:result._id}, (err, result) => {
                        if (err) throw err;

                        let userId = result._id;

                        console.log(userId);
                        req.login(userId, (err) => {
                            res.redirect('/')
                        });
                    });
                })
            })
        }
    });
});

passport.serializeUser(function(userId, done) {
    done(null, userId);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user._id);
    });
});

module.exports = router;