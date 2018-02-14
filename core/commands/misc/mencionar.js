let base64Img = require('base64-img');
let pixelUtil = require('pixel-util');

module.exports = {
    label: 'mencionar',
    enabled: true,
    generator: async(eris, serverDB, channelDB, userDB, language, args, message) => {
        try {
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
                });
            } else {
                eris.createMessage(message.channel.id, `PAROU, cadê o id da mensagem?`);
            }
        } catch (err) {
            console.log(err);
        }
    }
};