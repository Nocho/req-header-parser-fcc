// always port 8080
var http = require('http');
var express = require('express');
var app = express();

//how do I get  IP address, language and operating system for user's browser?
// example output 
// {"ipaddress":"96.59.204.145","language":"en-US","software":"X11; CrOS x86_64 8872.76.0"}

// x-forwarded-for contains ip... '96.59.204.145'

// accept-language contains language.. 'en-us', what other abbreviations?
//'en-US,en;q=0.8',

// user agent contains... operating system?
// -> 'user-agent': 
// 'Mozilla/5.0 (X11; CrOS x86_64 8872.76.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.105 Safari/537.36',


var server = http.createServer(function(req, res){
    
    var headers = req.headers;
    
    //return this object as JSON
    var objeto = {};
    objeto.IPaddress = headers['x-forwarded-for'];
    objeto.lang = headers['accept-language'];
    objeto.softare = headers['user-agent'];
    
    res.send(JSON.stringify(objeto));
    res.end();
})

server.listen(process.env.PORT || 8080);
