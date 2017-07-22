let eris = require('../lib/client');
let firebase = require("firebase");
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

var db = firebase.database();
var ref = db.ref();

module.exports = {
    label: 'mute',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            if (message.channel.guild.members.get(message.author.id).permission.has('manageGuild')) {
                var content = message.content.split(' ');
                var setData = ref.child('Bot/Servidor/' + message.channel.guild.id + '/');
                if (message.mentions[0] != undefined) {
                    if (content[2] != undefined) {
                        ref.once("value")
                            .then(function(snapshot) {
                                var Data = snapshot.child('Bot/Servidor/' + message.channel.guild.id + '/');
                                if (Data.child('rolemute').val() != undefined) {
                                    message.channel.guild.addMemberRole(message.mentions[0].id, Data.child('rolemute').val());
                                    setTimeout(function() {
                                        message.channel.guild.removeMemberRole(message.mentions[0].id, Data.child('rolemute').val());
                                        eris.createMessage(message.channel.id, `${message.mentions[0].mention} seu castigo acabou, está livre.`);
                                    }, (content[2] * 60000));
                                    eris.createMessage(message.channel.id, `Mutei, ${message.mentions[0].username} daqui a ${content[2]} minuto(s) tá de volta fazendo merda de novo.`);
                                } else {
                                    eris.createMessage(message.channel.id, `Porque, você não seta o cargo de mute, antes de mutar alguém. Comando: >rolemute (nome do cargo)`);
                                }
                            });
                    }
                }
            } else {
                eris.createMessage(message.channel.id, ':fire: Vou te queimar, se continuar fazendo coisa que não deve. tem que ter a permissão `manageGuild`');
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