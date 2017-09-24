let client = require("../../client");
let eris = client.eris;
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let locale = require('../../utils/lang');
let gear = require('../../utils/gearboxes');

module.exports = {
    label: 'rolemute',
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
                if (content[1] != undefined) {
                    var ment = eris.guilds.get(message.channel.guild.id).roles.find(name => name.name.toLowerCase() == content[1].toLowerCase());
                    gear.guildDefine(Server, "rolemute", ment.id);
                    eris.createMessage(message.channel.id, `${ment.name} foi setado, como cargo mute.`);
                } else {
                    eris.createMessage(message.channel.id, `Dá pra dizer qual o cargo é pra eu setar, ou tá dificil.`);
                }
            } else {
                eris.createMessage(message.channel.id, ':fire: Vou te queimar, se continuar fazendo coisa que não deve. tem que ter a permissão `manageGuild`').then(message => setTimeout(function() { message.delete(); }, 5000));
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