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

app.get("/api/", function(req, res){
  const unixTime = Date.now();
  const utcTime =  new Date(unixTime).toUTCString();
  res.json({ unix: unixTime, utc: utcTime});
});

app.get("/api/:date_string", function(req, res){
  const regex = new RegExp("^[0-9]+$");
  let date = req.params.date_string;
  let unixTime;
  
  if(regex.test(date) || !isNaN(Date.parse(date))){
    if(!regex.test(date)){
      unixTime = new Date(date).getTime();
    } else {
      unixTime = parseInt(date);
    }
    const utcTime = new Date(unixTime).toUTCString();    
    res.json({ unix: unixTime, utc: utcTime });
  } else {
    res.json({ error : "Invalid Date" });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
