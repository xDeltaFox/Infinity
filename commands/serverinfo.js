let eris = require('../lib/client');
let moment = require('moment');
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

var tz = require('moment-timezone');
moment().format();
moment.locale('pt-br');

module.exports = {
    label: 'servidor',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            if (message.channel.guild != undefined) {
                var guildname = message.channel.guild.name;
                var ownerName = message.channel.guild.members.find(member => member.id == message.channel.guild.ownerID).user.username;
                var ownerId = message.channel.guild.ownerID;
                var ownerDis = message.channel.guild.members.find(member => member.id == message.channel.guild.ownerID).user.discriminator;
                var memberC = message.channel.guild.memberCount;
                var ownerUser = message.channel.guild.members.find(member => member.id == message.channel.guild.ownerID).user;

                var usernick;
                var userMentionNick = message.channel.guild.members.find(member => member.id == message.channel.guild.ownerID).nick;
                if (userMentionNick != undefined) {
                    var usernick = userMentionNick
                } else {
                    var usernick = "User didn't have nickname."
                }

                var rolez;
                if (message.channel.guild.roles.size > 30) {
                    var rolez = '30+'
                } else {
                    var rolez = message.channel.guild.roles.map(r => message.channel.guild.roles.find(e => e.id == r.id).name).join(', ');
                }

                var region;
                var timezone;
                switch (message.channel.guild.region) {
                    case "brazil":
                        region = "Brasil";
                        timezone = 'America/Sao_Paulo';
                        break;
                    case "eu-central":
                        region = "Central Europe";
                        timezone = 'Europe/Berlin';
                        break;
                    case "hongkong":
                        region = "Hong Kong";
                        timezone = 'Asia/Hong_Kong';
                        break;
                    case "singapore":
                        region = "Sinpagore";
                        timezone = 'Asia/Singapore';
                        break;
                    case "sydney":
                        region = "Sydney";
                        timezone = 'Australia/Sydney';
                        break;
                    case "us-central":
                        region = "US Central";
                        timezone = 'America/Chicago';
                        break;
                    case "us-east":
                        region = "US East";
                        timezone = 'America/New_York';
                        break;
                    case "us-south":
                        region = "US South";
                        timezone = 'America/Denver';
                        break;
                    case "us-west":
                        region = "US West";
                        timezone = 'America/Los_Angeles';
                        break;
                    case "eu-west":
                        region = "Western Europe";
                        timezone = 'Europe/London';
                        break;
                    case "russia":
                        region = "Russia";
                        timezone = 'Europe/Moscow';
                        break;
                    default:
                        region = "Couldn't find this guild region";
                        timezone = "America/Sao_Paulo";
                }

                var verificationLevel;
                switch (message.channel.guild.verificationLevel) {
                    case 0:
                        verificationLevel = "none";
                        break;
                    case 1:
                        verificationLevel = "low";
                        break;
                    case 2:
                        verificationLevel = "medium";
                        break;
                    case 3:
                        verificationLevel = "high";
                        break;
                    case 4:
                        verificationLevel = "maximum";
                        break;
                    default:
                        verificationLevel = "none";
                }

                var membersonline;
                message.channel.guild.members.map(function(member) {
                    if (member.status == "online") {
                        membersonline++;
                    }
                });

                eris.createMessage(message.channel.id, {
                    embed: {
                        author: {
                            name: `Informações do(a) ${guildname}:`,
                            icon_url: message.channel.guild.iconURL
                        },
                        color: Math.floor(Math.random() * 16777216),
                        thumbnail: {
                            url: message.channel.guild.iconURL,
                            proxy_url: message.channel.guild.iconURL
                        },
                        fields: [{
                            name: "**#** Informações do servidor:",
                            value: "**• Data de criação**: " + moment(message.channel.guild.createdAt).format("LL") + "\n**• Região**: " + region + "\n**• Membros**: " + memberC + `(${message.channel.guild.features} onlines)` + "\n**• ID do servidor**: " + message.channel.guild.id + "\n**• Verificação de segurança**: " + verificationLevel,
                            inline: false
                        }, {
                            name: "**#** Informações do proprietário:",
                            value: "**• Usuario**: " + ownerName + "#" + ownerDis + "\n**• ID**: " + ownerId + "\n**• Data de criação**: " + moment(ownerUser.createdAt).format("LL") + "\n**• Nickname**: " + usernick,
                            inline: false
                        }, {
                            name: "**#** Informações de funções:",
                            value: "**• Tamanho de funções**: " + message.channel.guild.roles.size + "\n**• Cargos**: " + rolez,
                            inline: false
                        }],
                        footer: {
                            text: moment().format("LL") + " at " + moment().tz(timezone).format("LLLL"),
                            icon_url: message.author.avatarURL
                        }

                    }
                })

            } else {
                eris.createMessage(message.channel.id, ":x: | Tá tentando fazer o que?").then(message => setTimeout(function() { message.delete(); }, 5000));
            }
        } catch (err) {
            eris.createMessage(config.logChannel, `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:${this.label}\n\t>> ${err.response}\n\t${err.stack}`);
        }
    },
    options: {
        description: 'Veja as informações do seu servidor',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['ts']
    }
};