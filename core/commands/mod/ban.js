'use strict';

module.exports = {
    label: 'ban',
    enabled: true,
    generator: async(eris, serverDB, channelDB, userDB, language, args, message) => {
        try {
            //Set Them Up
            var Server = message.channel.guild;
            var Channel = message.channel;
            var Author = message.author;
            var Target = message.mentions;
            var Member = message.member;
            var motivo = message.content.slice(message.content.split(' ')[0].length + 1).split(' ')[1];

            //-----------------MAGIC---------------------
            if (message.channel.guild.members.get(message.author.id).permission.has('manageGuild')) {
                if (Target[0] != undefined && motivo != undefined) {
                    message.channel.guild.banMember(Target[0].id, 7, motivo).catch(err => {
                        if (err.message.includes("Privilege is too low")) {
                            return eris.createMessage(message.channel.id, language.Privilegelow);
                        }
                    });
                    eris.createMessage(message.channel.id, language.ban.text1.replace("/USER/", Target[0].username).replace("/MOTIVO/", motivo));
                } else {
                    eris.createMessage(message.channel.id, language.ban.text2).then(message => setTimeout(function() { message.delete(); }, 5000));
                }
            } else {
                eris.createMessage(message.channel.id, language.err.text2.replace("/perm/", "Ban Member")).then(message => setTimeout(function() { message.delete(); }, 5000));
            }
        } catch (err) {
            console.log(err);
        }
    }
};