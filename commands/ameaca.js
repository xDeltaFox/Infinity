let eris = require('../lib/client');
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

module.exports = {
    label: 'ameaça',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            //eris.sendChannelTyping(message.channel.id);
            var numero = Math.floor(Math.random() * 240);
            var aleatorio = ["é um ninguém. Então nada será feito, pra sua sorte, seu safado.", "é suspeito de um crime que ocorreu, há uns dias. Então nosso umpas lupas ficaram na sua cola, pro caso de você resolva matar alguém.", "está planejando a dominação do mundo. É bom alguém para-lo, antes que eu taque fogo na porra toda. :fire:", "é a pessoa mais procurada da policia federal. Cacete tem um monte de vagabundos online, e ninguém faz porra nenhuma.", "queime, queime descraçado. :fire: nenhum procurado pela Interpol vai passa por mim, e ficar impune, seu merda."];
            if (message.mentions[0] != undefined) {
                if (numero <= 60) {
                    eris.createMessage(message.channel.id, `:gun:  |  **Gravidade do Crime: (${numero}%)**\n**${message.mentions[0].username}** ${aleatorio[0]}`);
                }
                if (numero >= 60 && numero <= 100) {
                    eris.createMessage(message.channel.id, `:gun:  |  **Gravidade do Crime: (${numero}%)**\n**${message.mentions[0].username}** ${aleatorio[1]}`);
                }
                if (numero >= 100 && numero <= 150) {
                    eris.createMessage(message.channel.id, `:gun:  |  **Gravidade do Crime: (${numero}%)**\n**${message.mentions[0].username}** ${aleatorio[2]}`);
                }
                if (numero >= 150 && numero <= 210) {
                    eris.createMessage(message.channel.id, `:gun:  |  **Gravidade do Crime: (${numero}%)**\n**${message.mentions[0].username}** ${aleatorio[3]}`);
                }
                if (numero >= 210 && numero <= 240) {
                    eris.createMessage(message.channel.id, `:gun:  |  **Gravidade do Crime: (${numero}%)**\n**${message.mentions[0].username}** ${aleatorio[4]}`);
                }
            } else {
                eris.createMessage(message.channel.id, "Burro, mencione alguém.").then(message => setTimeout(function() { message.delete(); }, 5000));
            }
        } catch (err) {
            eris.createMessage(config.logChannel, `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:${this.label}\n\t>> ${err.response}\n\t${err.stack}`);
        }
    },
    options: {
        description: 'Classifica seu grau de criminalidade',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['ts']
    }
};