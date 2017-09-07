let client = require("../client");
let eris = client.eris;
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let locale = require('../utils/lang');
let gear = require('../utils/gearboxes');

module.exports = {
    label: 'jogando',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[`" + message.channel.guild.name + "`" + "~>" + "`" + message.channel.name + "`]" + "**" + message.author.username + "**:" + message.content);
            // if (message.author.id != "238975494047924224") {
            //     eris.createMessage(message.channel.id, `Comando ainda em desemvolvimento, não perturbe.`);
            // } else {
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
            var args2 = MSG.slice(9);

            var userItem = [];
            var user = [];
            var fields = "";
            var game = "";
            if (Member.game == null) {
                game = "Nada";
            } else {
                game = Member.game.name;
            }

            if (args2 != undefined) {
                game = args2;
            }

            Channel.sendTyping();
            eris.guilds.map(guild => {
                guild.members.map(member => {
                    if (member.game != null) {
                        userItem.discriminator = member.discriminator;
                        userItem.username = member.username;
                        userItem.game = member.game.name;
                        if (user.indexOf(userItem.username) == -1) {
                            user.push(userItem);
                        }
                        userItem = [];
                    } else {
                        userItem.discriminator = member.discriminator;
                        userItem.username = member.username;
                        userItem.game = "Nada";
                        if (user.indexOf(userItem.username) == -1) {
                            user.push(userItem);
                        }
                        userItem = [];
                    }
                });
            });

            // console.log(user);

            var t = 0;
            for (var i = 0; i < user.length; i++) {
                if (t < 30) {
                    if (user[i].game == game) {
                        if (!fields.includes(user[i].username)) {
                            // console.log(`${t+1}: ${user[i].username}#${user[i].discriminator}`);
                            fields += `${t+1}: ${user[i].username}#${user[i].discriminator} está jogando ${user[i].game}\n`;
                            t++;
                        }
                    }
                }
            }

            if (fields != "") {
                eris.createMessage(message.channel.id, "```css\n" + fields + "\n```");
            } else {
                eris.createMessage(message.channel.id, `Não achei ninguém com esse jogo <:blobtilt:343886974995660802>`);
            }
            // }
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