let client = require('../../client');
let eris = client.eris;
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let locale = require('../utils/lang');
let gear = require('../../utils/gearboxes');

module.exports = {
    label: 'ameaça',
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
            if (Author.bot) return;
            var MSG = message.content;

            var DB = client.DB;
            var userDB = client.userDB;
            var userData = userDB.get(Author.id).modules;

            //-----------------MAGIC---------------------
            eris.sendChannelTyping(message.channel.id);
            var errtext = locale(lang, "err.text1");

            function greelang(n) {
                var texto = locale(lang, "ameaça");
                return texto.replace("${numero}", numero).replace("${message.mentions[0].username}", message.mentions[0].username).replace("${aleatorio[0]}", aleatorio[n])
            }

            var numero = Math.floor(Math.random() * 240);
            var aleatorio = [locale(lang, "ameaçatexto.texto1"), locale(lang, "ameaçatexto.texto2"), locale(lang, "ameaçatexto.texto3"), locale(lang, "ameaçatexto.texto4"), locale(lang, "ameaçatexto.texto5")];
            if (message.mentions[0] != undefined) {
                if (numero <= 60) {
                    eris.createMessage(message.channel.id, greelang(0));
                }
                if (numero >= 60 && numero <= 100) {
                    eris.createMessage(message.channel.id, greelang(1));
                }
                if (numero >= 100 && numero <= 150) {
                    eris.createMessage(message.channel.id, greelang(2));
                }
                if (numero >= 150 && numero <= 210) {
                    eris.createMessage(message.channel.id, greelang(3));
                }
                if (numero >= 210 && numero <= 240) {
                    eris.createMessage(message.channel.id, greelang(4));
                }
            } else {
                eris.createMessage(message.channel.id, errtext).then(message => setTimeout(function() { message.delete(); }, 5000));
            }
        } catch (err) {
            eris.createMessage(config.logChannel, `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:${this.label}\n\t>> ${err.response}\n\t${err.stack}`);
        }
    },
    options: {
        description: 'Classifica seu grau de criminalidade',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['ts']
    }
};