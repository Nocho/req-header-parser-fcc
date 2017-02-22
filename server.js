// always port 8080
var http = require('http');
var path = require('path');
var express = require('express');
var app = express();

//how do I get  IP address, language and operating system for user's browser?
// example output
// {"ipaddress":"96.59.204.145","language":"en-US","software":"X11; CrOS x86_64 8872.76.0"}

//req.headers object
// x-forwarded-for contains ip... '96.59.204.145'

// accept-language contains language.. 'en-us', what other abbreviations?
//'en-US,en;q=0.8',

// user agent contains... operating system?
// -> 'user-agent': 
// 'Mozilla/5.0 (X11; CrOS x86_64 8872.76.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.105 Safari/537.36'

app.use(express.static(path.resolve(__dirname, 'static')));

app.get('/lol', function(req, res){
    
    /* 
    - need a regex to match a string up to but not including the comma in 
    req.headers['accept-language']
    -->  /.+(?=,)/
    
    - need a regex to match the first string between parentheses in 
    req.headers['user-agent']..
    -->  /[(].+?(?=\))/
    */
    
    var headers = req.headers;
    
    //return this object as JSON
    var objecto = {};
    objecto.ipAddress = headers['x-forwarded-for'];
    objecto.lang = headers['accept-language'].match(/.+(?=,)/)[0];
    objecto.software = headers['user-agent'].match( /[(].+?(?=\))/ )[0].slice(1);
    
    res.send(JSON.stringify(objecto));
    res.end();
    
    console.log(req.headers);
    res.end('lol');
})

http.createServer(app).listen(process.env.PORT || 8080);
