let client = require("../client");
let eris = client.eris;
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let locale = require('../utils/lang');
let gear = require('../utils/gearboxes');

String.prototype.toHHMMSS = function() {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var days = Math.floor(hours / 24);

    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var time = hours + 'h ' + minutes + 'm ' + seconds + 's';
    days > 1 ? time = days + " dias " : time = time
    return time;
}

module.exports = {
    label: 'rep',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[`" + message.channel.guild.name + "`" + "~>" + "`" + message.channel.name + "`]" + "**" + message.author.username + "**:" + message.content);
            // if (message.author.id != "238975494047924224") {
            //     eris.createMessage(message.channel.id, `Comando ainda em desemvolvimento, não perturbe.`);
            // } else {
            if (message.mentions[0] != undefined) {
                var lang = gear.DB.get(message.channel.guild.id).modules.lang;
                //Set Them Up
                var Server = message.channel.guild;
                var Channel = message.channel;
                var Author = message.author;
                var Target = message.mentions[0];
                if (Author.bot) return;
                var MSG = message.content;

                var DB = client.DB;
                var userDB = client.userDB;
                var userData = userDB.get(Author.id).modules;

                //-----------------MAGIC---------------------
                //Resolve Undefined
                if (userDB.get(Author.id).modules.repdaily == undefined) {
                    gear.userDefine(Author, "repdaily", 0)
                }
                if (userDB.get(Target.id).modules.rep == undefined) {
                    gear.userDefine(Target, 'rep', 0)
                }
                //-----------

                var now = new Date().getTime();
                var day = 3000000
                var dly = userDB.get(Author.id).modules.repdaily

                if ((now - dly) >= day) {
                    let repConfirm = locale(lang, "rep").replace("${message.author.username}", message.author.username).replace("${message.mentions[0].mention}", message.mentions[0].mention);
                    eris.createMessage(message.channel.id, repConfirm)
                    gear.userIncrement(Target, 'rep', 1)
                    gear.userDefine(Author, 'repdaily', now)
                } else {
                    let r = day - (now - dly)
                    let remain = (r / 1000 + "").toHHMMSS();
                    eris.createMessage(message.channel.id, locale(lang, "cooldown.texto").replace("${remain}", remain))
                }
            } else {
                eris.createMessage(message.channel.id, locale(lang, "mute.err.text2"));
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