let eris = require('../lib/client');
let firebase = require("firebase");
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let locale = require('../utils/lang');

var db = firebase.database();
var ref = db.ref();

module.exports = {
    label: 'mute',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[`" + message.channel.guild.name + "`" + "~>" + "`" + message.channel.name + "`]" + "**" + message.author.username + "**:" + message.content);
            ref.once("value")
                .then(function(snapshot) {
                    var content = message.content.split(' ');
                    var setData = ref.child('Bot/Servidor/' + message.channel.guild.id + '/');
                    if (message.channel.guild.members.get(message.author.id).permission.has('manageGuild')) {
                        if (message.mentions[0] != undefined) {
                            if (content[2] != undefined) {
                                var Data = snapshot.child('Bot/Servidor/' + message.channel.guild.id + '/');
                                var lang = snapshot.child('Bot/Servidor/' + message.channel.guild.id).child('language');
                                if (Data.child('rolemute').val() != undefined) {
                                    message.channel.guild.addMemberRole(message.mentions[0].id, Data.child('rolemute').val());
                                    setTimeout(function() {
                                        message.channel.guild.removeMemberRole(message.mentions[0].id, Data.child('rolemute').val());
                                        eris.createMessage(message.channel.id, locale(lang.val(), "mute.text1"));
                                    }, (content[2] * 60000));
                                    eris.createMessage(message.channel.id, locale(lang.val(), "mute.text2"));
                                } else {
                                    eris.createMessage(message.channel.id, locale(lang.val(), "mute.text3"));
                                }
                            } else {
                                eris.createMessage(message.channel.id, locale(lang.val(), "mute.err.text1"));
                            }
                        } else {
                            eris.createMessage(message.channel.id, locale(lang.val(), "mute.err.text2"));
                        }
                    } else {
                        eris.createMessage(message.channel.id, locale(lang.val(), "mute.err.text3"));
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