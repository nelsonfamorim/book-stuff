const client = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017/DocumentConverter';
var connection;
client.connect(url, function(err, db) {
    if(err != null){
        console.log('failed to connect to the mongo provider');
        process.exit();
    }
    console.log("Connected successfully to server");
    connection=db;
});

const getConnection = ()=>{
    return connection;
}


module.exports = {
    getConnection: getConnection
}