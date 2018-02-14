'use strict';

module.exports = {
    label: 'eval',
    enabled: true,
    generator: async(eris, serverDB, channelDB, userDB, language, args, message) => {
        try {
            var args = message.content.split(/\s+/).slice(1).join(" ").toLowerCase()
            var Server = message.channel.guild;
            var Channel = message.channel;
            var Author = message.author;
            var Target = message.mentions;
            var Member = message.member;

            if (message.author.id == '238975494047924224') {
                var Comando = message.content.slice(message.content.split(' ')[0].length + 1);
                if (Comando == undefined) {
                    eris.createMessage(message.channel.id, "Era pra ter algo aqui?").then(message => setTimeout(function() { message.delete(); }, 5000));
                } else {
                    try {
                        eris.createMessage(message.channel.id, ":inbox_tray: Input:\n" + "```js\n" + Comando + "```\n" + ":outbox_tray: Output:\n" + "```\n" + eval(Comando) + "```\n");
                    } catch (err) {
                        eris.createMessage(message.channel.id, ":x: " + err.name + ": " + err.message + " (" + Comando + ")");
                    }
                }
            } else {
                eris.createMessage(message.channel.id, "Não vou fazer nada, porque você não é xDeltaFox");
            }
        } catch (err) {
            console.log(err);
        }
    }
};