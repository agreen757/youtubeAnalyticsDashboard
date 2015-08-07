/*jslint node: true */
/*jslint nomen: true */

var request = require('request');

module.exports = function (token, cb) {
    'use strict';
    
    var url = "https://www.googleapis.com/youtube/v3/channels?part=id%2Csnippet%2Cstatistics&managedByMe=true&maxResults=50&onBehalfOfContentOwner=threehundred&access_token=" + token;
    
    request.get(url, function (e, r, b) {
        return cb(null, b);
    });
    
};