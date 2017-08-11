let eris = require('../lib/client');
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let locale = require('../utils/lang');
let firebase = require("firebase");
let moment = require('moment');
let util = require('util');
var request = require('request');
var cheerio = require('cheerio');
var rotation = [];

var db = firebase.database();
var ref = db.ref();

module.exports = {
    label: 'rotation_lol',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[`" + message.channel.guild.name + "`" + "~>" + "`" + message.channel.name + "`]" + "**" + message.author.username + "**:" + message.content);
            if (message.author.id != "238975494047924224") {
                eris.createMessage(message.channel.id, `Comando ainda em desemvolvimento, não perturbe.`);
            } else {
                ref.once("value")
                    .then(function(snapshot) {
                        var lang = snapshot.child('Bot/Servidor/' + message.channel.guild.id).child('language');

                        request('http://leagueoflegends.wikia.com/wiki/Free_champion_rotation', function(error, response, html) {

                            if (!error && response.statusCode == 200) {
                                var $ = cheerio.load(html);
                                $('span.champion-icon').each(function(i, element) {

                                    var a = $(this).children()[1]
                                    if (i < 10) {
                                        rotation.push(a.children[0].attribs.title);

                                    }
                                });
                                console.log(rotation)
                            }

                            var fields = [];

                            for (var i = 0; i < rotation.length; i++) {
                                fields.push(rotation[i]);
                            }

                            eris.createMessage(message.channel.id, {
                                embed: {
                                    title: "League of Legends",
                                    description: "Rotação de campões da semana",
                                    color: '395790',
                                    thumbnail: {
                                        url: "https://vignette1.wikia.nocookie.net/leagueoflegends/images/1/12/League_of_Legends_Icon.png/revision/latest?cb=20150402234343"
                                    },
                                    fields: [{
                                        name: "All Levels",
                                        value: `${rotation[0]}\n${rotation[1]}\n${rotation[2]}\n${rotation[3]}\n${rotation[4]}\n${rotation[5]}\n${rotation[6]}\n${rotation[7]}\n${rotation[8]}\n${rotation[9]}`,
                                        inline: true
                                    }],
                                    footer: {
                                        text: `ID: ${message.author.id} || ${moment().tz('America/Sao_Paulo').format("LLLL")}`,
                                        icon_url: message.author.avatarURL
                                    }
                                }
                            });
                        });
                    });
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