let client = require("../../client");
let eris = client.eris;
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let gear = require('../../utils/gearboxes');
let locale = require('../../utils/lang');
let erisTools = require('../../utils/erisTools');

module.exports = {
    label: 'autorole',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[`" + message.channel.guild.name + "`" + "~>" + "`" + message.channel.name + "`]" + "**" + message.author.username + "**:" + message.content);

            var lang = gear.DB.get(message.channel.guild.id).modules.lang;
            var args = message.content.split(/\s+/).slice(1).join(" ").toLowerCase()
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

            if (!setData.autorole || setData.autorole == undefined) {
                gear.guildDefine(Server, 'autorole', null);
            }

            if (!setData.ativarautorole || setData.ativarautorole == undefined) {
                gear.guildDefine(Server, 'ativarautorole', false);
            }

            if (erisTools.findPerm(Server, Author, 'manageGuild')) {
                var content = message.content.slice(10);
                if (content != undefined) {
                    var ment = erisTools.findRoles(content);
                    if (ment != undefined) {
                        gear.guildDefine(Server, 'autorole', ment.id);
                        if (setData.ativarautorole) {
                            gear.guildDefine(Server, 'ativarautorole', false);
                            eris.createMessage(message.channel.id, locale(lang, 'autorole.text4'));
                        } else {
                            gear.guildDefine(Server, 'ativarautorole', true);
                            eris.createMessage(message.channel.id, locale(lang, 'autorole.text3'));
                        }
                    } else {
                        eris.createMessage(message.channel.id, locale(lang, 'autorole.text2'));
                    }
                } else {
                    eris.createMessage(message.channel.id, locale(lang, 'autorole.text1'));
                }
            } else {
                eris.createMessage(message.channel.id, locale(lang, 'err.text2')).then(message => setTimeout(function() { message.delete(); }, 5000));
            }
        } catch (err) {
            eris.createMessage(config.logChannel, `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:${this.label}\n\t>> ${err.response}\n\t${err.stack}`);
        }
    },
    options: {
        description: 'Defina um auto-role',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['ts']
    }
};