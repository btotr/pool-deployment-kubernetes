var unirest         = require('unirest');
var WebSocketServer = require('ws').Server;
var express         = require('express');
var app             = express();
var server          = app.listen(2626);
var ws              = new WebSocketServer({ server : server });
var podName         = process.env.POD_NAME;
var host            = process.env.KUBERNETES_RO_SERVICE_HOST;
var port            = process.env.KUBERNETES_RO_SERVICE_PORT;

// static web server
app.use(express.static(__dirname + '/static'));

// websocket server
ws.on('connection', function(wsI) {
  wsI.send('connected: ' + podName);
  wsI.on('message', function(message) {
    // using json patch replace operator  https://tools.ietf.org/html/rfc6902#section-4.3
    if (message == "disconnect") unirest.patch('http://'+host+':'+port+'/api/v1/namespaces/default/pods/'+podName)
      .headers({'Content-type': 'application/json-patch+json'})
      .send('[{"op": "replace", "path": "/metadata/labels/state", "value": "dangling"}]')
      .end(function (response) {
        console.log(response.body);
      });
    if (message == "connect") unirest.patch('http://'+host+':'+port+'/api/v1/namespaces/default/pods/'+podName)
      .headers({'Content-type': 'application/json-patch+json'})
      .send('[{"op": "replace", "path": "/metadata/labels/state", "value": "active"}]')
      .end(function (response) {
        console.log(response.body);
      });
  });
});