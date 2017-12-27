var Eris = require('../../infinity.js');
var eris = Eris.eris;
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

module.exports = {
    label: 'execute',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            message.delete();
            if (message.author.id == '238975494047924224') {
                if (message.content.length <= 8) {
                    eris.createMessage(message.channel.id, "Era pra ter algo aqui?").then(message => setTimeout(function() { message.delete(); }, 5000));
                } else {
                    var Comando = message.content.slice(9);
                    try {
                        eris.createMessage(message.channel.id, ":inbox_tray: Input:\n" + "```js\n" + Comando + "```\n" + ":outbox_tray: Output:\n" + "```\n" + eval(Comando) + "```\n");
                    } catch (err) {
                        eris.createMessage(message.channel.id, ":x: " + err.name + ": " + err.message);
                    }
                }
            } else {
                eris.createMessage(message.channel.id, "Não vou fazer nada, porque você não é xDeltaFox");
            }
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