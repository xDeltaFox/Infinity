let eris = require('../lib/client');
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

module.exports = {
    label: 'roleadd',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[```" + message.channel.guild.name + "```" + "~>" + "```" + message.channel.name + "```]" + "**" + message.author.username + "**:" + message.content);
            var cargao = message.content.split(' ');
            if (message.channel.guild.members.get(eris.user.id).permission.has('manageRoles')) {
                var ment = eris.guilds.get(message.channel.guild.id).roles.find(name => name.name.toLowerCase() == cargao[1].toLowerCase());
                if (ment != undefined) {
                    // if (ment.permission.has('administrator') || ment.permission.has('banMembers') || ment.permission.has('kickMembers')) {
                    //     bot.createMessage(message.channel.id, `${ment.name} não pode ser adicionado, porque contém permissões especiais.`);
                    // } else {
                    message.channel.guild.addMemberRole(message.author.id, ment.id);
                    eris.createMessage(message.channel.id, `${ment.name} adicionado!`).then(message => setTimeout(function() { message.delete(); }, 5000));
                    message.delete();
                    // }
                }
            } else {
                eris.createMessage(message.channel.id, `Preciso da permissão "manageRoles"`).then(message => setTimeout(function() { message.delete(); }, 5000));
                message.delete();
            }
        } catch (err) {
            eris.createMessage(config.logChannel, `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:${this.label}\n\t>> ${err.response}\n\t${err.stack}`);
        }
    },
    options: {
        description: 'Adicione um cargo',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['ts']
    }
};