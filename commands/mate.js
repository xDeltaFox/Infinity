let eris = require('../lib/client');
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

module.exports = {
    label: 'mate',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[`" + message.channel.guild.name + "`" + "~>" + "`" + message.channel.name + "`]" + "**" + message.author.username + "**:" + message.content);
            if (message.mentions[0]) {
                eris.sendChannelTyping(message.channel.id);
                var mate = message.mention
                if (mate == "") {
                    eris.createMessage(message.channel.id, 'Burro, mencione alguém.').then(message => setTimeout(function() { message.delete(); }, 5000));
                } else {
                    var imagem = ["https://cdn.discordapp.com/attachments/265835852075237377/294061897030959105/tumblr_n0r4q31wmD1s8ggpqo1_500.gif", "https://cdn.discordapp.com/attachments/265835852075237377/294061988517249024/wzEZrhB.gif"];
                    var aleatorio = [message.author.username + " matou " + message.mentions[0].username, message.author.username + " falhou em matar " + message.mentions[0].username];
                    var qual = Math.floor(Math.random() * 2);
                    var qualconsequencia = Math.floor(Math.random() * 2);
                    var name = message.author.username;
                    eris.createMessage(message.channel.id, {
                        embed: {
                            color: Math.floor(Math.random() * 16777216),
                            title: aleatorio[qual],
                            image: {
                                url: imagem[qual]
                            }
                        }
                    }).then(message => setTimeout(function() {
                        if (qual == 0) {
                            if (qualconsequencia == 0) {
                                eris.createMessage(message.channel.id, "**" + name + "** foi preso por assassinato");
                            } else {
                                eris.createMessage(message.channel.id, "**" + name + "** fugiu das autoridades locais");
                            }
                        } else {
                            if (qualconsequencia == 0) {
                                eris.createMessage(message.channel.id, "**" + name + "** foi preso por tentativa de assassinato");
                            } else {
                                eris.createMessage(message.channel.id, "**" + name + "** fugiu das autoridades locais");
                            }
                        }
                    }, 5000));
                }
            } else {
                eris.createMessage(message.channel.id, "Quer que eu mate quem? Não sou nenhum adivinho.").then(message => setTimeout(function() { message.delete(); }, 5000));
            }
        } catch (err) {
            eris.createMessage(config.logChannel, `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:${this.label}\n\t>> ${err.response}\n\t${err.stack}`);
        }
    },
    options: {
        description: 'Mate alguém',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['ts']
    }
};