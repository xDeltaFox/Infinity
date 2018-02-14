let random = require("random-animal")

module.exports = {
    label: 'random',
    enabled: true,
    generator: async(eris, serverDB, channelDB, userDB, language, args, message) => {
        try {
            var Server = message.channel.guild;
            var Channel = message.channel;
            var Author = message.author;
            var Member = message.member;
            var MSG = message.content;
            var args = message.content.slice(message.content.split(' ')[0].length + 1).split(' ');

            //-----------------MAGIC---------------------

            switch (args[0]) {
                case 'cat':
                    random.cat().then(url => {
                        message.channel.createMessage({
                            embed: {
                                author: {
                                    name: eris.user.username,
                                    icon_url: eris.user.avatarURL,
                                    url: "https://github.com/xDeltaFox/Infinity"
                                },
                                color: 152689,
                                image: {
                                    url: url
                                }
                            }
                        });
                    });
                    break;
                case 'dog':
                    random.dog().then(url => {
                        message.channel.createMessage({
                            embed: {
                                author: {
                                    name: eris.user.username,
                                    icon_url: eris.user.avatarURL,
                                    url: "https://github.com/xDeltaFox/Infinity"
                                },
                                color: 152689,
                                image: {
                                    url: url
                                }
                            }
                        });
                    });
                    break;
                default:
                    message.channel.createMessage('Não sei que animal é esse, mas só posso mostrar imagens de `cat` ou `dog`, por enquanto.');
                    break;
            }
        } catch (err) {
            console.log(err);
        }
    }
};