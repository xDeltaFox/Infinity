let eris = require('../lib/client');
let fs = require('fs');
let firebase = require("firebase");
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

var db = firebase.database();
var ref = db.ref();

module.exports = {
    label: 'welcome',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[```" + message.channel.guild.name + "```" + "~>" + "```" + message.channel.name + "```]" + "**" + message.author.username + "**:" + message.content);
            var setlinkData = ref.child('Bot/Servidor/' + message.channel.guild.id + '/');

            ref.once("value")
                .then(function(snapshot) {
                    var server = snapshot.child('Bot/Servidor/' + message.channel.guild.id + '/');
                    if (server.child('welcomechannelid').val() != undefined) {
                        if (server.child('welcome').val()) {
                            setlinkData.child('welcome').set(false);
                            eris.createMessage(message.channel.id, "boas-vindas foi desativado no server: " + message.channel.guild.name);
                            eris.createMessage(message.channel.id, `Aguarde...`);
                            setTimeout(function() {
                                eris.createMessage(message.channel.id, "Tem certerza que quer mostar as `boas-vindas` no chat principal?");
                                message.channel.awaitMessages(m => m.content == "sim" || m.content == "não", { time: 10000, maxMatches: 1 }).then(responses => {
                                    try {
                                        if (responses[0].content == "sim" && responses[0].author.id == message.author.id) {
                                            setlinkData.child('welcomechannelid').set(message.channel.guild.defaultChannel.id);
                                            eris.createMessage(message.channel.id, `<#${message.channel.guild.defaultChannel.id}> foi definido como chat dos welcome.`);
                                            eris.createMessage(message.channel.id, `Aguarde...`);
                                            setTimeout(function() {
                                                eris.createMessage(message.channel.id, "Quer mudar a mensagem de boas-vindas?");
                                                message.channel.awaitMessages(m => m.content == "sim" || m.content == "não", { time: 10000, maxMatches: 1 }).then(responses => {
                                                    try {
                                                        if (responses[0].content == "sim" && responses[0].author.id == message.author.id) {
                                                            eris.createMessage(message.channel.id, "Digite sua mensgem de boas-vindas...");
                                                            message.channel.awaitMessages(m => m.content != "", { time: 10000, maxMatches: 1 }).then(responses => {
                                                                try {
                                                                    if (responses[0].content != "" && responses[0].author.id == message.author.id) {
                                                                        setlinkData.child('msgwelcome').set(responses[0].content);
                                                                        eris.createMessage(message.channel.id, `Parabéns, Boas-vindas foi configurado com sucesso.`);
                                                                    } else {
                                                                        eris.createMessage(message.channel.id, `OPS!! Algo deu errado.`);
                                                                    }
                                                                } catch (e) {
                                                                    message.channel.createMessage("Me chama, e fica inativo me deixando no vacuo, muito obrigrado por nada. " + message.author.mention);
                                                                }
                                                            });
                                                        } else if (responses[0].content == "não" && responses[0].author.id == message.author.id) {
                                                            setlinkData.child('msgwelcome').set(`%MENTION% sejá bem-vindo ao %SERVER%`);
                                                            eris.createMessage(message.channel.id, `Mensagem de boas-vindas foi definida como padrão.`);
                                                        }
                                                    } catch (e) {
                                                        message.channel.createMessage("Me chama, e fica inativo me deixando no vacuo, muito obrigrado por nada. " + message.author.mention);
                                                    }
                                                });
                                            }, 5000);
                                        } else if (responses[0].content == "não" && responses[0].author.id == message.author.id) {
                                            setlinkData.child('welcomechannelid').set(message.channel.id);
                                            eris.createMessage(message.channel.id, `<#${message.channel.id}> foi definido como chat dos welcome.`);
                                            eris.createMessage(message.channel.id, `Aguarde...`);
                                            setTimeout(function() {
                                                eris.createMessage(message.channel.id, "Quer mudar a mensagem de boas-vindas?");
                                                message.channel.awaitMessages(m => m.content == "sim" || m.content == "não", { time: 10000, maxMatches: 1 }).then(responses => {
                                                    try {
                                                        if (responses[0].content == "sim" && responses[0].author.id == message.author.id) {
                                                            eris.createMessage(message.channel.id, "Digite sua mensgem de boas-vindas...");
                                                            message.channel.awaitMessages(m => m.content != "", { time: 10000, maxMatches: 1 }).then(responses => {
                                                                try {
                                                                    if (responses[0].content != "" && responses[0].author.id == message.author.id) {
                                                                        setlinkData.child('msgwelcome').set(responses[0].content);
                                                                        eris.createMessage(message.channel.id, `Parabéns, Boas-vindas foi configurado com sucesso.`);
                                                                    } else {
                                                                        eris.createMessage(message.channel.id, `OPS!! Algo deu errado.`);
                                                                    }
                                                                } catch (e) {
                                                                    message.channel.createMessage("Me chama, e fica inativo me deixando no vacuo, muito obrigrado por nada. " + message.author.mention);
                                                                }
                                                            });
                                                        } else if (responses[0].content == "não" && responses[0].author.id == message.author.id) {
                                                            setlinkData.child('msgwelcome').set(`%MENTION% sejá bem-vindo ao %SERVER%`);
                                                            eris.createMessage(message.channel.id, `Mensagem de boas-vindas foi definida como padrão.`);
                                                        }
                                                    } catch (e) {
                                                        message.channel.createMessage("Me chama, e fica inativo me deixando no vacuo, muito obrigrado por nada. " + message.author.mention);
                                                    }
                                                });
                                            }, 5000);
                                        }
                                    } catch (e) {
                                        message.channel.createMessage("Me chama, e fica inativo me deixando no vacuo, muito obrigrado por nada. " + message.author.mention);
                                    }
                                });
                            }, 5000);
                        } else {
                            setlinkData.child('welcome').set(true);
                            eris.createMessage(message.channel.id, "boas-vindas foi ativado no server: " + message.channel.guild.name);
                            eris.createMessage(message.channel.id, `Aguarde...`);
                            setTimeout(function() {
                                eris.createMessage(message.channel.id, "Tem certerza que quer mostar as `boas-vindas` no chat principal?");
                                message.channel.awaitMessages(m => m.content == "sim" || m.content == "não", { time: 10000, maxMatches: 1 }).then(responses => {
                                    try {
                                        if (responses[0].content == "sim" && responses[0].author.id == message.author.id) {
                                            setlinkData.child('welcomechannelid').set(message.channel.guild.defaultChannel.id);
                                            eris.createMessage(message.channel.id, `<#${message.channel.guild.defaultChannel.id}> foi definido como chat dos welcome.`);
                                            eris.createMessage(message.channel.id, `Aguarde...`);
                                            setTimeout(function() {
                                                eris.createMessage(message.channel.id, "Quer mudar a mensagem de boas-vindas?");
                                                message.channel.awaitMessages(m => m.content == "sim" || m.content == "não", { time: 10000, maxMatches: 1 }).then(responses => {
                                                    try {
                                                        if (responses[0].content == "sim" && responses[0].author.id == message.author.id) {
                                                            eris.createMessage(message.channel.id, "Digite sua mensgem de boas-vindas...");
                                                            message.channel.awaitMessages(m => m.content != "", { time: 10000, maxMatches: 1 }).then(responses => {
                                                                try {
                                                                    if (responses[0].content != "" && responses[0].author.id == message.author.id) {
                                                                        setlinkData.child('msgwelcome').set(responses[0].content);
                                                                        eris.createMessage(message.channel.id, `Parabéns, Boas-vindas foi configurado com sucesso.`);
                                                                    } else {
                                                                        eris.createMessage(message.channel.id, `OPS!! Algo deu errado.`);
                                                                    }
                                                                } catch (e) {
                                                                    message.channel.createMessage("Me chama, e fica inativo me deixando no vacuo, muito obrigrado por nada. " + message.author.mention);
                                                                }
                                                            });
                                                        } else if (responses[0].content == "não" && responses[0].author.id == message.author.id) {
                                                            setlinkData.child('msgwelcome').set(`%MENTION% sejá bem-vindo ao %SERVER%`);
                                                            eris.createMessage(message.channel.id, `Mensagem de boas-vindas foi definida como padrão.`);
                                                        }
                                                    } catch (e) {
                                                        message.channel.createMessage("Me chama, e fica inativo me deixando no vacuo, muito obrigrado por nada. " + message.author.mention);
                                                    }
                                                });
                                            }, 5000);
                                        } else if (responses[0].content == "não" && responses[0].author.id == message.author.id) {
                                            setlinkData.child('welcomechannelid').set(message.channel.id);
                                            eris.createMessage(message.channel.id, `<#${message.channel.id}> foi definido como chat dos welcome.`);
                                            eris.createMessage(message.channel.id, `Aguarde...`);
                                            setTimeout(function() {
                                                eris.createMessage(message.channel.id, "Quer mudar a mensagem de boas-vindas?");
                                                message.channel.awaitMessages(m => m.content == "sim" || m.content == "não", { time: 10000, maxMatches: 1 }).then(responses => {
                                                    try {
                                                        if (responses[0].content == "sim" && responses[0].author.id == message.author.id) {
                                                            eris.createMessage(message.channel.id, "Digite sua mensgem de boas-vindas...");
                                                            message.channel.awaitMessages(m => m.content != "", { time: 10000, maxMatches: 1 }).then(responses => {
                                                                try {
                                                                    if (responses[0].content != "" && responses[0].author.id == message.author.id) {
                                                                        setlinkData.child('msgwelcome').set(responses[0].content);
                                                                        eris.createMessage(message.channel.id, `Parabéns, Boas-vindas foi configurado com sucesso.`);
                                                                    } else {
                                                                        eris.createMessage(message.channel.id, `OPS!! Algo deu errado.`);
                                                                    }
                                                                } catch (e) {
                                                                    message.channel.createMessage("Me chama, e fica inativo me deixando no vacuo, muito obrigrado por nada. " + message.author.mention);
                                                                }
                                                            });
                                                        } else if (responses[0].content == "não" && responses[0].author.id == message.author.id) {
                                                            setlinkData.child('msgwelcome').set(`%MENTION% sejá bem-vindo ao %SERVER%`);
                                                            eris.createMessage(message.channel.id, `Mensagem de boas-vindas foi definida como padrão.`);
                                                        }
                                                    } catch (e) {
                                                        message.channel.createMessage("Me chama, e fica inativo me deixando no vacuo, muito obrigrado por nada. " + message.author.mention);
                                                    }
                                                });
                                            }, 5000);
                                        }
                                    } catch (e) {
                                        message.channel.createMessage("Me chama, e fica inativo me deixando no vacuo, muito obrigrado por nada. " + message.author.mention);
                                    }
                                });
                            }, 5000);
                        }
                    } else {
                        eris.createMessage(message.channel.id, `${message.author.mention} - Você me quebrou :upside_down:`);
                    }
                });
        } catch (err) {
            eris.log(message);
        }
    },
    options: {
        description: 'Mensagem de Boas-vindas',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['ts']
    }
};