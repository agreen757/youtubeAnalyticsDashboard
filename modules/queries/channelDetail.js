/*jslint node: true */
/*jslint nomen: true */

var request = require('request');

module.exports = function (channel, token, cb) {
    'use strict';
    
    var url = "https://www.googleapis.com/youtube/analytics/v1/reports?ids=contentOwner%3D%3Dthreehundred&start-date=2015-08-01&end-date=2015-08-06&metrics=views%2CestimatedMinutesWatched%2CaverageViewDuration%2CaverageViewPercentage%2CsubscribersGained&dimensions=day&filters=channel%3D%3D" + channel + "&sort=day&access_token=" + token;
    
    request.get(url, function (e, r, b) {
        
        return cb(null, b);
    });
    
};