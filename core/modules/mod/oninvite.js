let client = require("../../client");
let eris = client.eris;
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let gear = require('../../utils/gearboxes');

module.exports = {
    label: 'oninvite',
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
            var linkData = DB.get(Server.id).modules.invite;

            if (linkData) {
                gear.guildDefine(Server, "invite", false);
                eris.createMessage(message.channel.id, "Sistema de anti-convites foi desativado no server: " + message.channel.guild.name);
            } else {
                gear.guildDefine(Server, "invite", true);
                eris.createMessage(message.channel.id, "Sistema de anti-convites foi ativado no server: " + message.channel.guild.name);
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