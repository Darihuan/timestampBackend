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
app.get("/api/", function (req, res) {
    const stamp = Date.now();
    const fecha = new Date(stamp);

    res.json({
        unix: stamp,
        utc: fecha.toUTCString()
    });
});
//endpoint  timeStamp
app.get("/api/:date", (req, res) => {

    const regexpdate = new RegExp('^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}');
    const regexDateAlternative = new RegExp('^[a-zA-Z]+ [0-9]{1,2}, [0-9]+')
    const regexunix = new RegExp('[0,9].');

    const fecha = new Date(req.params.date);


    if (regexpdate.test(req.params.date) || regexDateAlternative.test(req.params.date) || !isNaN(fecha.getTime())) {

        const unix = fecha.getTime();

        res.json({
            unix: unix,
            utc: fecha.toUTCString()
        })
    } else if (regexunix.test(req.params.date)) {
        const fechaFromUnix = new Date(parseInt(req.params.date));
        const unix = parseInt(req.params.date);

        res.json({
            unix: unix,
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
