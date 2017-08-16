const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    res.render('./gallery/gallery', {
        js:['/vendor/mstoretheme/js/vendor/isotope.pkgd.min.js']
    })
});

module.exports = router;