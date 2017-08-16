const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    res.render('./contacts/contacts', {
        js:[
            '/vendor/mstoretheme/js/vendor/gmap3.min.js',
            'https://maps.googleapis.com/maps/api/js?key=AIzaSyA5DLwPPVAz88_k0yO2nmFe7T9k1urQs84'
        ]
    })
});

module.exports = router;