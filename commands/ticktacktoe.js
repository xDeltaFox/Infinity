let eris = require('../lib/client');
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

let partida = {
    P1: {
        id: '',
        xo: ''
    },
    P2: {
        id: '',
        xo: ''
    }
};


module.exports = {
    label: 'ticktacktoe',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[```" + message.channel.guild.name + "```" + "~>" + "```" + message.channel.name + "```]" + "**" + message.author.username + "**:" + message.content);
            message.channel.createMessage("Quer jogar **PVP** ou **PVC**?");
            message.channel.awaitMessages(m => m.content == "PVP" || m.content == "PVC", { time: 10000, maxMatches: 1 }).then(responses => {
                try {
                    if (responses[0].content == "PVP" && responses[0].author.id == message.author.id) {
                        message.channel.createMessage("Você escolheu **PVP**");
                    } else if (responses[0].content == "PVC" && responses[0].author.id == message.author.id) {
                        message.channel.createMessage("Você escolheu **PVC**");
                    }
                } catch (e) {
                    message.channel.createMessage("Me chama, e fica inativo me deixando no vacuo, muito obrigrado por nada. " + message.author.mention);
                }
            });
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