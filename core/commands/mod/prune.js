'use strict';

module.exports = {
    label: 'prune',
    enabled: true,
    generator: async(eris, serverDB, channelDB, userDB, language, args, message) => {
        try {
            //Set Them Up
            var Server = message.channel.guild;
            var Channel = message.channel;
            var Author = message.author;
            var Target = message.mentions;
            var Member = message.member;

            var cont = message.content.slice(message.content.split(' ')[0].length + 1);
            eris.purgeChannel(message.channel.id, cont);
            eris.createMessage(message.channel.id, language.prune.replace("/COUNT/", cont));
        } catch (err) {
            eris.createMessage(config.logChannel, "```\n" + `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:prune\n\t>> ${err.response}\n\t${err.stack}` + "\n```");
        }
    }
};