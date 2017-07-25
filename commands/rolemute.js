let eris = require('../lib/client');
let fs = require('fs');
let firebase = require("firebase");
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

var db = firebase.database();
var ref = db.ref();

module.exports = {
    label: 'rolemute',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[```" + message.channel.guild.name + "```" + "~>" + "```" + message.channel.name + "```]" + "**" + message.author.username + "**:" + message.content);
            if (message.channel.guild.members.get(message.author.id).permission.has('manageGuild')) {
                var content = message.content.split(' ');
                var setData = ref.child('Bot/Servidor/' + message.channel.guild.id + '/');
                if (content[1] != undefined) {
                    var ment = eris.guilds.get(message.channel.guild.id).roles.find(name => name.name.toLowerCase() == content[1].toLowerCase());
                    ref.once("value")
                        .then(function(snapshot) {
                            setData.child('rolemute').set(ment.id);
                            eris.createMessage(message.channel.id, `${ment.name} foi setado, como cargo mute.`);
                        });
                } else {
                    eris.createMessage(message.channel.id, `Dá pra dizer qual o cargo é pra eu setar, ou tá dificil.`);
                }
            } else {
                eris.createMessage(message.channel.id, ':fire: Vou te queimar, se continuar fazendo coisa que não deve. tem que ter a permissão `manageGuild`').then(message => setTimeout(function() { message.delete(); }, 5000));
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