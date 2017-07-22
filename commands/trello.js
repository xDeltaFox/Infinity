let eris = require('../lib/client');
let fs = require('fs');
let Trello = require("node-trello");
let trello = new Trello("sla", "sla");
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

module.exports = {
    label: 'trello',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            trello.get("/1/boards/588cceadad505aa540718bd0", function(err, data) {
                if (err) throw err;
                console.log(data);
            });
        } catch (err) {
            eris.createMessage(config.logChannel, `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:${this.label}\n\t>> ${err.response}\n\t${err.stack}`);
        }
    },
    options: {
        description: 'Descrição',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['ts']
    }
};