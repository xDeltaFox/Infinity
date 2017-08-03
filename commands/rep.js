let eris = require('../lib/client');
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let locale = require('../utils/lang');
let firebase = require("firebase");

var db = firebase.database();
var ref = db.ref();

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
                ref.once("value")
                    .then(function(snapshot) {
                        var lang = snapshot.child('Bot/Servidor/' + message.channel.guild.id).child('language');
                        var user = snapshot.child('Bot/Usuario/' + message.author.id);
                        var rep;
                        var cooldown;

                        user.child('cooldown-rep').val() ? cooldown = user.child('cooldown-rep').val() : cooldown = false;
                        user.child('levels/reputation').val() ? rep = user.child('levels/reputation').val() : rep = 0;

                        if (cooldown) {
                            eris.createMessage(message.channel.id, `Espera o cooldown de ${}.`)
                        } else {
                            setuser.child('levels/reputation').set(rep + 1);
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