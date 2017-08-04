let Eris = require("eris-additions")(require("eris"));
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let firebase = require('firebase');
let cheerio = require('cheerio');
let request = require("request");
let moment = require('moment');

firebase.initializeApp({
    serviceAccount: "serviceAccount",
    databaseURL: "databaseURL"
});

var db = firebase.database();
var ref = db.ref();

let eris = new Eris.CommandClient(config.token, {
    messageLimit: 250,
    largeThreshold: 500,
    autoReconnect: true,
    disableEveryone: true,
    getAllUsers: true,
    sequencerWait: 100,
    moreMentions: true,
    maxShards: config.shardCount,
    gatewayVersion: 6,
    cleanContent: true,
    defaultImageFormat: 'png'
}, {
    defaultHelpCommand: false,
    description: 'To infinity and beyond',
    owner: '**xDeltaFox#8871**',
    name: '**Infinity**',
    ignoreBots: true,
    prefix: ['>']
});

eris.Embed = require('eris-embed-builder');

function format(seconds) {
    function pad(s) {
        return (s < 10 ? '0' : '') + s;
    }
    var hours = Math.floor(seconds / (60 * 60));
    var minutes = Math.floor(seconds % (60 * 60) / 60);
    var seconds = Math.floor(seconds % 60);

    if (hours > 0) {
        return pad(hours) + ' horas(s), ' + pad(minutes) + 'minuto(s), ' + pad(seconds) + 'segundo(s)';
    } else {
        return pad(minutes) + ' minuto(s), ' + pad(seconds) + ' segundo(s)';
    }
}

setInterval(function() {
    var setglobal = ref.child('Bot/global/' + eris.user.id);
    ref.once("value")
        .then(function(snapshot) {
            var global = snapshot.child('Bot/global/' + eris.user.id);
            var date = new Date();
            if (date.getHours() === 3) {
                let epc = date.getTime()
                setglobal.child('epochStamp').set(date);
                if (!global.child('dailyEpoch').val()) {
                    setglobal.child('dailyEpoch').set(epc);
                }

                try {
                    setglobal.child('dailyEpoch').set(epc);
                } catch (e) {
                    setglobal.child('dailyEpoch').set(epc);
                }
                if (isNaN(global.child('dailyEpoch').val())) {
                    setglobal.child('dailyEpoch').set(epc);
                }
            }
        });
}, 1000);

setInterval(function() {
    ref.child('site/totalServers').set(eris.guilds.size);
    ref.child('site/totalUsers').set(eris.users.size);
}, 15000);

setInterval(() => { // Update the bot's status for each shard every 10 minutes
    let listgames = JSON.parse(fs.readFileSync('./db/listgames.json', 'utf8'));
    if (listgames.length !== 0 && eris.uptime !== 0) {
        eris.editStatus("online", { name: `${listgames.games[Math.floor(Math.random() * listgames.games.length)]} em ${eris.guilds.size} servidores || >ajuda`, type: 1, url: 'https://www.twitch.tv/xdeltafox1' });
    }
}, 30000);

module.exports = eris;