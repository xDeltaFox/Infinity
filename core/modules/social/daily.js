let client = require('../client');
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
    label: 'daily',
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
            if (Author.bot) return;
            var MSG = message.content;

            var DB = client.DB;
            var userDB = client.userDB;
            var userData = userDB.get(Author.id).modules;

            //-----------------MAGIC---------------------
            if (!userDB.get(eris.user.id).dailyEpoch) {
                gear.superuserDefine(eris.user, "dailyEpoch", 1500271200000)
            }
            if (!userDB.get(eris.user.id).epochStamp) {
                gear.superuserDefine(eris.user, "epochStamp", new Date(1500271200000))
            }
            if (!userDB.get(Author.id).modules.daily) {
                gear.userDefine(Author, "daily", 1500271199999)
            }

            var now = new Date().getTime();
            var userEpoch = userDB.get(Author.id).modules.daily
            var streak = userDB.get(Author.id).modules.dyStreak
            var globalEpoch = userDB.get(eris.user.id).dailyEpoch

            var next = globalEpoch + 75846000;

            if (userEpoch < globalEpoch) {
                if (((userEpoch - globalEpoch) / 86400000) <= 2) {
                    gear.userIncrement(Author, 'dyStreak', 1)
                } else {
                    gear.userDefine(Author, 'dyStreak', 0)
                }
                gear.userIncrement(Author, 'money', 200)
                gear.userDefine(Author, 'daily', globalEpoch)
                eris.createMessage(message.channel.id, locale(lang, "daily"));
            } else {
                var r = Math.abs(now - next);
                var remain = (r / 1000 + "").toHHMMSS();
                eris.createMessage(message.channel.id, locale(lang, "cooldown.texto").replace("${remain}", remain));
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