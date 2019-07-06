const express = require('express');
const app     = express();
const path    = require('path');
const fetch   = require('node-fetch');
const cheerio = require('cheerio')

app.set('port', (process.env.PORT || 8080));

// Status
app.get('/ping', (req, res) => {
  res.status(200).send({ status: "ok" });
});

// Inject code html
app.get('/', async (request, response) => {
  const SCRIPT_TO_ADD = 'alert("code added!");';

  const url = request.protocol + '://' + request.get('host') + request.originalUrl;
  console.log("Client request received", url)

  const fetchedResponse = await fetch(url);
  const html = await fetchedResponse.text();

  console.log("Injecting script", url);
  const loadedHtml = cheerio.load(html);
  const scriptNode = `<script>${SCRIPT_TO_ADD}</script>`;
  loadedHtml('body').append(scriptNode);

  response.send(loadedHtml.html());
});

// Modify html (insert image)
// app.get('/', async (request, response) => {
//   const IMAGE_TO_REPLACE = 'https://media.lmneuquen.com/adjuntos/195/imagenes/003/563/0003563137.jpg';

//   const url = request.protocol + '://' + request.get('host') + request.originalUrl;
//   console.log("Client request received", url)

//   const fetchedResponse = await fetch(url);
//   const html = await fetchedResponse.text();

  // console.log("Replacing image", url);
  // const regex = new RegExp('img src=".+"', 'g');
//   const replaced = html.replace(regex, `img src="${IMAGE_TO_REPLACE}"`);

//   response.send(replaced);
// });

// Inject html
// app.get('/', async (request, response) => {
//   const url = request.protocol + '://' + request.get('host') + request.originalUrl;
//   console.log("Client request received", url)

  // console.log("Replacing whole html", url);
//   response.sendFile(path.join(__dirname+'/index.html'));
// });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
