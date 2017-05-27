const router = require('express').Router();
const options = {
    root: './client'
}

router.use('/conversions', require('../api/conversions'));

module.exports = router;