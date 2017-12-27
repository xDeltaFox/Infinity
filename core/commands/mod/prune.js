var Eris = require('../../infinity.js');
var eris = Eris.eris;
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

module.exports = {
    label: 'prune',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[`" + message.channel.guild.name + "`" + "~>" + "`" + message.channel.name + "`]" + "**" + message.author.username + "**:" + message.content);
            var cont = message.content.slice(8);
            eris.purgeChannel(message.channel.id, cont);
            switch (message.channel.guild.region) {
                case "brazil":
                    eris.createMessage(message.channel.id, "Foi deletado " + cont + " menssages.")
                    break;
                case "us-central":
                    eris.createMessage(message.channel.id, "It has been deleted " + cont + " posts.")
                    break;
                default:
                    eris.createMessage(message.channel.id, "It has been deleted " + cont + " posts.")
            }
        } catch (err) {
            eris.createMessage(config.logChannel, "```\n" + `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:prune\n\t>> ${err.response}\n\t${err.stack}` + "\n```");
        }
    },
    options: {
        description: 'Varra o chat',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['purge']
    }
};