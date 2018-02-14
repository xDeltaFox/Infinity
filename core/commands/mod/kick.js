module.exports = {
    label: 'kick',
    enabled: true,
    generator: async(eris, serverDB, channelDB, userDB, language, args, message) => {
        try {
            var Server = message.channel.guild;
            var Channel = message.channel;
            var Author = message.author;
            var Target = message.mentions;
            var Member = message.member;

            //-----------------MAGIC---------------------
            if (message.channel.guild.members.get(message.author.id).permission.has('manageGuild')) {
                if (Target[0] != undefined || args[1] != undefined) {
                    var txt = language.kick.replace("${ment[0].username}", Target[0].username).replace("${content[2]}", args[1]);
                    message.channel.guild.kickMember(Target[0].id, args[1]).catch(err => {
                        if (err.message.includes("Privilege is too low")) {
                            return eris.createMessage(message.channel.id, language.Privilegelow);
                        }
                    });
                    eris.createMessage(message.channel.id, txt);
                } else {
                    eris.createMessage(message.channel.id, language.err.text3).then(message => setTimeout(function() { message.delete(); }, 5000));
                }
            } else {
                eris.createMessage(message.channel.id, language.err.text2.replace("/perm/", "Kick Members")).then(message => setTimeout(function() { message.delete(); }, 5000));
            }
        } catch (err) {
            console.log(err);
        }
    }
};