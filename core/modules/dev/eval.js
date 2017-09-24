let client = require("../../client");
let eris = client.eris;
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let util = require('util');

module.exports = {
    label: 'execute',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            if (message.author.id == '238975494047924224') {
                if (message.content.length <= 8) {
                    eris.createMessage(message.channel.id, "Era pra ter algo aqui?").then(message => setTimeout(function() { message.delete(); }, 5000));
                } else {
                    var Comando = message.content.slice(9);
                    var reg = new RegExp("token");
                    var reg1 = new RegExp("os");
                    var reg2 = new RegExp("hostname");
                    var reg3 = new RegExp("process");
                    var reg4 = new RegExp("require('regedit')");
                    if (reg.test(Comando) || reg2.test(Comando) || reg3.test(Comando)) {
                        eris.createMessage(message.channel.id, "Tentando fazer coisa que não deve, bem, você falhou!");
                    } else {
                        try {
                            let insp = util.inspect(eval(Comando), { depth: 0 });
                            eris.createMessage(message.channel.id, ":inbox_tray: Input:\n" + "```js\n" + Comando + "```\n" + ":outbox_tray: Output:\n" + "```\n" + eval(Comando) + "```\n" + "Inspect:\n" + "```json\n" + insp.toString() + "```\n");
                        } catch (err) {
                            eris.createMessage(message.channel.id, ":x: " + err.name + ": " + err.message);
                        }
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