const express = require('express');
const app     = express();
const path    = require('path');

app.set('port', (process.env.PORT || 8080));

// Status
app.get('/ping', (req, res) => {
  res.status(200).send({ status: "ok" });
});

// Everything
app.get('/', function(request, response) {
  console.log("Client request received")
  response.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
