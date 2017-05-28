const express = require('express');
const sockjs  = require('sockjs');
var http    = require('http');
const realtime = require('./services/realtime');

const app = express();
const server = http.createServer(app);

const sockjs_opts = {sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js"};
const sockjs_realtime = sockjs.createServer(sockjs_opts);
sockjs_realtime.on('connection', function(conn) {
    realtime.onConnection(conn);
});

sockjs_realtime.installHandlers(server, {prefix:'/realtime'});

app.get('/', (req, res)=>{
    res.sendFile('index.html', {root: './public'});
});

app.use('/assets', express.static('./public/assets'));
app.use('/components', express.static('./public/app/components'));
app.use('/api',require('./routes/api'));

server.listen(8080, '0.0.0.0');