let eris = require('../lib/client');
let fs = require('fs');
let moment = require('moment');
var tz = require('moment-timezone');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

moment().format();
moment.locale('pt-br');

module.exports = {
    label: 'usuario',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            function role(member) {
                var roles = message.channel.guild.members.get(member).roles;
                var text = "";
                console.dir(roles);
                if (roles && roles.length > 0) {
                    return roles.map(r => message.channel.guild.roles.get(r).name).join(', ');
                } else {
                    text = "Este usuario não tem cargos";
                    return text;
                }
            }

            if (message.mentions[0] == undefined) {

                var game = "";
                if (message.member.game == null) {
                    game = "Nada";
                } else {
                    game = message.member.game.name;
                }

                function status() {
                    if (message.channel.guild.members.get(message.author.id).status === 'online') {
                        return '<:online:336312904863186944> Online';
                    } else if (message.channel.guild.members.get(message.author.id).status === 'dnd') {
                        return '<:dnd:336312904544681996> Do Not Disturb';
                    } else if (message.channel.guild.members.get(message.author.id).status === 'idle') {
                        return '<:idle:336312904536293386> Idle';
                    } else if (message.channel.guild.members.get(message.author.id).status === 'offline') {
                        return '<:offline:336312904485961740> Offline';
                    }
                }

                eris.createMessage(message.channel.id, {
                    embed: {
                        color: Math.floor(Math.random() * 16777216),
                        author: {
                            name: "Informações do(a) " + message.author.username + "#" + message.author.discriminator,
                            icon_url: message.author.avatarURL
                        },
                        thumbnail: {
                            url: (message.member.avatarURL)
                        },
                        footer: {
                            text: 'por ' + message.author.username,
                            icon_url: message.author.avatarURL
                        },
                        fields: [{
                            name: '**#** Informações do Usuario:',
                            value: `**• Usuario**: ${message.member.username}\n**• Status**: ${status()}\n**• Jogo**: ${game}\n**• Conta criada em**: ${moment(message.member.createdAt).format("llll")}\n**• Entrou no server em**: ${moment(message.member.joinedAt).format("llll")}\n**• Cargos**: ${role(message.author.id)}`,
                            inline: true
                        }]
                    }
                });


            } else {
                var game = "";
                if (message.mentions[0].game == null) {
                    game = "Nada";
                } else {
                    game = message.mentions[0].game.name;
                }

                function status() {
                    if (message.channel.guild.members.get(message.mentions[0].id).status === 'online') {
                        return '<:online:336312904863186944> Online';
                    } else if (message.channel.guild.members.get(message.mentions[0].id).status === 'dnd') {
                        return '<:dnd:336312904544681996> Do Not Disturb';
                    } else if (message.channel.guild.members.get(message.mentions[0].id).status === 'idle') {
                        return '<:idle:336312904536293386> Idle';
                    } else if (message.channel.guild.members.get(message.mentions[0].id).status === 'offline') {
                        return '<:offline:336312904485961740> Offline';
                    }
                }

                eris.createMessage(message.channel.id, {
                    embed: {
                        color: Math.floor(Math.random() * 16777216),
                        author: {
                            name: "Informações do(a) " + message.mentions[0].username + "#" + message.mentions[0].discriminator,
                            icon_url: message.mentions[0].avatarURL
                        },
                        thumbnail: {
                            url: (message.mentions[0].avatarURL)
                        },
                        footer: {
                            text: 'por ' + message.author.username,
                            icon_url: message.author.avatarURL
                        },
                        fields: [{
                            name: '**#** Informações do Usuario:',
                            value: `**• Usuario**: ${message.mentions[0].username}\n**• Status**: ${status()}\n**• Jogo**: ${game}\n**• Conta criada em**: ${moment(message.mentions[0].createdAt).format("llll")}\n**• Entrou no server em**: ${moment(message.mentions[0].joinedAt).format("llll")}\n**• Cargos**: ${role(message.mentions[0].id)}`,
                            inline: true
                        }]
                    }
                });
            }
        } catch (err) {
            eris.createMessage(config.logChannel, `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:${this.label}\n\t>> ${err.response}\n\t${err.stack}`);
        }
    },
    options: {
        description: 'Veja suas informações',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['ts']
    }
};