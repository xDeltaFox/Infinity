let eris = require('../lib/client');
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let locale = require('../utils/lang');
let firebase = require("firebase");

var db = firebase.database();
var ref = db.ref();

module.exports = {
    label: 'ban',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[```" + message.channel.guild.name + "```" + "~>" + "```" + message.channel.name + "```]" + "**" + message.author.username + "**:" + message.content);
            ref.once("value")
                .then(function(snapshot) {
                    var lang = snapshot.child('Bot/Servidor/' + message.channel.guild.id).child('language');
                    var errtext = locale(lang.val(), "err.text2")
                    var bantext = locale(lang.val(), "err.text2").replace("${ment[0].username}", ment[0].username).replace("${content[2]}", content[2]);
                    if (message.channel.guild.members.get(message.author.id).permission.has('manageGuild')) {
                        var ment = message.mentions;
                        var content = message.content.split(' ');
                        if (message.mentions[0] != undefined || content[2] != undefined) {
                            message.channel.guild.banMember(ment[0].id, 7, content[2]);
                            eris.createMessage(message.channel.id, bantext);
                        } else {
                            eris.createMessage(message.channel.id, locale(lang.val(), "ban.text2")).then(message => setTimeout(function() { message.delete(); }, 5000));
                        }
                    } else {
                        eris.createMessage(message.channel.id, errtext).then(message => setTimeout(function() { message.delete(); }, 5000));
                    }
                });
        } catch (err) {
            eris.createMessage(config.logChannel, `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:${this.label}\n\t>> ${err.response}\n\t${err.stack}`);
        }
    },
    options: {
        description: 'Bana alguén',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['ban']
    }
};