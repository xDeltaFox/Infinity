let eris = require('../lib/client');
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

module.exports = {
    label: 'suicidio',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[```" + message.channel.guild.name + "```" + "~>" + "```" + message.channel.name + "```]" + "**" + message.author.username + "**:" + message.content);
            var imagem = ["https://cdn.discordapp.com/attachments/265835852075237377/294061883642740736/2zxRnX7.gif", "https://media.giphy.com/media/xuDHhHcCR0rew/giphy.gif"];

            message.channel.createEmbed()
                .color(Math.floor(Math.random() * 16777216))
                .title(message.author.username + " cometeu suicidio")
                .image(imagem[Math.floor(Math.random() * 2)])
                .send()
        } catch (err) {
            eris.createMessage(config.logChannel, `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:${this.label}\n\t>> ${err.response}\n\t${err.stack}`);
        }
    },
    options: {
        description: 'Cometa suicidio',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['ts']
    }
};