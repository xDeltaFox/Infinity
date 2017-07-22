let eris = require('../lib/client');
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

function format(seconds) {
    function pad(s) {
        return (s < 10 ? '0' : '') + s;
    }
    var hours = Math.floor(seconds / (60 * 60));
    var minutes = Math.floor(seconds % (60 * 60) / 60);
    var seconds = Math.floor(seconds % 60);

    if (hours > 0) {
        return pad(hours) + ' horas(s), ' + pad(minutes) + 'minuto(s), ' + pad(seconds) + 'segundo(s)';
    } else {
        return pad(minutes) + ' minuto(s), ' + pad(seconds) + ' segundo(s)';
    }
}

module.exports = {
    label: 'uptime',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            if (message.author.id == '238975494047924224') {
                eris.createMessage(message.channel.id, "Ao vivo há " + format(process.uptime()));
            } else {
                switch (message.channel.guild.region) {
                    case "brazil":
                        eris.createMessage(message.channel.id, ":no_entry_sign:" + " Sem Permissão.").then(message => setTimeout(function() { message.delete(); }, 5000));
                        break;
                    case "us-central":
                        eris.createMessage(message.channel.id, ":no_entry_sign:" + " without permission.").then(message => setTimeout(function() { message.delete(); }, 5000));
                        break;
                    default:
                        eris.createMessage(message.channel.id, ":no_entry_sign:" + " without permission.").then(message => setTimeout(function() { message.delete(); }, 5000));
                }
            }
        } catch (err) {
            eris.createMessage(config.logChannel, `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:${this.label}\n\t>> ${err.response}\n\t${err.stack}`);
        }
    },
    options: {
        description: 'Descrição',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['ut']
    }
};