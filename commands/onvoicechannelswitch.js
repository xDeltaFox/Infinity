let eris = require('../lib/client');
let firebase = require("firebase");
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

var db = firebase.database();
var ref = db.ref();

module.exports = {
    label: 'logvoicechannelswitch',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {

            var setlinkData = ref.child('Bot/Servidor/' + message.channel.guild.id + '/log/');

            ref.once("value")
                .then(function(snapshot) {
                    var log = snapshot.child('Bot/Servidor/' + message.channel.guild.id + '/log/');
                    if (log.child('logchannelid').val() != message.channel.guild.defaultChannel.id) {
                        if (log.child('VoiceChannelSwitch').val()) {
                            setlinkData.child('VoiceChannelSwitch').set(false);
                            eris.createMessage(message.channel.id, "Sistema de logs VoiceChannelSwitch foi desativado no server: " + message.channel.guild.name);
                        } else {
                            setlinkData.child('VoiceChannelSwitch').set(true);
                            eris.createMessage(message.channel.id, "Sistema de logs VoiceChannelSwitch foi ativado no server: " + message.channel.guild.name);
                        }
                    } else {
                        eris.createMessage(message.channel.id, "Não posso mostra o log no chat principal do servidor.");
                    }
                });
        } catch (err) {
            eris.createMessage(config.logChannel, `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:${this.label}\n\t>> ${err.response}\n\t${err.stack}`);
        }
    },
    options: {
        description: 'Log `voiceChannelSwitch`',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['ts']
    }
};