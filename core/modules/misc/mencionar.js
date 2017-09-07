let client = require("../client");
let eris = client.eris;
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let locale = require('../utils/lang');
let base64Img = require('base64-img');
let pixelUtil = require('pixel-util');

module.exports = {
    label: 'mencionar',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[`" + message.channel.guild.name + "`" + "~>" + "`" + message.channel.name + "`]" + "**" + message.author.username + "**:" + message.content);
            // if (message.author.id != "238975494047924224") {
            //     eris.createMessage(message.channel.id, `Comando ainda em desemvolvimento, não perturbe.`);
            // } else {
            var args1 = message.content.split(' ')[1];
            if (args1 != undefined) {
                var getmessage = eris.getMessage(message.channel.id, args1).then(msg => {
                    base64Img.requestBase64(message.author.avatarURL, function(err, res, body) {
                        var options;
                        if (msg.embeds != undefined) {
                            options = {
                                content: msg.content,
                                embeds: msg.embeds
                            };
                        } else {
                            options = {
                                content: msg.content
                            };
                        }

                        eris.createChannelWebhook(message.channel.id, { name: message.author.username, avatar: body }).then(webhook => {
                            //console.log(webhook);
                            eris.executeWebhook(webhook.id, webhook.token, options);
                            setTimeout(function() {
                                eris.deleteWebhook(webhook.id);
                            }, 5000);
                        });
                    });
                }).catch(err => {
                    eris.createMessage(message.channel.id, `${message.author.mention} - Isso não é um id de mensagem.`);
                    return;
                });
            } else {
                eris.createMessage(message.channel.id, `PAROU, cadê o id da mensagem?`);
            }
            // }
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