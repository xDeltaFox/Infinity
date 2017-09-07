let client = require("../client");
let eris = client.eris;
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let tcpp = require('tcp-ping');
let async = require('async');

module.exports = {
    label: 'ping',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[`" + message.channel.guild.name + "`" + "~>" + "`" + message.channel.name + "`]" + "**" + message.author.username + "**:" + message.content);

            var servers = [];
            var pingd = "";

            // for (var i = 0; i < servers.length; i++) {
            //     pingd += ``
            // }

            var ping = {};

            ping.getPingRespMsg = function() {
                return new Promise(function(resolve, reject) {
                    var pingd = [];

                    getPings(function(err, res) {
                        pingd.push("<:GCP:342352642422341632> Google Cloud API Latency: " + res[0] + "ms");
                        pingd.push("<:C9:342354299919007754> Cloud 9 (Infinity) Latency: " + res[1] + "ms");
                        pingd.push(":level_slider: Infinity API & Database (Firebase) Latency: " + res[2] + "ms");
                        pingd.push("<:discord:342350760136409108> Discord Gateway Latency: " + res[3] + "ms");
                        pingd.push("\nMinecraft Status: ");
                        pingd.push("<:grass:342345461686075392> minecraft.net Latency: " + res[4] + "ms");
                        pingd.push("<:grass:342345461686075392> session.minecraft.net Latency: " + res[5] + "ms");
                        pingd.push("<:mojang:342345463309008896> account.mojang.com Latency: " + res[6] + "ms");
                        pingd.push("<:mojang:342345463309008896> auth.mojang.com Latency: " + res[7] + "ms");
                        pingd.push("<:grass:342345461686075392> skins.minecraft.net Latency: " + res[8] + "ms");
                        pingd.push("<:mojang:342345463309008896> authserver.mojang.com Latency: " + res[9] + "ms");
                        pingd.push("<:mojang:342345463309008896> sessionserver.mojang.com Latency: " + res[10] + "ms");
                        pingd.push("<:mojang:342345463309008896> api.mojang.com Latency: " + res[11] + "ms");
                        pingd.push("<:grass:342345461686075392> textures.minecraft.net Latency: " + res[12] + "ms");
                        pingd.push("<:mojang:342345463309008896> mojang.com Latency: " + res[13] + "ms");

                        resolve(pingd.join("\n"));
                    });

                    getPings(function(err, res) {
                        //console.log(res);
                    });

                    //console.log(pingd);
                });
            }

            function getPing(server, port, callback) {
                return function(callback) {
                    tcpp.ping({ address: 'googleapis.com', port: 80, attempts: 3 }, function(err, res) {
                        callback(err, parseFloat(res.min).toFixed(2));
                    });
                }
            }

            function getPings(callback) {
                async.series([
                    getPing("googleapis.com", 80),
                    getPing("ide.c9.io", 80),
                    getPing("firebase.google.com", 80),
                    getPing("gateway.discord.gg", 80),
                    getPing("minecraft.net", 80),
                    getPing("session.minecraft.net", 80),
                    getPing("account.mojang.com", 80),
                    getPing("auth.mojang.com", 80),
                    getPing("skins.minecraft.net", 80),
                    getPing("authserver.mojang.com", 80),
                    getPing("sessionserver.mojang.com", 80),
                    getPing("api.mojang.com", 80),
                    getPing("textures.minecraft.net", 80),
                    getPing("mojang.com", 80)
                ], function(err, res) {
                    //console.log(res);
                    callback(err, res);
                });
            }

            eris.createMessage(message.channel.id, ":satellite: Pinging...").then(messageTE => {
                ping.getPingRespMsg().then(statusMsg => {
                    messageTE.edit("`Infinity Server Status (PINGED)` :satellite_orbital:\n" + statusMsg);
                });
            });

            //eris.createMessage(message.channel.id, 'Pinging...').then(msg => setTimeout(function() { msg.edit(`:ping_pong: Que ping... ${msg.timestamp - message.timestamp}ms`) }, 1000));

        } catch (err) {
            eris.createMessage(config.logChannel, `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:${this.label}\n\t>> ${err.response}\n\t${err.stack}`);
        }
    },
    options: {
        description: 'Veja a latencia do bot',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['ping']
    }
};