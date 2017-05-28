const client = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017/DocumentConverter';
const connectCallbacks = [];
var connection;
client.connect(url, function(err, db) {
    if(err != null){
        console.log('failed to connect to the mongo provider');
        process.exit();
    }
    console.log("Connected successfully to server");
    connection=db;

    while(connectCallbacks.length > 0){
        connectCallbacks.pop()(connection);
    }
});

function getConnection(){
    return connection;
}

function onConnect(callback){
    if(connection)
        callback(connection);
    connectCallbacks.push(callback);
}


module.exports = {
    getConnection: getConnection,
    onConnect: onConnect
}