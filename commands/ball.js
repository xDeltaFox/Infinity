let eris = require('../lib/client');
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

module.exports = {
    label: 'diga-me',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.sendChannelTyping(message.channel.id);
            var resposta = ["Nao tenho certeza disso", "Talvez", "Parece que sim", "Tenho certeza que nao", "Pois é, Parece que sim", "Com toda a certeza", "Claro que sim, Voce ainda acha que nao?", "Pergunte mais tarde.", "Nao pergunte o que nao quer ouvir", "Voce nao precisa saber disso!", "Sinto que se isso acontecer muita coisa vai mudar"];
            var quem = ["Quem, não entendo?", "Você não iria gostar da resposta.", "Claro, que sim.", "não acho uma boa ideia.", "Por que tá me perguntando se não cabe a mim responder."];
            var vc = ["Não vou responder a essa pergunta.", "Eu não posso responder"];
            var eu = ["Talvez, mas acho que tem coisa.", "Isso é bem obivio.", "Sim, mas não diria que seja totalmente verdade."];
            if (message.content.length <= 8) {
                return ":x: Pregunte algo.";
            } else {
                if ((message.content.indexOf("quem") == 0) && (message.content.indexOf("eu") == 0)) {
                    return ":8ball: " + eu[Math.floor(Math.random() * eu.length)];
                } else {
                    if (message.content.indexOf("quem") == 0) {
                        return ":8ball: " + quem[Math.floor(Math.random() * quem.length)];
                    } else {
                        if (message.content.indexOf("você") == 0) {
                            return ":8ball: " + vc[Math.floor(Math.random() * vc.length)];
                        } else {
                            return ":8ball: " + resposta[Math.floor(Math.random() * resposta.length)];
                        }
                    }
                }
            }
        } catch (err) {
            eris.createMessage(config.logChannel, `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:${this.label}\n\t>> ${err.response}\n\t${err.stack}`);
        }
    },
    options: {
        description: 'Pergunte ao Infinity',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['ball']
    }
};