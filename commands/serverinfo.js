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
            eris.createMessage(config.starbucks, "[`" + message.channel.guild.name + "`" + "~>" + "`" + message.channel.name + "`]" + "**" + message.author.username + "**:" + message.content);
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

                var online = 0;
                var dnd = 0;
                var idle = 0;
                var offline = 0;

                var user = 0;
                var bots = 0;
                message.channel.guild.members.map(member => {
                    if (member.bot) {
                        bots++;
                    } else {
                        user++;
                    }

                    if (member.status === 'online') {
                        online++;
                    } else if (member.status === 'dnd') {
                        dnd++;
                    } else if (member.status === 'idle') {
                        idle++;
                    } else if (member.status === 'offline') {
                        offline++;
                    }
                });

                var text = 0;
                var voice = 0;
                message.channel.guild.channels.map(channel => {
                    if (channel.type == 0) {
                        text++;
                    } else if (channel.type == 2) {
                        voice++;
                    }
                });

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
                        color: Math.floor(Math.random() * 16777216),
                        thumbnail: {
                            url: message.channel.guild.iconURL,
                            proxy_url: message.channel.guild.iconURL
                        },
                        fields: [{
                            name: `**#** Informações do(a) ${message.channel.guild.name} (${message.channel.guild.id}):`,
                            value: `**:crown: Dono**: ${ownerName}#${ownerDis}(${ownerId})\n**:calendar: Servidor criado em**: ${moment(message.channel.guild.createdAt).format("LL")}\n**:earth_americas: Região**: ${region}\n**:bust_in_silhouette: Membros [${memberC}]**: \n**:busts_in_silhouette: Pessoas: ${user} (${((user/(bots+user))*100).toFixed(2)}%)** \n**:robot: Bots: ${bots} (${((bots/(bots+user))*100).toFixed(2)}%)** \n <:vpOnline:317350223427141655> ${online} Online (${((online/(bots+user))*100).toFixed(2)}%) | <:vpAway:317350225398333440> ${idle} Ausente (${((idle/(bots+user))*100).toFixed(2)}%) | <:vpDnD:317350228279820288> ${dnd} Ocupado (${((dnd/(bots+user))*100).toFixed(2)}%) | <:vpOffline:317350225784078336> ${offline} Offline (${((offline/(bots+user))*100).toFixed(2)}%)\n**:speech_balloon: Canais de texto**: ${text}\n**:microphone2: Canais de voz**: ${voice}\n**:shield: Verificação de segurança**: ${verificationLevel}`,
                            inline: false
                        }, {
                            name: "**#** Informações de funções:",
                            value: "**:briefcase: Cargos**: " + rolez,
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