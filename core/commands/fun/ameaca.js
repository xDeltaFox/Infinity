module.exports = {
    label: 'ameaça',
    enabled: true,
    generator: async(eris, serverDB, channelDB, userDB, language, args, message) => {
        try {
            var Server = message.channel.guild;
            var Channel = message.channel;
            var Author = message.author;

            //-----------------MAGIC---------------------
            eris.sendChannelTyping(message.channel.id);
            var errtext = language.err.text1;

            function greelang(n) {
                return language.ameaça.main.replace("${numero}", numero).replace("${message.mentions[0].username}", message.mentions[0].username).replace("${aleatorio[0]}", aleatorio[n])
            }

            var numero = Math.floor(Math.random() * 240);
            var aleatorio = [language.ameaça.texto1, language.ameaça.texto2, language.ameaça.texto3, language.ameaça.texto4, language.ameaça.texto5];
            if (message.mentions[0] != undefined) {
                if (numero <= 60) {
                    eris.createMessage(message.channel.id, greelang(0));
                }
                if (numero >= 60 && numero <= 100) {
                    eris.createMessage(message.channel.id, greelang(1));
                }
                if (numero >= 100 && numero <= 150) {
                    eris.createMessage(message.channel.id, greelang(2));
                }
                if (numero >= 150 && numero <= 210) {
                    eris.createMessage(message.channel.id, greelang(3));
                }
                if (numero >= 210 && numero <= 240) {
                    eris.createMessage(message.channel.id, greelang(4));
                }
            } else {
                eris.createMessage(message.channel.id, errtext).then(message => setTimeout(function() { message.delete(); }, 5000));
            }
        } catch (err) {
            console.log(err);
        }
    }
};