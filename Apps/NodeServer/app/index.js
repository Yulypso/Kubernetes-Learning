var express = require('express');
var app = express();

app.get('/', (req, res) => {
    res.send('Node Server');
});

var server = app.listen(3000, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Node app listen at http://%s:%s', host, port);
})