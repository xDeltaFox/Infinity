let eris = require('../lib/client');
let firebase = require('firebase');
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

var db = firebase.database();
var ref = db.ref();

module.exports = {
    label: 'oninvite',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[`" + message.channel.guild.name + "`" + "~>" + "`" + message.channel.name + "`]" + "**" + message.author.username + "**:" + message.content);
            var setlinkData = ref.child('Bot/Servidor/' + message.channel.guild.id);
            ref.once("value")
                .then(function(snapshot) {
                    var a = snapshot.child('Bot/Servidor/' + message.channel.guild.id).exists(); // true
                    if (a) {
                        var linkData = snapshot.child('Bot/Servidor/' + message.channel.guild.id);
                        if (linkData.child('invite').val()) {
                            setlinkData.child('invite').set(false);
                        } else {
                            setlinkData.child('invite').set(true);
                        }
                        if (linkData.child('invite').val()) {
                            eris.createMessage(message.channel.id, "Sistema de anti-convites foi desativado no server: " + message.channel.guild.name);
                        } else {
                            eris.createMessage(message.channel.id, "Sistema de anti-convites foi ativado no server: " + message.channel.guild.name);
                        }
                    }
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