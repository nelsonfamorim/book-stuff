const router = require('express').Router();
const mongo = require('../models/mongo')
const jobRunner = require('../services/jobRunner');
const realtime = require('../services/realtime');

router.get('/getDocuments', (req, res)=>{
    mongo.getConnection()
        .collection('convertions')
        .find()
        .toArray(function(err, docs) {
            if(err){
                res.statusCode = 500;
                res.send();
            } else {
                res.send(docs);
            }

        });
});

router.get('/convertFile', (req,res)=>{
    const type = req.query.type;
    const name = req.query.name;
    const document = {
            name: name,
            type: type,
            status: 'queue',
            createdAt: new Date()

        };
    mongo.getConnection().collection('convertions')
        .insertOne(document).then((response)=>{
            res.send();
            jobRunner.queueJob(generateJob(document));
            realtime.broadcast(JSON.stringify(document));
        },()=>{
            res.statusCode = 500;
            res.send();
        });
});

function generateJob(doc){
    return {
        run :(cb)=>{
            const collection = mongo.getConnection().collection('convertions');
                collection.findOneAndUpdate({_id: doc._id}, {$set: {status:'processing'}}, {returnOriginal: false})
                .then(function(result) {

                    realtime.broadcast(JSON.stringify(result.value));
                });
            setTimeout(()=>{
                collection.findOneAndUpdate({_id: doc._id}, {$set: {status:'ready'}}, {returnOriginal: false})
                .then(function(result) {
                    realtime.broadcast(JSON.stringify(result.value));
                });
                cb();
            },doc.type == 'PDF' ? 100000 : 10000);
        },
        type: doc.type
    }
}

//populate the queues
mongo.onConnect((conn)=>{
    conn.collection('convertions')
        .find({status: {$ne: 'ready'}})
        .sort({_id: 1})
        .toArray(function(err, docs) {
            if(err)
                return;
            docs.forEach((document)=> {
                 jobRunner.queueJob(generateJob(document));
            });
        });
});

module.exports = router;