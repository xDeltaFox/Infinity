let eris = require('../lib/client');
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

module.exports = {
    label: 'suicidio',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[`" + message.channel.guild.name + "`" + "~>" + "`" + message.channel.name + "`]" + "**" + message.author.username + "**:" + message.content);
            var imagem = ["https://media.giphy.com/media/ENB1fIlVnMRcQ/giphy.gif", "https://media.giphy.com/media/xuDHhHcCR0rew/giphy.gif", "https://media.giphy.com/media/l2JeiuwmhZlkrVOkU/giphy.gif", "https://media.giphy.com/media/jSxK33dwEMbkY/giphy.gif", "https://media.giphy.com/media/vkwAeqMEUSaoU/giphy.gif"];

            message.channel.createEmbed()
                .color(Math.floor(Math.random() * 16777216))
                .title(message.author.username + " cometeu suicidio")
                .image(imagem[Math.floor(Math.random() * 5)])
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