let client = require("../../client");
let eris = client.eris;
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let gear = require("../../utils/gearboxes");

module.exports = {
    label: 'lang',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[`" + message.channel.guild.name + "`" + "~>" + "`" + message.channel.name + "`]" + "**" + message.author.username + "**:" + message.content);
            var content = message.content.split(' ');
            var Server = message.channel.guild;
            var Channel = message.channel;
            var Author = message.author;
            if (Author.bot) return;
            var MSG = message.content;
            var lang = gear.DB.get(Server.id).modules.lang;

            //--------------MAGIC------------------
            switch (content[1]) {
                case 'en':
                case 'en-us':
                    gear.guildDefine(Server, 'lang', 'en-us');
                    eris.createMessage(message.channel.id, `Ready. Now I speak English American, because on the part of England, few are worried.`);
                    break;
                case 'pt':
                case 'pt-br':
                    gear.guildDefine(Server, 'lang', 'pt-br');
                    eris.createMessage(message.channel.id, `Pronto. Agora falo português do brasil, mas... porque não o português de portugal? tá iginorando esse país maravilhoso?`);
                    break;
                default:
                    gear.guildDefine(Server, 'lang', 'pt-br');
                    eris.createMessage(message.channel.id, `Mas que lingua... seria essa? Eu não entendo, prefiro 1000 vezes o português do brasil.`);
                    break;
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