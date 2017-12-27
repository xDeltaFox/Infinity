var Eris = require("eris-additions")(require("eris"));
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

let eris = new Eris.CommandClient(config.token, {
    messageLimit: 250,
    largeThreshold: 500,
    autoReconnect: true,
    disableEveryone: true,
    getAllUsers: true,
    sequencerWait: 100,
    moreMentions: true,
    maxShards: config.shardCount,
    cleanContent: true,
    defaultImageFormat: 'png'
}, {
    defaultHelpCommand: false,
    description: 'To infinity and beyond',
    owner: '**xDeltaFox#8871**',
    name: '**Infinity**',
    ignoreBots: true,
    prefix: ['++']
});

eris.on('ready', () => {
    console.log('Estou pronto!');
});

setInterval(() => {
    var listgames = JSON.parse(fs.readFileSync('./core/listgames.json', 'utf8'));
    if (listgames.length !== 0 && eris.uptime !== 0) {
        eris.editStatus("online", { name: `${listgames.games[Math.floor(Math.random() * listgames.games.length)]} em ${eris.guilds.size} servidores`, type: 1, url: 'https://www.twitch.tv/xdeltafox1' });
    }
}, 30000);

module.exports = {
    eris
}