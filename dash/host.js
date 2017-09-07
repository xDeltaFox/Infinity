var express = require('express');
var session = require('express-session');
var app = express();
var DiscordStrategy = require('passport-discord').Strategy;
var passport = require('passport');
var CookieStrategy = require("passport-cookie");
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var path = require('path');
var AuthDetails = require("./auth.json");
var request = require('supertest');
var http = require('http');
var server = http.createServer(app);
var pug = require('pug');
var cookieParser = require('cookie-parser');

exports.init = (bot, DB, userDB) => {
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    var scopes = ['identify', 'guilds'];
    var server_port = parseInt(AuthDetails.server_port) || 8080;
    var server_ip_address = AuthDetails.server_ip_address || "127.0.0.1";

    passport.use(new CookieStrategy(
        function(token, done) {
            User.findByToken({
                token: token
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            });
        }
    ));

    passport.use(new DiscordStrategy({
            clientID: 'clientID',
            clientSecret: 'clientSecret',
            callbackURL: 'callbackURL',
            scope: scopes
        },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function() {
                return done(null, profile);
            });
        }
    ));

    app.use(session({
        secret: 'keyboard cat',
        cookie: { maxAge: 36000000 },
        rolling: true,
        resave: true,
        saveUninitialized: true
    }));

    app.engine("html", require("ejs").renderFile);
    app.set("view engine", "html");
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(cookieParser());
    app.use('/img', express.static(path.join(__dirname, '/img')));
    app.use('/js', express.static(path.join(__dirname, '/js')));
    app.use('/css', express.static(path.join(__dirname, '/css')));

    //===================// PAGINAS \\==========================================\\

    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname + '/index.html'));
    });

    app.get('/auth', passport.authenticate('discord', { scope: scopes }), function(req, res) {});

    app.get('/auth/callback', passport.authenticate('discord', { failureRedirect: '/err' }), function(req, res) {
        res.redirect('/dash'); // auth success
    });

    app.get('/err', function(req, res) {
        res.send('Fail to login');
        res.redirect('/');
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/dash', checkAuth, function(req, res) {
        //res.json(req.user);
        //console.log(req);
        //Collect User Info
        let USR = req.user
        let UDB = userDB.get(USR.id)

        let guilds = USR.guilds
        let gs = guilds.length
        var setuserdata = ref.child('Bot/Usuario/' + USR.id + '/');
        var userdata = snapshot.child('Bot/Usuario/' + USR.id + '/');

        // Progress Bar
        var largura = 0;
        var autura = 7;

        var exp = UDB.modules.exp;
        var exptoNex = Math.pow(Number(Math.floor(0.1 * Math.sqrt(exp)) + "0") + 10, 2).toString();
        var exptoThis = Math.pow(Number(Math.floor(0.1 * Math.sqrt(exp)) + "0"), 2).toString();
        var frameofact = Math.pow(Number(Math.floor(0.1 * Math.sqrt(exp)) + "0") + 10, 2) - Math.pow(Number(Math.floor(0.1 * Math.sqrt(exp)) + "0"), 2);
        var percent = (((Number(exp) - Number(exptoThis)) / frameofact) * 100).toFixed(0);

        try {
            largura = (687 / 100) * percent;
        } catch (e) {
            largura = 687;
        }

        res.render(__dirname + '/dash.html', {
            background: `http://files.pollux.fun/gvDPjUR4HMRIfkmmxb17TIjfOt2mZJgR.png`,
            name: `${USR.username}#${USR.discriminator}`,
            username: USR.username,
            discriminator: USR.discriminator,
            rows: UDB.modules.money,
            exp: `${exp}/${exptoNex}`,
            avatar: `https://cdn.discordapp.com/avatars/${USR.id}/${USR.avatar}.png`,
            level: UDB.modules.level,
            ptxt: UDB.modules.persotext || "Não tem nada para ver aqui",
            bar: largura
        });
    });

    //===================// SERVER LIST \\==========================================\\

    try {
        server.listen(process.env.PORT || 8080, process.env.IP || "127.0.0.1", function() {
            var addr = server.address();
            console.log("Site server listening at", addr.address + ":" + addr.port);
        });
    } catch (err) {
        console.log("Failed to open web interface");
    }

    //===================// FUNÇÕES \\==========================================\\

    function checkAuth(req, res, next) {
        if (req.isAuthenticated()) return next();
        return res.redirect('/auth');
        //res.send('not logged in :(');
    }
}