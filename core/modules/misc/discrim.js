let client = require("../client");
let eris = client.eris;
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let locale = require('../utils/lang');

module.exports = {
    label: 'discrim',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[`" + message.channel.guild.name + "`" + "~>" + "`" + message.channel.name + "`]" + "**" + message.author.username + "**:" + message.content);
            if (message.author.id != "238975494047924224") {
                eris.createMessage(message.channel.id, `Comando ainda em desemvolvimento, não perturbe.`);
            } else {
                var args2 = message.content.split(' ')[1];

                var userItem = [];
                var user = [];
                var fields = "";
                var discrim = message.author.discriminator;

                if (args2 != undefined) {
                    discrim = args2;
                    if (args2.length != 4) {
                        return eris.createMessage(message.channel.id, `${message.author.mention} - isso não é um descriminador` + "`" + args2 + "`")
                    }
                }

                eris.users.forEach(e => {
                    userItem.discriminator = e.discriminator;
                    userItem.username = e.username;

                    user.push(userItem);
                    userItem = [];
                });

                // console.log(args2);

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
            }
        } catch (err) {
            eris.createMessage(config.logChannel, `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:${this.label}\n\t>> ${err.response}\n\t${err.stack}`);
        }
    },
    options: {
        description: 'Descrição',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['ts']
    }
};