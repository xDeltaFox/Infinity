let eris = require('../lib/client');
let firebase = require("firebase");
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let locale = require('../utils/lang');

var db = firebase.database();
var ref = db.ref();

module.exports = {
    label: 'level',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[`" + message.channel.guild.name + "`" + "~>" + "`" + message.channel.name + "`]" + "**" + message.author.username + "**:" + message.content);
            var setuserdata = ref.child('Bot/Usuario/' + message.author.id + '/');
            ref.once("value")
                .then(function(snapshot) {
                    var userdata = snapshot.child('Bot/Usuario/' + message.author.id + '/');
                    var lang = snapshot.child('Bot/Servidor/' + message.channel.guild.id).child('language');

                    if (userdata.child('levels/level').val() == undefined) {
                        setuserdata.child('levels/level').set(0);
                    }

                    if (userdata.child('levels/xp').val() == undefined) {
                        setuserdata.child('levels/xp').set(0);
                    }

                    var leveltxt = locale(lang.val(), "level").replace("${userdata.child('levels/level').val() ? userdata.child('levels/level').val() : 0}", userdata.child('levels/level').val() ? userdata.child('levels/level').val() : 0).replace("${userdata.child('levels/xp').val() ? userdata.child('levels/xp').val() : 0}", userdata.child('levels/xp').val() ? userdata.child('levels/xp').val() : 0);

                    eris.createMessage(message.channel.id, leveltxt);
                });
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