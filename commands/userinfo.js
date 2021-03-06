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
            eris.createMessage(config.starbucks, "[`" + message.channel.guild.name + "`" + "~>" + "`" + message.channel.name + "`]" + "**" + message.author.username + "**:" + message.content);

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
                    if (message.channel.guild.members.get(message.member.id).status === 'online') {
                        return 'Online';
                    } else if (message.channel.guild.members.get(message.member.id).status === 'dnd') {
                        return 'Ocupado';
                    } else if (message.channel.guild.members.get(message.member.id).status === 'idle') {
                        return 'Ausente';
                    } else if (message.channel.guild.members.get(message.member.id).status === 'offline') {
                        return 'Offline';
                    }
                }

                function statusemoji() {
                    if (message.channel.guild.members.get(message.member.id).status === 'online') {
                        return '<:vpOnline:317350223427141655>';
                    } else if (message.channel.guild.members.get(message.member.id).status === 'dnd') {
                        return '<:dnd:336312904544681996>';
                    } else if (message.channel.guild.members.get(message.member.id).status === 'idle') {
                        return '<:vpAway:317350225398333440>';
                    } else if (message.channel.guild.members.get(message.member.id).status === 'offline') {
                        return '<:vpOffline:317350225784078336>';
                    }
                }

                eris.createMessage(message.channel.id, {
                    embed: {
                        color: Math.floor(Math.random() * 16777216),
                        thumbnail: {
                            url: (message.member.avatarURL)
                        },
                        footer: {
                            text: 'por ' + message.author.username,
                            icon_url: message.author.avatarURL
                        },
                        fields: [{
                            name: '**#** Informações do(a) ' + message.member.username + "#" + message.member.discriminator,
                            value: `**:bust_in_silhouette: Usuario**: ${message.member.username}\n**${statusemoji()} Status**: ${status()}\n**<:GameController:338766079746637826> Jogo**: ${game}\n**:calendar: Conta criada em**: ${moment(message.member.createdAt).format("llll")}\n**:calendar: Entrou no server em**: ${moment(message.member.joinedAt).format("llll")}\n**:briefcase: Cargos**: ${role(message.member.id)}`,
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
                        return 'Online';
                    } else if (message.channel.guild.members.get(message.mentions[0].id).status === 'dnd') {
                        return 'Ocupado';
                    } else if (message.channel.guild.members.get(message.mentions[0].id).status === 'idle') {
                        return 'Ausente';
                    } else if (message.channel.guild.members.get(message.mentions[0].id).status === 'offline') {
                        return 'Offline';
                    }
                }

                function statusemoji() {
                    if (message.channel.guild.members.get(message.mentions[0].id).status === 'online') {
                        return '<:vpOnline:317350223427141655>';
                    } else if (message.channel.guild.members.get(message.mentions[0].id).status === 'dnd') {
                        return '<:dnd:336312904544681996>';
                    } else if (message.channel.guild.members.get(message.mentions[0].id).status === 'idle') {
                        return '<:vpAway:317350225398333440>';
                    } else if (message.channel.guild.members.get(message.mentions[0].id).status === 'offline') {
                        return '<:vpOffline:317350225784078336>';
                    }
                }

                eris.createMessage(message.channel.id, {
                    embed: {
                        color: Math.floor(Math.random() * 16777216),
                        thumbnail: {
                            url: (message.mentions[0].avatarURL)
                        },
                        footer: {
                            text: 'por ' + message.author.username,
                            icon_url: message.author.avatarURL
                        },
                        fields: [{
                            name: '**#** Informações do(a) ' + message.mentions[0].username + "#" + message.mentions[0].discriminator,
                            value: `**:bust_in_silhouette: Usuario**: ${message.mentions[0].username}\n**${statusemoji()} Status**: ${status()}\n**<:GameController:338766079746637826> Jogo**: ${game}\n**:calendar: Conta criada em**: ${moment(message.mentions[0].createdAt).format("llll")}\n**:calendar: Entrou no server em**: ${moment(message.mentions[0].joinedAt).format("llll")}\n**:briefcase: Cargos**: ${role(message.mentions[0].id)}`,
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