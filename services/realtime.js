const  connections = {};

function onConnection(conn){
    connections[conn.id] = conn;
    conn.on('close',()=>{
        delete connections[conn.id];
    });
}

function broadcast(msg){
    Object.keys(connections).forEach((key)=> {
        connections[key].write(msg);
    });
}

module.exports = {
    onConnection: onConnection,
    broadcast: broadcast
}