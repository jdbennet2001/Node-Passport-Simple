var express = require('express'),
    dust = require('dustjs-linkedin'),
    helpers = require('dustjs-helpers'),
    cons = require('consolidate'),
    path = require('path'),
    nconf = require('nconf'),
    request = require('request'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    cookieParser = require('cookie-parser');
    bodyParser = require('body-parser');
    errorHandler = require('errorhandler');
    serveStatic = require('serve-static'),
    compress = require('compression'),
    format = require('string-format');

    var passport = require('passport');
    var BasicStrategy = require('passport-http').BasicStrategy


    passport.use(new BasicStrategy(
      function(username, password, done) {
        if (username.valueOf() === 'jon' &&
          password.valueOf() === 'test')
          return done(null, true);
        else
          return done(null, false);
      }
    ));

    var app = express();

    app.set('port', process.env.PORT || 3906);
    app.set('views', __dirname + '/views');

    app.engine('dust', cons.dust);
    app.set('view engine', 'dust');

    app.use(serveStatic(path.join(__dirname, 'public'))); 

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(methodOverride());

    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());


    var sample = require( "./routes/sample");
    app.get( '/', sample.sample);
        
    app.get('/api/me',
        passport.authenticate('basic', {
            session: false
        }),
        function(req, res) {
            res.json(req.user);
        });


    app.listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
    });
