var express = require('express');
var app = express();

app.use('/static', express.static(__dirname + '/webapp/dist'));

app.use(function(req, res){
  res.status(200).sendFile(__dirname + '/webapp/dist/index.html');
});

//  Start the server
if (module === require.main) {
    var server = app.listen(process.env.PORT || 8080, function () {
    var host = server.address().address || '0.0.0.0';
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
  });
}

module.exports = app;