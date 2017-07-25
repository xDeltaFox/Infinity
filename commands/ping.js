let eris = require('../lib/client');
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

module.exports = {
    label: 'ping',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[```" + message.channel.guild.name + "```" + "~>" + "```" + message.channel.name + "```]" + "**" + message.author.username + "**:" + message.content);
            eris.createMessage(message.channel.id, 'Pinging...').then(msg => setTimeout(function() { msg.edit(`:ping_pong: Que ping... ${msg.timestamp - message.timestamp}ms`) }, 1000));
        } catch (err) {
            eris.createMessage(config.logChannel, `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:${this.label}\n\t>> ${err.response}\n\t${err.stack}`);
        }
    },
    options: {
        description: 'Veja a latencia do bot',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['ping']
    }
};