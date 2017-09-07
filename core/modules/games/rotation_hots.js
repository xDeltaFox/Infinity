let client = require("../client");
let eris = client.eris;
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let locale = require('../utils/lang');
let moment = require('moment');
var request = require('request');
var cheerio = require('cheerio');
var rotation = [];

module.exports = {
    label: 'rotation_hots',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[`" + message.channel.guild.name + "`" + "~>" + "`" + message.channel.name + "`]" + "**" + message.author.username + "**:" + message.content);
            // if (message.author.id != "238975494047924224") {
            //     eris.createMessage(message.channel.id, `Comando ainda em desemvolvimento, não perturbe.`);
            // } else {
            request('http://heroesofthestorm.gamepedia.com/Free_rotation', function(error, response, html) {

                if (!error && response.statusCode == 200) {
                    var $ = cheerio.load(html);
                    $('.hero-tile').each(function(i, element) {

                        //console.log(element)
                        //  console.log(this)
                        var a = $(this).children()[0] //[0];
                        rotation.push(a.attribs.title);
                        // if (i < 10) {
                        //     rotation[0].push(a.attribs.title);
                        // } else {
                        //     rotation.push(a.attribs.title);
                        // }
                    });
                    console.log(rotation)

                    eris.createMessage(message.channel.id, {
                        embed: {
                            title: "Heroes of the Storm",
                            description: "Rotação de campões da semana",
                            color: '395790',
                            thumbnail: {
                                url: "http://www.mpcgaming.com/img/hotsicon.png"
                            },
                            fields: [{
                                name: "All Levels",
                                value: `${rotation[0]}\n${rotation[1]}\n${rotation[2]}\n${rotation[3]}\n${rotation[4]}`,
                                inline: true
                            }, {
                                name: ".",
                                value: `${rotation[5]}\n${rotation[6]}\n${rotation[7]}\n${rotation[8]}\n${rotation[9]}`,
                                inline: true
                            }, {
                                name: "Level 5",
                                value: `${rotation[10]}`,
                                inline: true
                            }, {
                                name: "Level 7",
                                value: `${rotation[11]}`,
                                inline: true
                            }, {
                                name: "Level 12",
                                value: `${rotation[12]}`,
                                inline: true
                            }, {
                                name: "Level 15",
                                value: `${rotation[13]}`,
                                inline: true
                            }],
                            footer: {
                                text: `ID: ${message.author.id} || ${moment().tz('America/Sao_Paulo').format("LLLL")}`,
                                icon_url: message.author.avatarURL
                            }
                        }
                    });
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