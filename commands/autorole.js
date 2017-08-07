let eris = require('../lib/client');
let fs = require('fs');
let firebase = require("firebase");
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

var db = firebase.database();
var ref = db.ref();

module.exports = {
    label: 'autorole',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[`" + message.channel.guild.name + "`" + "~>" + "`" + message.channel.name + "`]" + "**" + message.author.username + "**:" + message.content);
            if (message.channel.guild.members.get(message.author.id).permission.has('manageGuild')) {
                var content = message.content.slice(10);
                var setData = ref.child('Bot/Servidor/' + message.channel.guild.id + '/');
                if (content != undefined) {
                    var ment = eris.guilds.get(message.channel.guild.id).roles.find(name => name.name.toLowerCase() == content.toLowerCase());
                    ref.once("value")
                        .then(function(snapshot) {
                            var Data = snapshot.child('Bot/Servidor/' + message.channel.guild.id + '/');
                            if (ment != undefined) {
                                setData.child('autorole').set(ment.id);
                                if (Data.child('ativarautorole').val()) {
                                    setData.child('ativarautorole').set(false);
                                    eris.createMessage(message.channel.id, `${ment.name} foi setado, como auto-role desativado.`);
                                } else {
                                    setData.child('ativarautorole').set(true);
                                    eris.createMessage(message.channel.id, `${ment.name} foi setado, como auto-role ativado.`);
                                }
                            } else {
                                eris.createMessage(message.channel.id, `${content} não é um cargo real.`);
                            }
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
        description: 'Defina um auto-role',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['ts']
    }
};