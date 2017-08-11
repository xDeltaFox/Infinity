let eris = require('../lib/client');
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let locale = require('../utils/lang');
let firebase = require("firebase");
let Utils = require('../utils/Utils');

var utils = new Utils();
var db = firebase.database();
var ref = db.ref();

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
            var setuser = ref.child('Bot/Usuario/' + message.author.id);
            var setglobal = ref.child('Bot/global/' + eris.user.id);
            ref.once("value")
                .then(function(snapshot) {
                    var lang = snapshot.child('Bot/Servidor/' + message.channel.guild.id).child('language');
                    var user = snapshot.child('Bot/Usuario/' + message.author.id);
                    var global = snapshot.child('Bot/global/' + eris.user.id);

                    if (!global.child('dailyEpoch').val()) {
                        setglobal.child('dailyEpoch').set(1500271200000);
                    }
                    if (!global.child('epochStamp').val()) {
                        setglobal.child('epochStamp').set(new Date(1500271200000));
                    }
                    if (!user.child('daily').val()) {
                        setuser.child('daily').set(1500271199999);
                    }

                    var money;
                    var now = new Date().getTime();
                    var userEpoch = user.child('daily').val();
                    var globalEpoch = global.child('dailyEpoch').val();

                    user.child('levels/money').val() ? money = user.child('levels/money').val() : money = 0;

                    var next = globalEpoch + 75846000;

                    if (userEpoch < globalEpoch) {
                        if (((userEpoch - globalEpoch) / 75846000) <= 2) {
                            setuser.child('dyStreak').set(1);
                        } else {
                            setuser.child('dyStreak').set(0);
                        }
                        setuser.child('levels/money').set(money + 200);
                        eris.createMessage(message.channel.id, locale(lang.val(), "daily"));
                        setuser.child('daily').set(globalEpoch);
                    } else {
                        var r = Math.abs(now - next);
                        var remain = (r / 1000 + "").toHHMMSS();
                        eris.createMessage(message.channel.id, locale(lang.val(), "cooldown.texto").replace("${remain}", remain));
                    }
                });
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