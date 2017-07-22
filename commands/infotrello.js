let eris = require('../lib/client');
let request = require("request");
let moment = require("moment");
let tz = require("moment-timezone");
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

module.exports = {
    label: 'infotrello',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            request({ url: 'https://trello.com/b/G2Zgq6fX/reports.json', json: true }, function(err, resp, body) {
                if (!err && resp.statusCode == 200) {
                    message.channel.createEmbed()
                        .author(`Informações do Trello: ${body.name} <${body.id}>`, 'https://a.trellocdn.com/images/ios/0307bc39ec6c9ff499c80e18c767b8b1/apple-touch-icon-152x152-precomposed.png')
                        .color(Math.floor(Math.random() * 16777216))
                        .field('Descrição', body.desc ? "" : "Não tem nada, para exibir.", false)
                        .footer(moment().tz('America/Sao_Paulo').format('LLLL'))
                        .send()
                } else {
                    eris.createMessage(message.channel.id, `OPS! Você me quebrou.`);
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