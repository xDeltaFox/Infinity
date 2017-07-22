let eris = require('../lib/client');
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

module.exports = {
    label: 'perigo',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.sendChannelTyping(message.channel.id);
            var numero = Math.floor(Math.random() * 240);
            var aleatorio = ["está calmo, agora ver se não estraga tudo, vlw.", "...? não reconheço esse chat, não direi nada.", "tem alguém jogando merda no ventilador.", "tem um maniaco aqui, SOCORRO!!! Tem um monte de vagabundos online, e ninguem faz nada?!", "CHEGA!! Vou tacar fogo desse chat. :fire:"];
            if (numero <= 60) {
                eris.createMessage(message.channel.id, ":no_entry_sign: |  **Gravidade desse chat: (" + numero + "%)**\n" + "**" + message.channel.name + "** " + aleatorio[0]);
            }
            if (numero >= 60 && numero <= 100) {
                eris.createMessage(message.channel.id, ":no_entry_sign: |  **Gravidade desse chat: (" + numero + "%)**\n" + "**" + message.channel.name + "** " + aleatorio[1]);
            }
            if (numero >= 100 && numero <= 150) {
                eris.createMessage(message.channel.id, ":no_entry_sign: |  **Gravidade desse chat: (" + numero + "%)**\n" + "**" + message.channel.name + "** " + aleatorio[2]);
            }
            if (numero >= 150 && numero <= 210) {
                eris.createMessage(message.channel.id, ":no_entry_sign: |  **Gravidade desse chat: (" + numero + "%)**\n" + "**" + message.channel.name + "** " + aleatorio[3]);
            }
            if (numero >= 210 && numero <= 240) {
                eris.createMessage(message.channel.id, ":no_entry_sign: |  **Gravidade desse chat: (" + numero + "%)**\n" + "**" + message.channel.name + "** " + aleatorio[4]);
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