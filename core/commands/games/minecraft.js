let request = require('request');
let ping = require('mc-hermes');

module.exports = {
    label: 'minecraft',
    enabled: true,
    generator: async(eris, serverDB, channelDB, userDB, language, args, message) => {
        try {
            var args = message.content.split(/\s+/).slice(1).join(" ").toLowerCase()
            var Channel = message.channel;
            var Author = message.author;
            var Target = message.mentions;
            var Member = message.member;
            var MSG = message.content;
            var content = message.content.slice(message.content.split(' ')[0].length + 1);

            //-----------------MAGIC---------------------

            if (content.indexOf('.') == -1) return eris.createMessage(message.channel.id, "Erro || Argumento requirido IP não é informado. Exemplo: ``mc.hypixel.net``");
            message.channel.sendTyping();

            var query_info = content;
            ping.pc({ server: query_info }).then((data) => {
                message.channel.createMessage({
                    embed: {
                        color: 0x426830,
                        fields: [{
                            name: "Version:",
                            value: data.version.name,
                            inline: false
                        }, {
                            name: "Protocol:",
                            value: data.version.protocol,
                            inline: false
                        }, {
                            name: "Players:",
                            value: data.players.online + " players online de " + data.players.max,
                            inline: false
                        }],
                        image: {
                            url: "https://use.gameapis.net/mc/query/banner/" + content + "/night"
                        },
                        footer: {
                            name: "Infinity foi criado por xDeltaFox",
                            avatarURL: message.author.avatarURL
                        }
                    }
                });
            });
        } catch (err) {
            console.log(err);
        }
    }
};