let eris = require('../lib/client');
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let locale = require('../utils/lang');
let firebase = require("firebase");
let YouTube = require('youtube-node');
let ytdl = require('ytdl-core');
let moment = require('moment');
let manager = require('../music/music/manager.js');
let utils = require('../music/utils/utils.js');

let youTube = new YouTube();
var db = firebase.database();
var ref = db.ref();

youTube.setKey('KEY');

module.exports = {
    label: 'm',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[`" + message.channel.guild.name + "`" + "~>" + "`" + message.channel.name + "`]" + "**" + message.author.username + "**:" + message.content);
            // if (message.author.id != "238975494047924224") {
            //     eris.createMessage(message.channel.id, `Comando ainda em desemvolvimento, não perturbe.`);
            // } else {
            var setmusica = ref.child('Bot/Servidor/' + message.channel.guild.id + '/musica/');
            var setplaylist = ref.child('Bot/Servidor/' + message.channel.guild.id + '/musica/playlist/');
            ref.once("value")
                .then(function(snapshot) {
                    var args = message.content.split(' ')[1];
                    var args2 = message.content.slice(3 + args.length + 1);
                    var lang = snapshot.child('Bot/Servidor/' + message.channel.guild.id).child('language');
                    var musica = snapshot.child('Bot/Servidor/' + message.channel.guild.id + '/musica/');
                    var playlist = snapshot.child('Bot/Servidor/' + message.channel.guild.id + '/musica/playlist/');

                    var procura = locale(lang.val(), "yt.procura");
                    var enviado = locale(lang.val(), "yt.enviado");
                    var publicado = locale(lang.val(), "yt.publicado");
                    var descricao = locale(lang.val(), "yt.descricao");
                    var voicechannel = locale(lang.val(), "yt.voicechannel").replace("${message.author.username}", message.author.username);

                    let channel = message.guild.channels.find(ch => ch.bitrate && ch.voiceMembers.map(m => m.user).includes(message.author));

                    if (!musica.child('tocando').val()) {
                        setmusica.child('tocando').set(false);
                    }

                    // if (!playlist.val()) {
                    //     setplaylist.set(["a", "b", "c", "d"]);
                    // }

                    if (!musica.child('np').val()) {
                        setmusica.child('np').set("nada");
                    }

                    switch (args) {
                        case 'tocar':
                            var video = args2;
                            eris.createMessage(message.channel.id, procura).then(msg => {
                                youTube.search(video, 10, function(error, results) {
                                    try {
                                        if (error) {
                                            console.log(error);
                                        } else {
                                            var list = "";
                                            var playle = [];
                                            var links = [];
                                            var items = [];
                                            var listsave = [];
                                            items.push(results.items);
                                            for (var i = 0; i < results.items.length; i++) {
                                                list += "**" + (i + 1) + "**: :musical_note:  " + results.items[i].snippet.title + "\n";
                                                playle.push(results.items[i].snippet.title);
                                                links.push("https://www.youtube.com/watch?v=" + results.items[i].id.videoId);
                                            }

                                            list += "**c**: :small_blue_diamond: Cancel \n";

                                            msg.edit(list);
                                            message.channel.awaitMessages(msg2 =>
                                                msg2.author.id === message.author.id && msg2.author === message.author && ((
                                                        parseInt(msg2.content) > 0 &&
                                                        parseInt(msg2.content) < 11 &&
                                                        !isNaN(parseInt(msg2.content))) ||
                                                    msg2.content === "c"), {
                                                    time: 20000,
                                                    maxMatches: 1
                                                }
                                            ).then(responses => {
                                                if (!musica.child('tocando').val()) {
                                                    try {
                                                        if (responses[0].content === undefined) {
                                                            eris.createMessage(message.channel.id, `Operação cancelada!!\nMotivo: Tempo esgotado.`);
                                                        } else {

                                                            if (responses[0].content === "c") {
                                                                eris.createMessage(message.channel.id, `Operação cancelada!!\nMotivo: Cancelado pelo usuario.`);
                                                                return;
                                                            }

                                                            var index = 0;
                                                            (parseInt(responses[0].content) - 1) ? (index = parseInt(responses[0].content) - 1) : index = 0;

                                                            var video = items[index];
                                                            var link = links[index];

                                                            if (channel) {
                                                                let json = channel.permissionsOf(eris.user.id).json;
                                                                if (json.voiceConnect && json.voiceSpeak && json.voiceUseVAD) {
                                                                    let url = link;
                                                                    // if (url.includes('&')) {
                                                                    //     url = 'https://www.youtube.com/watch?v=' + utils.getURLParams(url).v;
                                                                    // }
                                                                    try {
                                                                        ytdl.getInfo(url, (err, info) => {
                                                                            if (!err) {
                                                                                manager.get(channel.guild.id).queue({
                                                                                    url: url,
                                                                                    channel: channel.id,
                                                                                    textChannel: message.channel.id,
                                                                                    info: info,
                                                                                    requestedBy: message.author.id
                                                                                });
                                                                                msg.delete();
                                                                            } else {
                                                                                msg.edit(locale(lang.val(), "yt.err.bad1"));
                                                                            }
                                                                        });
                                                                    } catch (err) {
                                                                        msg.edit(locale(lang.val(), "yt.err.bad2"));
                                                                    }
                                                                } else {
                                                                    msg.edit(locale(lang.val(), "yt.err.bad3"));
                                                                }
                                                            } else {
                                                                msg.edit(voicechannel);
                                                            }
                                                        }
                                                    } catch (e) {
                                                        message.channel.createMessage(locale(lang.val(), "err.text4") + message.author.mention + `\n\n${e}`);
                                                    }
                                                }
                                            });
                                        }
                                    } catch (err) {
                                        eris.createMessage(config.logChannel, `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:${this.label}\n\t>> ${err.response}\n\t${err.stack}`);
                                    }
                                });
                            });
                            break;
                        case 'pause':
                            manager.get(message.guild.id).pause();
                            eris.createMessage(message.channel.id, `Pausei ${manager.get(message.guild.id).getSong()}`);
                            break;
                        case 'resume':
                            manager.get(message.guild.id).resume();
                            eris.createMessage(message.channel.id, `Retomando ${manager.get(message.guild.id).getSong()}`);
                            break;
                        case 'pular':
                            if (channel) {
                                manager.get(message.guild.id).skip();
                            } else {
                                message.channel.createMessage('Deve estar em um canal para pular músicas!');
                            }
                            break;
                        case 'tocando':
                            if (manager.get(message.guild.id).getSong) {
                                eris.createMessage(message.channel.id, `Estou tocando ${manager.get(message.guild.id).getSong.info.title}`);
                            } else {
                                eris.createMessage(message.channel.id, `Não estou tocando nada.`);
                            }
                            break;
                        case 'playlist':
                            let queue = manager.get(message.channel.guild.id).getQueue();
                            let embed = { title: 'Current Playlist:', type: 'rich', fields: [] };
                            var lista = "**Playlist**: \n";
                            var count = 0;
                            if (manager.get(message.guild.id).getSong) {
                                lista += (count + 1) + ": :arrow_forward:  Musica atual: **" + manager.get(message.guild.id).getSong.info.title + "**\n";
                                count++;
                            }
                            queue.forEach(v => {
                                if (count == 0) lista += (count + 1) + ": :arrow_forward:  Proxima musica: **" + v.info.title + "**\n";
                                else lista += (count + 1) + ": :small_orange_diamond: `" + v.info.title + "`\n";
                                if (count == 9) lista += "*E outras musicas*...";
                                if (count > 9) return true;
                                count++;
                            });
                            if (lista == "**Playlist**: \n") {
                                lista += "A playlist está vazia";
                            }
                            eris.createMessage(message.channel.id, lista).catch(console.error);
                            break;
                        case 'parar':
                            if (channel) {
                                eris.leaveVoiceChannel(channel.id);
                                manager.get(message.channel.guild.id).destroyNow();
                            } else {
                                message.channel.createMessage(`${message.author.mention} - você não está em um canal de voz.`);
                            }
                            break;
                        default:
                            eris.createMessage(message.channel.id, `Não sei o que você ue dizer com isso, acho que sou burro demais pra entender.`);
                            break;
                    }
                });
            // }
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