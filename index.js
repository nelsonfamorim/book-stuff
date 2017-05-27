const express = require('express');
const app = express();


app.get('/', (req, res)=>{
    res.sendFile('index.html', {root: './client'});
});

app.use('/assets', express.static('./client/assets'));
app.use('/components', express.static('./client/app/components'));
app.use('/app', require('./server/routes/app'));

app.listen(8080, () => {
    console.log('Listening on port 8080');
});