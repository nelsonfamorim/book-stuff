const router = require('express').Router();
const options = {
    root: './client'
}

router.get('/', (req, res)=>{
    res.sendFile('index.html',options);
});

//router.use('assets', require('./assets'))

module.exports = router;