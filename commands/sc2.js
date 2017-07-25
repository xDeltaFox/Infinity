var sc2kparser = require('sc2kparser');
var fs = require('fs');
var eris = require('../lib/client');
var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
var locale = require('../utils/lang');
let firebase = require("firebase");

var db = firebase.database();
var ref = db.ref();

module.exports = {
    label: 'simcity2000info',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[```" + message.channel.guild.name + "```" + "~>" + "```" + message.channel.name + "```]" + "**" + message.author.username + "**:" + message.content);
            ref.once("value")
                .then(function(snapshot) {
                    var lang = snapshot.child('Bot/Servidor/' + message.channel.guild.id).child('language');
                    // get file bytes somehow
                    fs.readFile("./LONDON.SC2", (err, data) => {
                        if (err) throw err;
                        let bytes = new Uint8Array(data);

                        let struct = sc2kparser.parse(bytes);

                        // get language
                        let namecity = locale(lang.val(), 'sc.namecity')
                        let founded = locale(lang.val(), 'sc.founded')
                        let money = locale(lang.val(), 'sc.money')
                        let populção = locale(lang.val(), 'sc.populacao')

                        var file = `${namecity}: ${struct.cityName}\n${founded}: ${struct.founded}\n${money}: ${struct.money}\n${populção}: ${struct.population}`;
                        eris.createMessage(message.channel.id, file)
                    });
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