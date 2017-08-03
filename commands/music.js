let eris = require('../lib/client');
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let locale = require('../utils/lang');
let firebase = require("firebase");
let YouTube = require('youtube-node');
var ytdl = require('ytdl-core');
let moment = require('moment');

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

                                                            // O usuario está no canal de voz?
                                                            if (!message.member.voiceState.channelID) {
                                                                eris.createMessage(message.channel.id, voicechannel);
                                                                return;
                                                            }

                                                            // O bot vai entrar no canal de voz
                                                            eris.joinVoiceChannel(message.member.voiceState.channelID).catch((err) => {
                                                                eris.createMessage(message.channel.id, "Error joining voice channel: " + err.message); // OPS! Algo nos inpede de entrar o canal de voz.
                                                                console.log(err); // Log do erro
                                                            }).then((connection) => {

                                                                var video = items[index];
                                                                var link = links[index];

                                                                play(link, connection);
                                                                setmusica.child('tocando').set(true);
                                                                setmusica.child('np').set(playle[index]);

                                                                //Update Playlist
                                                                playlist.forEach(function(childSnapshot) {
                                                                    var childData = childSnapshot.val();
                                                                    listsave += childData;
                                                                });
                                                                console.log(listsave);
                                                                listsave += playle[index];
                                                                setplaylist.set([listsave]);

                                                                // Despachando a mensagem...
                                                                msg.edit(`Tocando **${playle[index]}**`);
                                                                // eris.createMessage(message.channel.id, {
                                                                //     embed: {
                                                                //         color: Math.floor(Math.random() * 16777216),
                                                                //         title: video.snippet.title,
                                                                //         description: link,
                                                                //         thumbnail: {
                                                                //             url: video.snippet.thumbnails.high.url,
                                                                //             proxy_url: video.snippet.thumbnails.high.url
                                                                //         },
                                                                //         fields: [{
                                                                //             name: enviado,
                                                                //             value: video.snippet.channelTitle,
                                                                //             inline: true
                                                                //         }, {
                                                                //             name: publicado,
                                                                //             value: moment(video.snippet.publishedAt).format('LLLL'),
                                                                //             inline: true
                                                                //         }, {
                                                                //             name: descricao,
                                                                //             value: video.snippet.description,
                                                                //             inline: true
                                                                //         }],
                                                                //         footer: {
                                                                //             text: 'por ' + message.author.username + "#" + message.author.discriminator,
                                                                //             icon_url: message.author.avatarURL
                                                                //         }
                                                                //     }
                                                                // });
                                                                connection.once("end", () => {
                                                                    msg.edit(`Abacou de tocar **${playle[index]}** - <@${responses[0].author.id}>`);
                                                                    if (playlist.exists()) {
                                                                        playlist.forEach(function(childSnapshot) {
                                                                            var childData = childSnapshot.val();
                                                                            listsave += childData;
                                                                        });
                                                                        console.log(listsave);
                                                                        listsave.shift();
                                                                        play(listsave[0], connection);
                                                                        setplaylist.set([listsave]);
                                                                    } else {
                                                                        setplaylist.remove();
                                                                        eris.leaveVoiceChannel(connection.id);
                                                                        setmusica.child('tocando').set(false);
                                                                        setmusica.child('np').set("nada");
                                                                    }
                                                                });
                                                            });
                                                        }
                                                    } catch (e) {
                                                        message.channel.createMessage("Me chama, e fica inativo me deixando no vacuo, muito obrigrado por nada." + message.author.mention + `\n\n${e}`);
                                                    }
                                                } else {
                                                    playlist.forEach(function(childSnapshot) {
                                                        var childData = childSnapshot.val();
                                                        listsave += childData;
                                                    });
                                                    console.log(listsave);
                                                    listsave += playle[index];
                                                    setplaylist.set([listsave]);
                                                    eris.createMessage(message.channel.id, `Adicionei a plylist: **${playle[index]}**`);
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

                            break;
                        case 'pular':

                            break;
                        case 'tocando':
                            eris.createMessage(message.channel.id, `Estou tocando ${musica.child('np').val()}`);
                            break;
                        case 'playlist':
                            ref.once("value")
                                .then(function(snapshot) {
                                    var playlist = snapshot.child('Bot/Servidor/' + message.channel.guild.id + '/musica/playlist/');
                                    var lista = "";
                                    var count = 0;
                                    playlist.forEach(function(childSnapshot) {
                                        count++;
                                    });
                                    playlist.forEach(function(childSnapshot) {
                                        var key = childSnapshot.key;
                                        var childData = childSnapshot.val();

                                        if (key == 0) lista += (Number(key) + 1) + ": :arrow_forward:  Musica atual: **" + childData + "**\n";
                                        else lista += (Number(key) + 1) + ": :small_orange_diamond: `" + childData + "`\n";
                                        if (key == 9) lista += "*E outras " + (count - 9) + " musicas*..."
                                        if (key > 9) return true;
                                    });
                                    eris.createMessage(message.channel.id, lista);
                                });
                            break;
                        case 'parar':
                            // O usuario está no canal de voz?
                            if (!message.member.voiceState.channelID) {
                                eris.createMessage(message.channel.id, voicechannel);
                                return;
                            }

                            eris.joinVoiceChannel(message.member.voiceState.channelID).catch((err) => {
                                eris.createMessage(message.channel.id, "Error joining voice channel: " + err.message); // OPS! Algo nos inpede de entrar o canal de voz.
                                console.log(err); // Log do erro
                            }).then((connection) => {
                                eris.leaveVoiceChannel(connection.id);
                                setmusica.child('tocando').set(false);
                                setmusica.child('np').set("nada");
                                setplaylist.remove();
                            });
                            break;
                        default:
                            eris.createMessage(message.channel.id, `Não sei o que você ue dizer com isso, acho que sou burro demais pra entender.`);
                            break;
                    }
                });
            // }

            function play(musica, connection) {
                // Iniciando stream...
                let stream = ytdl(musica, { filter: 'audioonly' });
                // Tocando a musica...
                const dispatcher = connection.play(stream);
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