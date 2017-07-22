let Eris = require("eris-additions")(require("eris"));
let fs = require('fs');
let config = require('../config');
let firebase = require('firebase');
let events = require('events');

var eventEmitter = new events.EventEmitter();

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

eris.on('ready', () => {
    console.log('Estou pronto!');
});

eris.on('guildCreate', guild => {
    eris.createMessage('305325229037715456', {
        embed: {
            color: Math.floor(Math.random() * 16777216),
            title: ":tada: Novo Servidor",
            description: `O infinity foi adicionado em mais um servidor a vez foi de... ${guild.name}\n Dono: ${eris.users.get(guild.ownerID).username}#${eris.users.get(guild.ownerID).discriminator}`
        }
    });
    // Displays when bot gets added to a new guild.
});

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