module.exports = {
    label: 'betroll',
    enabled: true,
    generator: async(eris, serverDB, channelDB, userDB, language, args, message) => {
        try {
            var a = userDB.model.money;
            var one = Math.floor(Math.random() * 10);
            var two = Math.floor(Math.random() * 10);
            var three = Math.floor(Math.random() * 10);
            var text1 = language.betroll.text1.replace("${one}", one).replace("${two}", two).replace("${three}", three).replace("${message.author.mention}", message.author.mention).replace("${content[1]*2}", args[0] * 2);
            var text2 = language.betroll.text2.replace("${one}", one).replace("${two}", two).replace("${three}", three).replace("${message.author.mention}", message.author.mention).replace("${content[1]}", args[0]);
            var text3 = language.betroll.text3.replace("${message.author.mention}", message.author.mention);
            if (a > args[0]) {
                if (one == two || two == three || three == one) {
                    eris.createMessage(message.channel.id, text1);
                    a += args[0] * 2;
                    await userDB.update({ "model.money": a });
                } else {
                    eris.createMessage(message.channel.id, text2);
                    a -= args[0];
                    await userDB.update({ "model.money": a });
                }
            } else {
                eris.createMessage(message.channel.id, text3);
            }
        } catch (err) {
            console.log(err);
        }
    }
};