// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", function(req, res){
  let date = req.params.date;
  let unixDate = +date;
  const dateFormatted = new Date(date);
  const dateUnix = new Date(unixDate);
  
  if(Date.parse(dateFormatted)){
    res.json({"unix": Date.parse(dateFormatted), "utc": dateFormatted.toUTCString()});
  } 
  else if(Date.parse(dateUnix)){
    res.json({"unix": unixDate, "utc": dateUnix.toUTCString()});
  }
  else {
    res.json({"error": "Invalid Date"});
  }
});

app.get("/api/", function(req, res){
  const string = new Date(Date.now());
  res.json({"unix": Date.parse(string), "utc": string.toUTCString()});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
