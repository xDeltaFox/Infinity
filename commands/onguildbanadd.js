let eris = require('../lib/client');
let firebase = require("firebase");
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let locale = require('../utils/lang');

var db = firebase.database();
var ref = db.ref();

module.exports = {
    label: 'logguildbanadd',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[`" + message.channel.guild.name + "`" + "~>" + "`" + message.channel.name + "`]" + "**" + message.author.username + "**:" + message.content);
            var setlinkData = ref.child('Bot/Servidor/' + message.channel.guild.id + '/log/');

            ref.once("value")
                .then(function(snapshot) {
                    var log = snapshot.child('Bot/Servidor/' + message.channel.guild.id + '/log/');
                    var lang = snapshot.child('Bot/Servidor/' + message.channel.guild.id).child('language');
                    if (log.child('logchannelid').val() != message.channel.guild.defaultChannel.id) {
                        if (log.child('GuildBanAdd').val()) {
                            setlinkData.child('GuildBanAdd').set(false);
                            eris.createMessage(message.channel.id, locale(lang.val(), "log.guildBanAdd.desativado") + message.channel.guild.name);
                        } else {
                            setlinkData.child('GuildBanAdd').set(true);
                            eris.createMessage(message.channel.id, locale(lang.val(), "log.guildBanAdd.ativado") + message.channel.guild.name);
                        }
                    } else {
                        eris.createMessage(message.channel.id, locale(lang.val(), "log.err.text"));
                    }
                });
        } catch (err) {
            eris.createMessage(config.logChannel, `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:${this.label}\n\t>> ${err.response}\n\t${err.stack}`);
        }
    },
    options: {
        description: 'Log `guildBanAdd`',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['ts']
    }
};