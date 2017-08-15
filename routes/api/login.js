/**
 * Created by jc on 8/13/17.
 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const User = require('../../models/user');
const bcrypt = require('bcrypt');

router.post('/new', (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    console.log(email);

    let existingUserQuery = {
        email
    };

    User.findOne(existingUserQuery, (err, userResult) => {
        if (err) throw err;

        if (userResult) {
            res.json({
                userExists: true,
                accountCreated: false
            })
        } else {
            bcrypt.hash(email, 10, (err, verificationHash) => {
                bcrypt.hash(password, 10, (err, passwordHash) => {
                    if (err)throw err;

                    let unverfieidUser = new User({
                        email,
                        password:passwordHash,
                        verificationHash
                    });

                    unverfieidUser.save((err, result) => {
                        if (err) throw err;

                        let transporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                            port: 465,
                            secure: true,
                            auth: {
                                user: 'customer.service@baraemcake.com',
                                pass: 'inscapbaby12#$'
                            }
                        });

                        let verificationUrl = `https://localhost:3000/verify-email/${verificationHash}`;

                        let mailOptions = {
                            from: '"Baraem Customer Service" <DO_NOT_REPLY@baraemcake.com>',
                            to: email,
                            subject: 'Email Verification',
                            html: '<strong>Baraem</strong>' +
                            `<p>Click this link to verify your account</p> <p>${verificationUrl}</p>`
                        };

                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) return console.log(error);

                            res.json({
                                userExists: false,
                                accountCreated: true
                            })
                        })
                    })
                });
            });
        }
    });


});

module.exports = router;