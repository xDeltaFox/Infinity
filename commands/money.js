let eris = require('../lib/client');
let firebase = require("firebase");
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let locale = require('../utils/lang');

var db = firebase.database();
var ref = db.ref();

module.exports = {
    label: 'money',
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

                    if (userdata.child('levels/money').val() == undefined) {
                        setuserdata.child('levels/money').set(500);
                        eris.createMessage(message.channel.id, locale(lang.val(), "money.add").replace("${message.author.mention}", message.author.mention));
                    } else {
                        eris.createMessage(message.channel.id, locale(lang.val(), "money.has").replace("${userdata.child('levels/money').val()}", userdata.child('levels/money').val()));
                    }

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