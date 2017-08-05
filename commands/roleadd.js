let eris = require('../lib/client');
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

module.exports = {
    label: 'role',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[`" + message.channel.guild.name + "`" + "~>" + "`" + message.channel.name + "`]" + "**" + message.author.username + "**:" + message.content);
            var args2 = message.content.split(' ');
            var channelID = message.channel.id;
            var userTag = message.author.username + "#" + message.author.discriminator;
            var userID = message.author.id;
            var roles = message.member.roles;
            if (args2[1] != undefined) {
                var ment = eris.guilds.get(message.channel.guild.id).roles.find(name => name.name.toLowerCase() == args2[1].toLowerCase());
                if (ment != undefined) {
                    var roleName = ment.name;
                    var index = roles.indexOf(ment.id);
                    var add = false;
                    if (index === -1) {
                        add = true;
                    }

                    if (add == true) {
                        // if (ment.permission.has('administrator') || ment.permission.has('banMembers') || ment.permission.has('kickMembers')) {
                        //     eris.createMessage(channelID, `${roleName} não pode ser adicionado, porque contém permissões especiais.`);
                        // } else {
                        message.channel.guild.addMemberRole(message.author.id, ment.id).then(() => {
                            eris.createMessage(channelID, "<@" + userID + ">, Consegui pegar o cargo `" + roleName + "`.").then((msgInfo) => {
                                setTimeout(function() {
                                    eris.deleteMessage(channelID, msgInfo.id);
                                    eris.deleteMessage(channelID, message.id);
                                }, 5000);
                                add = false;
                            }).catch((err) => {
                                console.log("--> AddRoles | addRole\n" + err);
                            });
                            eris.createMessage('309478380787597312', "Dei `" + roleName + "` para **" + userTag + "**");
                        });
                        // }
                    } else if (add == false) {
                        // if (ment.permission.has('administrator') || ment.permission.has('banMembers') || ment.permission.has('kickMembers')) {
                        //     eris.createMessage(channelID, `${roleName} não pode ser adicionado, porque contém permissões especiais.`);
                        // } else {
                        message.channel.guild.removeMemberRole(message.author.id, ment.id).then(() => {
                            eris.createMessage(channelID, "<@" + userID + ">, Consegui remover o cargo `" + roleName + "`.").then((msgInfo) => {
                                setTimeout(function() {
                                    eris.deleteMessage(channelID, msgInfo.id);
                                    eris.deleteMessage(channelID, message.id);
                                }, 5000);
                            }).catch((err) => {
                                console.log("--> removeRoles | wrongRole\n" + err);
                            });
                            eris.createMessage('309478380787597312', "Tirei `" + roleName + "` do **" + userTag + "**");
                        });
                        // }
                    } else {
                        console.log("rolaadd: crashou tudo!");
                    }
                } else {
                    eris.createMessage(channelID, `OPS!! Desconheço esse cargo, desculpe.`);
                }
            } else {
                eris.createMessage(channelID, `OPS!! Esqueçeu do cargo?`);
            }
        } catch (err) {
            eris.createMessage(config.logChannel, `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:${this.label}\n\t>> ${err.response}\n\t${err.stack}`);
        }
    },
    options: {
        description: 'Adicione um cargo',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['ts']
    }
};