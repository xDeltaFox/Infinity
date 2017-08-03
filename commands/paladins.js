let eris = require('../lib/client');
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let locale = require('../utils/lang');
let firebase = require("firebase");
let paladins = require('paladins-api');

const pal = new paladins('2176', '09A694A488164F7BB8660340EFB91045', 'Json', 10);

var db = firebase.database();
var ref = db.ref();

module.exports = {
    label: 'paladins',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[`" + message.channel.guild.name + "`" + "~>" + "`" + message.channel.name + "`]" + "**" + message.author.username + "**:" + message.content);
            if (message.author.id != "238975494047924224") {
                eris.createMessage(message.channel.id, `Comando ainda em desemvolvimento, não perturbe.`);
            } else {
                ref.once("value")
                    .then(function(snapshot) {
                        var lang = snapshot.child('Bot/Servidor/' + message.channel.guild.id).child('language');
                        var sessionId;
                        pal.connect((err, res) => {
                            if (!err) {
                                sessionId = res;
                            };
                        });

                        pal.getPlayer(sessionId, 'xDeltaFox', (err, res) => {
                            console.log(res);
                        });
                    });
            }
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