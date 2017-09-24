let client = require("../../client");
let eris = client.eris;
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let locale = require('../../utils/lang');
let gear = require('../../utils/gearboxes');

module.exports = {
    label: 'mute',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[`" + message.channel.guild.name + "`" + "~>" + "`" + message.channel.name + "`]" + "**" + message.author.username + "**:" + message.content);
            var lang = gear.DB.get(message.channel.guild.id).modules.lang;
            //Set Them Up
            var Server = message.channel.guild;
            var Channel = message.channel;
            var Author = message.author;
            //var Target = message.mentions[0];
            var Member = message.member;
            if (Author.bot) return;
            var MSG = message.content;

            var DB = client.DB;
            var userDB = client.userDB;
            var userData = userDB.get(Author.id).modules;

            var content = message.content.split(' ');
            var setData = DB.get(message.channel.guild.id).modules;

            //-----------------MAGIC---------------------
            if (setData.rolemute == undefined) {
                gear.guildAdd(Server, "rolemute", 0)
            }

            if (message.channel.guild.members.get(message.author.id).permission.has('manageGuild')) {
                if (message.mentions[0] != undefined) {
                    if (content[2] != undefined) {
                        if (setData.rolemute != undefined) {
                            message.channel.guild.addMemberRole(message.mentions[0].id, setData.rolemute);
                            setTimeout(function() {
                                message.channel.guild.removeMemberRole(message.mentions[0].id, setData.rolemute);
                                eris.createMessage(message.channel.id, locale(lang, "mute.text1").replace("${message.mentions[0].mention}", message.mentions[0].mention));
                            }, (content[2] * 60000));
                            eris.createMessage(message.channel.id, locale(lang, "mute.text2").replace("${message.mentions[0].username}", message.mentions[0].username).replace("${content[2]}", content[2]));
                        } else {
                            eris.createMessage(message.channel.id, locale(lang, "mute.text3"));
                        }
                    } else {
                        eris.createMessage(message.channel.id, locale(lang, "mute.err.err1"));
                    }
                } else {
                    eris.createMessage(message.channel.id, locale(lang, "mute.err.err2"));
                }
            } else {
                eris.createMessage(message.channel.id, locale(lang, "mute.err.err3"));
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