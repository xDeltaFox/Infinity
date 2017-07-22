let eris = require('../lib/client');
let firebase = require("firebase");
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

var db = firebase.database();
var ref = db.ref();

module.exports = {
    label: 'destroy',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            var setData = ref.child('Bot/Servidor/' + message.channel.guild.id + '/');
            setData.remove()
                .then(function() {
                    eris.createMessage(message.channel.id, `Queimei, os dados do server.`);
                    eris.createMessage(config.logDestroyer, `${message.author.username}#${message.author.discriminator} Tacou fogo nos dados do servidor ${message.channel.guild.name} :fire:`);
                })
                .catch(function(error) {
                    console.log("OPS!!\n" + error.message);
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