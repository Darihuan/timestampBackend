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

//endpoint  timeStamp
app.get("/api/:date", (req, res) => {

    const regexpdate = new RegExp('^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$');
    const regexunix = new RegExp('[0,9].');

    if (regexpdate.test(req.params.date)) {
        const fecha = new Date(req.params.date);
        const unix = Math.floor(fecha);
        res.json({
            unix: unix,
            utc: fecha.toUTCString()
        })
    } else if (regexunix.test(req.params.date)) {
        const fechaFromUnix = new Date(parseInt(req.params.date));

        res.json({
            unix: req.params.date,
            utc: fechaFromUnix.toUTCString()
        });

    } else {
        res.json({error: "Invalid Date"})
    }

})
;


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});