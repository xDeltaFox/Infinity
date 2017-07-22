let eris = require('../lib/client');
let firebase = require('firebase');
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

var db = firebase.database();
var ref = db.ref();

module.exports = {
    label: 'betroll',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            var setUserData = ref.child('Bot/Usuario/' + message.author.id);
            ref.once("value")
                .then(function(snapshot) {
                    var existsData = snapshot.child('Bot/Usuario/' + message.author.id).exists();
                    var userData = snapshot.child('Bot/Usuario/' + message.author.id);
                    if (existsData) {
                        var content = message.content.split(' ');
                        var a = userData.child('money').val();
                        var one = Math.floor(Math.random() * 10);
                        var two = Math.floor(Math.random() * 10);
                        var three = Math.floor(Math.random() * 10);
                        if (userData.child('money').val() > content[1]) {
                            if (one == two || two == three || three == one) {
                                eris.createMessage(message.channel.id, `**##### Hora de checar! #####**\nSeus numeros foram: ${one} - ${two} - ${three}\n##### Duplos, Parábens! #####\n${message.author.mention}, você ganhou: ${content[1]*2} rows`);
                                setUserData.child('money').set(a + content[1] * 2);
                            } else {
                                eris.createMessage(message.channel.id, `**##### Hora de checar! #####**\nSeus numeros foram: ${one} - ${two} - ${three}\n${message.author.mention}, não foi dessa vez, você perdeu: ${content[1]} rows`);
                                setUserData.child('money').set(a - content[1]);
                            }
                        } else {
                            eris.createMessage(message.channel.id, `${message.author.mention} - Você não tem dinheiro suficiente.`);
                        }
                    }
                });
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