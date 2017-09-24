let client = require("../../client");
let eris = client.eris;
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let locale = require('../utils/lang');
let gear = require('../../utils/gearboxes');

module.exports = {
    label: 'kick',
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
            var Target = message.mentions;
            var Member = message.member;
            if (Author.bot) return;
            var MSG = message.content;

            var DB = client.DB;
            var userDB = client.userDB;
            var userData = userDB.get(Author.id).modules;

            var content = message.content.split(' ');
            var setData = DB.get(message.channel.guild.id).modules;

            //-----------------MAGIC---------------------
            if (message.channel.guild.members.get(message.author.id).permission.has('manageGuild')) {
                if (Target[0] != undefined || content[2] != undefined) {
                    var txt = locale(lang, "kick").replace("${ment[0].username}", Target[0].username).replace("${content[2]}", content[2]);
                    message.channel.guild.kickMember(Target[0].id, content[2]).catch(err => {
                        if (err.message.includes("Privilege is too low")) {
                            eris.createMessage(message.channel.id, "Meu cargo mais alto, não tem privilegio suficiente para expulsar esse individuo, deixe meu cargo mais alto acima do dele, para poder expulsa-lo");
                        }
                        return;
                    });
                    eris.createMessage(message.channel.id, txt);
                } else {
                    eris.createMessage(message.channel.id, locale(lang, "err.text3")).then(message => setTimeout(function() { message.delete(); }, 5000));
                }
            } else {
                eris.createMessage(message.channel.id, locale(lang, "err.text2")).then(message => setTimeout(function() { message.delete(); }, 5000));
            }
        } catch (err) {
            eris.createMessage(config.logChannel, `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:${this.label}\n\t>> ${err.response}\n\t${err.stack}`);
        }
    },
    options: {
        description: 'Expulse alguém',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['kick']
    }
};