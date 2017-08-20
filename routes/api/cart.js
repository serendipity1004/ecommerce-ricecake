/**
 * Created by jc on 8/12/17.
 */
const express = require('express');
const router = express.Router();

const DeliveryAddresses = require('../../models/deliveryAddresses');

router.post('/update', (req, res) => {

    let cart = req.body;

    req.session.cart = cart;

    res.json(cart)
});

router.post('/remove', (req, res) => {
    let deleteItem = req.body.remove;
    let cart = req.session.cart;


    console.log(deleteItem);
    delete cart[deleteItem];

    res.json(cart)
});

router.post('/checkout/update_address', (req, res) => {
    let addressProfile = req.body.reqBody;
    let mongoPromises = [];

    console.log(addressProfile);


    for (let index in addressProfile) {

        let eachProfile = addressProfile[index];
        console.log('each profile')
        console.log(eachProfile)

        let frontendId = eachProfile.frontendId;
        let firstName = eachProfile.firstName;
        let lastName = eachProfile.lastName;
        let address = eachProfile.address;
        let postCode = eachProfile.postCode;
        let phoneNumber = eachProfile.phoneNumber;
        let userId = req.user;

        let deliveryAddress =
            {
                userId,
                firstName,
                lastName,
                address,
                postCode,
                phoneNumber
            };

        let deliveryAddressPromise = new Promise((resolve, reject) => {
            DeliveryAddresses.findOneAndUpdate({frontendId}, deliveryAddress, {upsert:true}, (err, deliveryAddressResult) => {
                if (err) throw err;

                resolve();
            })
        });

        mongoPromises.push(deliveryAddressPromise);

        Promise.all(mongoPromises).then(() => {
            let deliveryAddressQuery = {
                userId: req.user
            };

            DeliveryAddresses.find(deliveryAddressQuery, (err, deliveryAddressResult) => {
                if (err) throw err;


            })
        })
    }
});

module.exports = router;