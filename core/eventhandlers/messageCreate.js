'use strict';

let moment = require('moment');
let path = require('path');
let tz = require('moment-timezone');
let Trello = require("node-trello");
let t = new Trello(config.trello.key, config.trello.token);
let Users = [];
let mlog = [];

moment().format();
moment.locale('pt-br');

String.prototype.toHHMMSS = function() {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var days = Math.floor(hours / 24);

    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var time = hours + 'h ' + minutes + 'm ' + seconds + 's';
    days > 1 ? time = days + " dias " : time = time
    return time;
}

module.exports = {
    event: 'messageCreate',
    enabled: true,
    handler: async(eris, serverDB, channelDB, userDB, message) => {
        try {
            var Server = message.channel.guild;
            var Channel = message.channel;
            var Author = message.author;
            if (Author.bot) return;

            function dataChecks(type, ent) {
                return new Promise(async resolve => {
                    if (type === "user") {
                        userDB.findOne({ id: ent.id }).then(user => {
                            if (!user) return resolve(userDB.new(ent));
                            return resolve(user);
                        });
                    };
                    if (type === "server") {
                        serverDB.findOne({ id: ent.id }).then(server => {
                            if (!server) return resolve(serverDB.new(ent));
                            return resolve(server);
                        });
                    };
                    if (type === "channel") {
                        channelDB.findOne({ id: ent.id }).then(channel => {
                            if (!channel) return resolve(channelDB.new(ent));
                            return resolve(channel);
                        });
                    };
                });
            };

            let userData = await dataChecks('user', Author),
                servData = await dataChecks('server', Server),
                chanData = await dataChecks('channel', Channel);

            var settimecheck;
            var start;
            var now = new Date().getTime();
            var r = Math.abs(now - (now + 75846000));
            var remain = (r / 1000 + "").toHHMMSS();

            // if suggestions
            if (message.channel.id == '394323844476829705') {
                message.addReaction(`👍`);
                message.addReaction(`👎`);
                message.addReaction(`🤷`);
                settimecheck = setTimeout(segcheck, 50000);
                console.log('sugestão OK');
            }

            function segcheck() {
                console.log('checando sugestão');
                var reactindex;
                var reactcount;
                var msg_valve;

                Object.keys(message.reactions).map(function(objectKey, index) {
                    var reaction = message.reactions[objectKey];

                    if (reactcount == undefined) {
                        reactcount = reaction.count;
                        reactindex = index;
                    }

                    if (reactcount < reaction.count) {
                        reactcount = reaction.count;
                        reactindex = index;
                    }
                });

                eris.removeMessageReactions(message.channel.id, message.id);

                if (reactindex == 0) {
                    msg_valve = `Sugestão aprovada!`;
                    message.addReaction(`itemchecked:398451377921064960`);
                    t.post("/1/cards", { name: `Sugestão do ${message.author.username}`, desc: message.content, idList: '5a4e19aa98ad2641a855dd93' }, function(err, attachments) {
                        if (err) throw err;
                        console.log(attachments);
                    });
                } else if (reactindex == 1) {
                    msg_valve = `Sugestão negada!`;
                    message.addReaction(`itemnotchecked:398451377996824576`);
                } else if (reactindex == 2) {
                    msg_valve = `<:blobhyperthink:394822902148759552> Pelo amor, só tem indecisos dessa bagaça.`;
                    message.addReaction(`❓`);
                } else {
                    msg_valve = `Não faço ideia do que tá acontecendo`;
                    message.addReaction(`❓`);
                }

                console.log('Cofirmando sugestão');
                eris.createMessage('396450827096555523', {
                    embed: {
                        title: `Sugestão do ${message.author.username}`,
                        description: `**Sugestão:** ${message.content}`,
                        color: 357495,
                        thumbnail: {
                            url: message.author.avatarURL,
                            proxy_url: message.author.avatarURL
                        },
                        fields: [{
                            name: `Decisão final...`,
                            value: msg_valve,
                            inline: false
                        }],
                        footer: {
                            text: `${moment().tz('America/Sao_Paulo').format("LLLL")}`
                        }
                    }
                });
            }
            // [end IF]

            function removeByAttr(arr, attr, value) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] && arr[i].hasOwnProperty(attr) && arr[i][attr] === value) {
                        return true;
                    }
                }
                return false;
            }

            if (Server) {
                gear.increaseExp(userData);
                gear.levelUp(userData);

                ///==-> Anti spam
                let maxBuffer = 12;
                let interval = 3000;
                let maxDuplicates = 7;

                var now = Math.floor(Date.now());
                console.log(removeByAttr(Users, "author", message.author.id));
                if (!removeByAttr(Users, "author", message.author.id)) {
                    Users.push({
                        "time": now,
                        "author": message.author.id,
                        "matched": 0
                    });
                }
                if (!removeByAttr(mlog, "author", message.author.id)) {
                    mlog.push({
                        "message": message.content,
                        "author": message.author.id,
                        "msgMatch": 0
                    });
                } else if (removeByAttr(mlog, "author", message.author.id) && !removeByAttr(mlog, "message", message.content)) {
                    for (var i = 0; i < mlog.length; i++) {
                        if (mlog[i] && mlog[i].hasOwnProperty("message") && (arguments.length > 2 && mlog[i]["author"] === message.author.id)) {
                            mlog[i]["message"] === message.content;
                            mlog[i]["msgMatch"] === 0;
                        }
                    }
                }

                //==-> Check how many times the same message has been sent.
                for (var i = 0; i < mlog.length; i++) {
                    if (mlog[i].message == message.content && (mlog[i].author == message.author.id) && (message.author.id !== eris.user.id)) {
                        mlog[i].msgMatch += 1;
                    } else {
                        mlog[i].msgMatch = 0;
                    }

                    //==-> Check matched content
                    if (mlog[i].msgMatch == maxDuplicates) {
                        console.log("[msg duplicate] SPAM DETECTED!");
                    }
                }

                for (var i = 0; i < Users.length; i++) {
                    if (Users[i].time > now - interval) {
                        Users[i].matched += 1;
                        if (Users[i].matched == maxBuffer) {
                            console.log("SPAM DETECTED!");
                        }
                    } else {
                        Users[i].matched = 0;
                    }
                    console.log("[msg duplicate] " + JSON.stringify(Users[i]));
                }
                //==-> Anti spam

                // if commandFire
                if (message.content.startsWith(servData.model.prefix)) message.prefix = servData.model.prefix;
                if (message.content.startsWith("++")) message.prefix = "++";
                if (message.prefix) {
                    let query = message.content.substr(message.prefix.length).split(' ')[0];
                    let aliases = JSON.parse(fs.readFileSync("core/aliases.json", 'utf8'));
                    let command;
                    if (aliases[query]) command = aliases[query].toLowerCase();
                    else command = query.toLowerCase();
                    let language;
                    if (servData.model.lang == "pt-br" || servData.model.lang == "en-us") {
                        language = JSON.parse(fs.readFileSync(`lang/${servData.model.lang}.json`, 'utf8'));
                    } else {
                        return eris.createMessage(Channel.id, `A lingua definida para esse servidor não existe, :cry:`);
                    }
                    let folders = fs.readdirSync('./core/commands');
                    for (var i = 0; i < folders.length; i++) {
                        let filedir = './core/commands/' + folders[i]
                        fs.readdir(filedir, (err, files) => {
                            if (err) {
                                console.log('Comandos não podem ser carregados...', { attach: err });
                            } else {
                                try {
                                    if (files.indexOf(command + ".js") > -1) {
                                        var pathTo = `${filedir}/${command}.js`;
                                        console.log(`message.prefix: ${message.prefix}, pathTo: ${path.resolve(pathTo)}, filedir: ${filedir}, command: ${command}, aliases: ${aliases}, query: ${query}`)
                                        var comm = require(path.resolve(pathTo));
                                        if (message.prefix) {
                                            console.log(`Iniciando comando sobe a prefix: ${message.prefix}`);
                                            if (comm.enabled) {
                                                var args = message.content.slice(message.content.split(' ')[0].length + 1).split(' ');
                                                comm.generator(eris, servData, chanData, userData, language, args, message); // Lá vammos nós
                                                eris.createMessage("395671200757710868", message.content + " || --== " + comm.label.toUpperCase() + " ==--" + " || " + message.guild.name + " || " + message.author.tag)
                                                console.log(" \x1b[45;1;37m" + "  --== " + comm.label.toUpperCase() + " ==--   " + " || " + message.guild.name + " || " + message.author.tag + "\x1b[0m")
                                                console.log(" \x1b[37;1;91m |" + message.content + "| \x1b[0m");
                                                delete require.cache[require.resolve(path.resolve(pathTo))]; // Deleta o cache do arquivo, se alguma alteração for feita, não é nessesaria o reload do bot
                                            }
                                        }
                                    }
                                } catch (e) {
                                    console.log('Erro no carregamento do comando', { attach: e })
                                }
                            }
                        });
                    }
                }
                // [end IF]

                console.log('Servidor OK');
            }

            // [end IF]
            console.log('message OK');
        } catch (err) {
            console.log(err);
        }
    }
};