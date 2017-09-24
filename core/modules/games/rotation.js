let client = require("../../client");
let eris = client.eris;
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let locale = require('../../utils/lang');
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

            var lang = gear.DB.get(message.channel.guild.id).modules.lang;
            var args = message.content.split(/\s+/).slice(1).join(" ").toLowerCase()
            var Server = message.channel.guild;
            var Channel = message.channel;
            var Author = message.author;
            //var Target = message.mentions[0];
            var Member = message.member;
            if (Author.bot) return;
            var MSG = message.content;

            var DB = client.DB;
            var userDB = client.userDB;
            var userData = userDB.get(Author.id).modules;

            var content = message.content.split(' ');
            var setData = DB.get(message.channel.guild.id).modules;

            //-----------------MAGIC---------------------

            if (args === "league of legends" || args === "league" || args === "lol") lol();
            else if (args === "heroes of the storm" || args === "hots" || args === "hos" || args === "heroes") hots();
            else if (args === "smite") smite();
            else return;

            function smite() {

                request('https://smite.gamepedia.com/Smite_Wiki', async function(error, response, html) {

                    if (!error && response.statusCode == 200) {
                        let $ = cheerio.load(html);
                        $('#mf-free_rotation').each(function(i, element) {
                            cheerio.load(element)("a").each((i, elm) => {
                                if (i < 5) return;
                                rotation.push(elm.attribs.title)
                            })
                        })
                    }

                    message.channel.createEmbed()
                        .description("Weekly God Rotation")
                        .author("Smite", "http://orig09.deviantart.net/6fc3/f/2013/095/9/a/smite___icon_by_j1mb091-d572cyp.png", "https://smite.gamepedia.com/Smite_Wiki")
                        .color('#ea6f2e')
                        .thumbnail("http://orig12.deviantart.net/8394/f/2016/338/1/2/smite_icon__4__by_malfacio-daqii8u.png")
                        .field("●▬▬▬๑۩۩๑▬▬▬●", `
                        :small_orange_diamond:  ${rotation[0]}
                        :small_orange_diamond:  ${rotation[1]}
                        :small_orange_diamond:  ${rotation[2]}
                        :small_orange_diamond:  ${rotation[3]}
                        `, true)
                        .field("●▬▬▬๑۩۩๑▬▬▬●", `
                        :small_orange_diamond:  ${rotation[4]}
                        :small_orange_diamond:  ${rotation[5]}
                        :small_orange_diamond:  ${rotation[6]}
                        :small_orange_diamond:  ${rotation[7]}
                        `, true)
                        .footer(`© 2014 - ${(new Date).getYear()+1900} | Hi-Rez Studios, Inc.`, "http://www.gamasutra.com/db_area/images/news/2014/Apr/214615/hr.jpg")
                        .send()
                })
            }

            function host() {
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
            }

            function lol() {
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