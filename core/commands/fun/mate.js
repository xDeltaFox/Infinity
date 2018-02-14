module.exports = {
    label: 'mate',
    enabled: true,
    generator: async(eris, serverDB, channelDB, userDB, language, args, message) => {
        try {
            if (message.mentions[0]) {
                eris.sendChannelTyping(message.channel.id);
                var mate = message.mention
                if (mate == "") {
                    eris.createMessage(message.channel.id, 'Burro, mencione alguém.').then(message => setTimeout(function() { message.delete(); }, 5000));
                } else {
                    var aleatorio = [language.mate.txt1.replace("${message.author.username}", message.author.username).replace("${message.mentions[0].username}", message.mentions[0].username), language.mate.txt2.replace("${message.author.username}", message.author.username).replace("${message.mentions[0].username}", message.mentions[0].username)];
                    var qual = Math.floor(Math.random() * 2);
                    var qualconsequencia = Math.floor(Math.random() * 2);
                    var name = message.author.username;
                    eris.createMessage(message.channel.id, aleatorio[qual]).then(message => setTimeout(function() {
                        if (qual == 0) {
                            if (qualconsequencia == 0) {
                                eris.createMessage(message.channel.id, language.mate.consequencia1.replace("${name}", name));
                            } else {
                                eris.createMessage(message.channel.id, language.mate.consequencia3.replace("${name}", name));
                            }
                        } else {
                            if (qualconsequencia == 0) {
                                eris.createMessage(message.channel.id, language.mate.consequencia2.replace("${name}", name));
                            } else {
                                eris.createMessage(message.channel.id, language.mate.consequencia3.replace("${name}", name));
                            }
                        }
                    }, 5000));
                }
            } else {
                eris.createMessage(message.channel.id, "Quer que eu mate quem? Não sou nenhum adivinho.").then(message => setTimeout(function() { message.delete(); }, 5000));
            }
        } catch (err) {
            console.log(err);
        }
    }
};