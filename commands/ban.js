let eris = require('../lib/client');
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

module.exports = {
    label: 'ban',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            if (message.channel.guild.members.get(message.author.id).permission.has('manageGuild')) {
                var ment = message.mentions;
                var content = message.content.split(' ');
                if (message.mentions[0] != undefined || content[2] != undefined) {
                    message.channel.guild.banMember(ment[0].id, 7, content[2]);
                    eris.createMessage(message.channel.id, `Bani ${ment[0].username}, e taquei fogo nas menssagens dele. :fire:\nRasão: ${content[2]}`);
                } else {
                    eris.createMessage(message.channel.id, ":no_entry_sign: Errow, mencione alguém, besta.").then(message => setTimeout(function() { message.delete(); }, 5000));
                }
            } else {
                eris.createMessage(message.channel.id, ':fire: Vou te queimar, se continuar fazendo coisa que não deve. tem que ter a permissão `manageGuild`').then(message => setTimeout(function() { message.delete(); }, 5000));
            }
        } catch (err) {
            eris.createMessage(config.logChannel, `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:${this.label}\n\t>> ${err.response}\n\t${err.stack}`);
        }
    },
    options: {
        description: 'Bana alguén',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['ban']
    }
};