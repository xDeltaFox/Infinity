module.exports = {
    label: 'discrim',
    enabled: true,
    generator: async(eris, serverDB, channelDB, userDB, language, args, message) => {
        try {
            var args = message.content.split(/\s+/).slice(1).join(" ").toLowerCase()
            var Channel = message.channel;
            var Author = message.author;
            var Target = message.mentions;
            var Member = message.member;
            var MSG = message.content;
            var content = message.content.split(' ');

            //-----------------MAGIC---------------------

            var userItem = [];
            var user = [];
            var fields = "";
            var discrim = Author.discriminator;

            if (content[1] != undefined) {
                discrim = content[1];
                if (args2.length != 4) {
                    return eris.createMessage(Channel.id, `${Author.mention} - isso não é um descriminador` + "`" + content[1] + "`")
                }
            }

            eris.users.forEach(e => {
                userItem.discriminator = e.discriminator;
                userItem.username = e.username;

                user.push(userItem);
                userItem = [];
            });

            var t = 0;
            for (var i = 0; i < user.length; i++) {
                if (t < 30) {
                    if (user[i].discriminator == discrim) {
                        // console.log(`${t+1}: ${user[i].username}#${user[i].discriminator}`);
                        fields += `${t+1}: ${user[i].username}#${user[i].discriminator}\n`;
                        t++;
                    }
                }
            }

            eris.createMessage(message.channel.id, "```css\n" + fields + "\n```");
        } catch (err) {
            console.log(err);
        }
    }
};