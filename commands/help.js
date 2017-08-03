let eris = require('../lib/client');
let moment = require("moment");
let tz = require("moment-timezone");
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

module.exports = {
    label: 'Ajuda',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[`" + message.channel.guild.name + "`" + "~>" + "`" + message.channel.name + "`]" + "**" + message.author.username + "**:" + message.content);
            message.delete();
            eris.createMessage(message.channel.id, 'Mensagem Enviada pelo privado :thumbsup: ').then(message => setTimeout(function() { message.delete(); }, 7000));
            eris.getDMChannel(message.author.id).then(dm => {
                eris.sendChannelTyping(dm.id);
                setTimeout(function() {
                    eris.createMessage(dm.id, "**Você está convidado para o meu servidor oficial!** https://discord.gg/qE7nWue \n" + "**Convide-me para seu server!** https://discordapp.com/oauth2/authorize?client_id=313474367847923712&scope=bot&permissions=305155286 \n E acesse o site o Infinity: http://www.infinitybot.gq/ \n" + "**Servers Parceiros** \n" + "**Apydle:** https://discord.gg/gz2HqNc");
                    eris.createMessage(dm.id, {
                        embed: {
                            color: Math.floor(Math.random() * 16777216),
                            author: {
                                name: 'Miscelânea',
                                icon_url: eris.user.avatarURL
                            },
                            description: '**>bot** - Veja informações sobre o Infinity\n' +
                                '**>betroll [Aposte]** - Aposte dinheiro e você pode ganhar ou preder.\n' +
                                '**>yt [Nome do video]** - faça uma busca por um video no youtube\n' +
                                '**>level** - Veja seu level atual\n' +
                                '**>money** - Veja o quanto de dinheiro você tem\n' +
                                '**>rank [xp | money](opcional)** - Acesse os ranks disponivés\n' +
                                '**>discrim [number](opcional)** - Veja discriminadores de usuarios que o bot possa ver\n' +
                                '**>daily** - Pege sua recompensa de hoje\n' +
                                '**>profile** - Veja seu perfil\n'
                        }
                    });
                    eris.createMessage(dm.id, {
                        embed: {
                            color: Math.floor(Math.random() * 16777216),
                            author: {
                                name: 'Usuario',
                                icon_url: eris.user.avatarURL
                            },
                            description: '**>usuario** - Acesse suas informações\n' +
                                '**>servidor** - Acesse as informações sobre o server\n\n'
                        }
                    });
                    eris.createMessage(dm.id, {
                        embed: {
                            color: Math.floor(Math.random() * 16777216),
                            author: {
                                name: 'Musica',
                                icon_url: eris.user.avatarURL
                            },
                            description: '**>m tocar [nome da musica]** - Vamos ouvir uma musica?\n' +
                                '**>m parar** - Remova o bot do canal de voz\n'
                        }
                    });
                    eris.createMessage(dm.id, {
                        embed: {
                            color: Math.floor(Math.random() * 16777216),
                            author: {
                                name: 'Entretenimento',
                                icon_url: eris.user.avatarURL
                            },
                            description: '**>ameaça (mention)** - Classifica seu grau de criminalidade\n' +
                                '**>perigo** - Verifique o nivel de ameaça desse chat\n' +
                                '**>Mate (mention)** - Quer matar alguem?\n' +
                                '**>suicidio** - Cometa suicidio\n' +
                                '**>dados** - Role os dados\n\n'
                        }
                    });
                    eris.createMessage(dm.id, {
                        embed: {
                            color: Math.floor(Math.random() * 16777216),
                            author: {
                                name: 'Adminstração',
                                icon_url: eris.user.avatarURL
                            },
                            description: '**>uptime** - Mostar o tempo que o bot esta ligado na tomada\n' +
                                '**>roleadd [role_name]** - Add um cargo ao usuario\n' +
                                '**>roleremove [role_name]** - remove o cargo de um usuario\n' +
                                '**>limpar [number]** - Limpe quantas menssagens quiser\n' +
                                '**>kick [mention] [motivo]** - Kicka um usuario do server(Tem que ter permissão `serverGuild` pra pode usar)\n' +
                                '**>ban [mention] [motivo]** - bani por 7 dias um usuario do server(Tem que ter permissão `serverGuild` pra pode usar)\n' +
                                '**>mute [mention] [tempo]** - Mute alguém(Tem que ter permissão `serverGuild` pra pode usar)\n' +
                                '**>rolemute [nome do cargo]** - Sete o cargo de mute no seu server(Tem que ter permissão `serverGuild` pra pode usar)\n' +
                                '**>destroy** - Destrua os dados do seu servidor (MAS CUIDADO, USOU JÁ ERA. NÃO TEM VOLTA!)\n\n' +
                                '**>oninvite** - Ative o sistema anti-convite no server\n\n' +
                                '**Log de moderação:**\n' +
                                '**>logmessageupdate** - Log `MessageUpdate`\n' +
                                '**>logchannelcreate** - Log `channelCreate`\n' +
                                '**>logchanneldelete** - Log `channelDelete`\n' +
                                '**>logguildbanremove** - Log `guildBanRemove`\n' +
                                '**>logguildmemberadd** - Log `guildMemberAdd`\n' +
                                '**>logguildmemberremove** - Log `guildMemberRemove`\n' +
                                '**>logguildrolecreate** - Log `guildRoleCreate`\n' +
                                '**>logguildroledelete** - Log `guildRoleDelete`\n' +
                                '**>logguildbanadd** - Log `guildBanAdd`\n' +
                                '**>logchannel** - Altere o canal de log\n' +
                                '**>logvoicechannelswitch** - Log `voiceChannelSwitch`'
                        }
                    });
                    eris.createMessage(dm.id, {
                        embed: {
                            author: {
                                name: 'Informações extras',
                                icon_url: eris.user.avatarURL
                            },
                            color: 16074000,
                            description: `Obrigado por está me utilizando!\n**Infinity** foi criado pelo **xDeltaFox#8871**\n\t**To infinity and beyond**`,
                            footer: {
                                text: `ID: ${message.author.id} | ${moment().tz('America/Sao_Paulo').format('llll')}`
                            }
                        }
                    });
                }, 5000);
            });
        } catch (err) {
            eris.createMessage(config.logChannel, `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:${this.label}\n\t>> ${err.response}\n\t${err.stack}`);
        }
    },
    options: {
        description: 'Ajuda',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['ts']
    }
};