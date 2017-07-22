var sc2kparser = require('sc2kparser');
var fs = require('fs');
var eris = require('../lib/client');
var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
var locale = require('../utils/lang');

module.exports = {
    label: 'simcity2000info',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            // get file bytes somehow
            fs.readFile("./LONDON.SC2", (err, data) => {
                if (err) throw err;
                let bytes = new Uint8Array(data);

                let struct = sc2kparser.parse(bytes);

                // get language
                let namecity = locale('pt', 'sc.namecity')
                let founded = locale('pt', 'sc.founded')
                let money = locale('pt', 'sc.money')
                let populção = locale('pt', 'sc.populção')

                var file = `${namecity}: ${struct.cityName}\n${founded}: ${struct.founded}\n${money}: ${struct.money}\n${populção}: ${struct.population}`;
                eris.createMessage(message.channel.id, file)
            });
        } catch (err) {
            eris.createMessage(config.logChannel, `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:${this.label}\n\t>> ${err.response}\n\t${err.stack}`);
        }
    },
    options: {
        description: '**Alpha**',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['sc2000']
    }
};