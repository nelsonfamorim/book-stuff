const router = require('express').Router();
const options = {
    root: './client'
}

router.get('/', (req, res)=>{
    res.sendFile('index.html',options);
});

module.exports = router;