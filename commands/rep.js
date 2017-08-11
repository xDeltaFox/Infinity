let eris = require('../lib/client');
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let locale = require('../utils/lang');
let firebase = require("firebase");

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
    label: 'rep',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[`" + message.channel.guild.name + "`" + "~>" + "`" + message.channel.name + "`]" + "**" + message.author.username + "**:" + message.content);
            if (message.author.id != "238975494047924224") {
                eris.createMessage(message.channel.id, `Comando ainda em desemvolvimento, não perturbe.`);
            } else {
                var setuser = ref.child('Bot/Usuario/' + message.author.id);
                var setglobal = ref.child('Bot/global/' + eris.user.id);
                ref.once("value")
                    .then(function(snapshot) {
                        if (message.mentions[0] != undefined) {
                            var lang = snapshot.child('Bot/Servidor/' + message.channel.guild.id).child('language');
                            var user = snapshot.child('Bot/Usuario/' + message.mentions[0].id);
                            var global = snapshot.child('Bot/global/' + eris.user.id);
                            var rep;

                            if (!global.child('repEpoch').val()) {
                                setglobal.child('repEpoch').set(1500271200000);
                            }
                            if (!global.child('epochStamp').val()) {
                                setglobal.child('epochStamp').set(new Date(1500271200000));
                            }
                            if (!user.child('rep').val()) {
                                setuser.child('rep').set(1500271199999);
                            }

                            var now = new Date().getTime();
                            var userEpoch = user.child('rep').val();
                            var globalEpoch = global.child('repEpoch').val();

                            user.child('levels/reputation').val() ? rep = user.child('levels/reputation').val() : rep = 0;

                            var next = globalEpoch + 75846000;

                            if (userEpoch < globalEpoch) {
                                if (((userEpoch - globalEpoch) / 75846000) <= 2) {
                                    setuser.child('dyStreak').set(1);
                                } else {
                                    setuser.child('dyStreak').set(0);
                                }
                                setuser.child('levels/reputation').set(rep + 1);
                                eris.createMessage(message.channel.id, locale(lang.val(), "rep").replace("${message.author.username}", message.author.username).replace("${message.mentions[0].mention}", message.mentions[0].mention));
                                setuser.child('rep').set(globalEpoch);
                            } else {
                                var r = Math.abs(now - next);
                                var remain = (r / 1000 + "").toHHMMSS();
                                eris.createMessage(message.channel.id, locale(lang.val(), "cooldown.texto").replace("${remain}", remain));
                            }
                        } else {
                            eris.createMessage(message.channel.id, locale(lang.val(), "mute.err.text2"));
                        }
                    });
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