let imgur = require("imgur-node-api");
imgur.setClientID(config.imgur.id);

module.exports = {
    label: 'imgur',
    enabled: true,
    generator: async(eris, serverDB, channelDB, userDB, language, args, message) => {
        try {
            var Server = message.channel.guild;
            var Channel = message.channel;
            var Author = message.author;
            var Target = message.mentions;
            var Member = message.member;
            var MSG = message.content;

            //-----------------MAGIC---------------------

            if (message.attachments.length > 0) {
                let url = message.attachments[0].url;
                try {
                    imgur.upload(url, (err, res) => {
                        if (err) {
                            throw err;
                        } else {
                            eris.createMessage(message.channel.id, `<${res.data.link}>`);
                        }
                    });
                } catch (err) {
                    eris.createMessage(message.channel.id, "Imgur provavelmente está com problemas, __ **novamente** __. *Ufa* 🙄");
                }
            } else {
                eris.createMessage(message.channel.id, `${message.author.mention} Anexe uma imagem ou inclua uma URL da imagem na próxima vez 🌅`);
            }
        } catch (err) {
            console.log(err);
        }
    },
    options: {
        description: 'Descrição',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['ts']
    }
};