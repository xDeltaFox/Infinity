let client = require("../../client");
let eris = client.eris;
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let locale = require('../utils/lang');
let gear = require('../../utils/gearboxes');

module.exports = {
    label: 'betroll',
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
            if (userDB.get(Author.id)) {
                var content = message.content.split(' ');
                var a = userData.money;
                var one = Math.floor(Math.random() * 10);
                var two = Math.floor(Math.random() * 10);
                var three = Math.floor(Math.random() * 10);
                var text1 = locale(lang.val(), "betroll.text1").replace("${one}", one).replace("${two}", two).replace("${three}", three).replace("${message.author.mention}", message.author.mention).replace("${content[1]*2}", content[1] * 2);
                var text2 = locale(lang.val(), "betroll.text2").replace("${one}", one).replace("${two}", two).replace("${three}", three).replace("${message.author.mention}", message.author.mention).replace("${content[1]}", content[1]);
                var text3 = locale(lang.val(), "betroll.text3").replace("${message.author.mention}", message.author.mention);
                if (userData.money > content[1]) {
                    if (one == two || two == three || three == one) {
                        eris.createMessage(message.channel.id, text1);
                        gear.userIncrement(message.author, 'money', content[1] * 2);
                    } else {
                        eris.createMessage(message.channel.id, text2);
                        gear.userIncrement(message.author, 'money', content[1]);
                    }
                } else {
                    eris.createMessage(message.channel.id, text3);
                }
            }
        } catch (err) {
            eris.createMessage(config.logChannel, `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:${this.label}\n\t>> ${err.response}\n\t${err.stack}`);
        }
    },
    options: {
        description: 'rode os numeros e ganhe money',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['ts']
    }
};