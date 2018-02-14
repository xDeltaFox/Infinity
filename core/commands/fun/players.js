module.exports = {
    label: 'jogando',
    enabled: true,
    generator: async(eris, serverDB, channelDB, userDB, language, args, message) => {
        try {
            var Server = message.channel.guild;
            var Channel = message.channel;
            var Author = message.author;
            var Member = message.member;
            var MSG = message.content;
            var args2 = MSG.slice(9);

            var userItem = [];
            var user = [];
            var fields = "";
            var game = "";
            if (Member.game == null) {
                game = "Nada";
            } else {
                game = Member.game.name;
            }

            if (args2 != undefined) {
                game = args2;
            }

            Channel.sendTyping();
            eris.guilds.map(guild => {
                guild.members.map(member => {
                    if (member.game != null) {
                        userItem.discriminator = member.discriminator;
                        userItem.username = member.username;
                        userItem.game = member.game.name;
                        if (user.indexOf(userItem.username) == -1) {
                            user.push(userItem);
                        }
                        userItem = [];
                    } else {
                        userItem.discriminator = member.discriminator;
                        userItem.username = member.username;
                        userItem.game = "Nada";
                        if (user.indexOf(userItem.username) == -1) {
                            user.push(userItem);
                        }
                        userItem = [];
                    }
                });
            });
            var t = 0;
            for (var i = 0; i < user.length; i++) {
                if (t < 30) {
                    if (user[i].game == game) {
                        if (!fields.includes(user[i].username)) {
                            // console.log(`${t+1}: ${user[i].username}#${user[i].discriminator}`);
                            fields += `${t+1}: ${user[i].username}#${user[i].discriminator} está jogando ${user[i].game}\n`;
                            t++;
                        }
                    }
                }
            }
            if (fields != "") {
                eris.createMessage(message.channel.id, "```css\n" + fields + "\n```");
            } else {
                eris.createMessage(message.channel.id, `Não achei ninguém com esse jogo <:blobtilt:343886974995660802>`);
            }
        } catch (err) {
            console.log(err);
        }
    }
};