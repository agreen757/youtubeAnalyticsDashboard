/*jslint node: true */
/*jslint nomen: true */

var express = require('express');
var bodyParser = require('body-parser');

var app = express(),
    auth = require('./modules/auth/auth.js')(app),
    ensureAuth = require('./modules/auth/ensureAuth.js'),
    channelsGet = require('./modules/queries/youtube.js'),
    channelDetails = require('./modules/queries/channelDetail.js');

app.use(bodyParser());
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/elements', express.static(__dirname + '/elements'));

app.get('/', ensureAuth, function (req, res) {
    'use strict';
    res.sendFile('app.html', {root: __dirname});
});

//GET ALL OF THE CHANNELS
app.get('/getchan', function (req, res) {
    'use strict';
    var token = req._passport.session.user[0].token;
    channelsGet(token, function (err, response) {
        res.send(response);
    });
});

app.put('/getdetails', function (req, res) {
    'use strict';
    var channel = req.body.id,
        token = req._passport.session.user[0].token;
    
    channelDetails(channel, token, function (err, response) {
        res.send(response);
    });
});



app.listen(process.env.PORT);
console.log('listening');