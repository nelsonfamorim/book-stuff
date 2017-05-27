const router = require('express').Router();
const mongo = require('../dataAccess/mongo')

router.get('/getDocuments', (req, res)=>{
    res.send([{
                name: 'teste',
                createdAt: 'dgfd',
                type: 'PDF',
                status: 'queue'
            },{
                name: 'teste2',
                createdAt: 'dgfd',
                type: 'HTML',
                status: 'processing'
            },{
                name: 'teste3',
                createdAt: 'dgfd',
                type: 'PDF',
                status: 'ready'
            }]);
});

router.get('/convertFile', (req,res)=>{
    const type = req.query.type;
    const name = req.query.name;
    
    mongo.getConnection().collection('convertions')
        .insertOne({
            name: name,
            type: type,
            status: 'queue',
            createdAt: new Date()

        }).then((response)=>{
            res.send();
        },()=>{
            res.statusCode = 500;
            res.send();
        });


    res.send();
});

module.exports = router;