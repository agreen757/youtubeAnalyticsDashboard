/*
    AUTHENTICATION
    
    Have all of our authentication done here.
    
    We need to accept the entire express app from the app.js
    then go through all of the ensureAuthenticated and ensureAdmin that we have from our main site.
*/

/*jslint node: true */
/*jslint nomen: true */

var passport = require('passport'),
    session = require('express-session'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    GOOGLE_CLIENT_ID = "468772544188.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET = "LufQkK0YPcHbKetle54m8p2I",
    serverConf = require(__dirname + '/../../config.json'),
    callbackUrl = serverConf.server.callback;

passport.serializeUser(function (user, done) {
    'use strict';
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    'use strict';
    done(null, obj);
});

module.exports = function (app) {
    'use strict';
    
    function sook(req, res, next) {
        passport.use(new GoogleStrategy({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: callbackUrl
        },
            function (accessToken, refreshToken, profile, done) {
            
                process.nextTick(function () {
                
                //console.log(profile);                                                                        

                    return done(null, [{token: accessToken, rToken: refreshToken, 'profile': profile}]);
                });
            }
            ));
        return next();
    }
    
    
    app.use(session({secret: 'INDMUSIC1234'}));
    app.use(passport.initialize());
    app.use(passport.session());
    
    app.get('/auth', sook,
        passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/yt-analytics.readonly', 'https://www.googleapis.com/auth/yt-analytics-monetary.readonly', 'https://www.googleapis.com/auth/youtubepartner', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/youtubepartner-channel-audit']})
           );
    
    app.get('/auth/callback',
        passport.authenticate('google', { failureRedirect: '/signup' }),
        function (req, res) {
        //console.log(req._passport.session.user[0])
            res.redirect('/dashboard');
        }

           );
    
};

