const router = require('express').Router();

router.use('/conversions', require('./conversions'));

module.exports = router;