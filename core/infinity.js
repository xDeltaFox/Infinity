let Eris = require("eris-additions")(require("eris"));
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));


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