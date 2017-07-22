let eris = require('../lib/client');
let firebase = require("firebase");
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

var db = firebase.database();
var ref = db.ref();

module.exports = {
    label: 'logchannel',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {

            var setlinkData = ref.child('Bot/Servidor/' + message.channel.guild.id + '/log/');

            ref.once("value")
                .then(function(snapshot) {
                    if (message.channel.id != message.channel.guild.defaultChannel.id) {
                        setlinkData.child('logchannelid').set(message.channel.id);
                        eris.createMessage(message.channel.id, `O chat de logs foi alteado para <#${message.channel.id}>`);
                    } else {
                        eris.createMessage(message.channel.id, `Não posso mostra o log no chat principal do servidor.`);
                    }
                });
        } catch (err) {
            eris.createMessage(config.logChannel, `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:${this.label}\n\t>> ${err.response}\n\t${err.stack}`);
        }
    },
    options: {
        description: 'Mude o canal de logs',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['ts']
    }
};