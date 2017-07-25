let eris = require('../lib/client');
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let firebase = require("firebase");

var db = firebase.database();
var ref = db.ref();

module.exports = {
    label: 'lang',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[```" + message.channel.guild.name + "```" + "~>" + "```" + message.channel.name + "```]" + "**" + message.author.username + "**:" + message.content);
            var content = message.content.split(' ');
            var setlang = ref.child('Bot/Servidor/' + message.channel.guild.id).child('language');
            ref.once("value")
                .then(function(snapshot) {
                    var lang = snapshot.child('Bot/Servidor/' + message.channel.guild.id).child('language');
                    switch (content[1]) {
                        case 'en':
                        case 'en-us':
                            setlang.set('en-us');
                            eris.createMessage(message.channel.id, `Ready. Now I speak English American, because on the part of England, few are worried.`);
                            break;
                        case 'pt':
                        case 'pt-br':
                            setlang.set('pt-br');
                            eris.createMessage(message.channel.id, `Pronto. Agora falo português do brasil, mas... porque não o português de portugal? tá iginorando esse país maravilhoso?`);
                            break;
                        default:
                            setlang.set('pt-br');
                            eris.createMessage(message.channel.id, `Mas que lingua... seria essa? Eu não entendo, prefiro 1000 vezes o português do brasil.`);
                            break;
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