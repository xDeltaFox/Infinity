let moment = require('moment');
let request = require('request');
let cheerio = require('cheerio');

module.exports = {
    label: 'rotation_hots',
    enabled: true,
    generator: async(eris, serverDB, channelDB, userDB, language, args, message) => {
        try {
            var args = message.content.split(/\s+/).slice(1).join(" ").toLowerCase()
            var Server = message.channel.guild;
            var Channel = message.channel;
            var Author = message.author;
            var Target = message.mentions;
            var Member = message.member;
            var rotation = [];

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
                    eris.createMessage(message.channel.id, {
                        embed: {
                            title: "Smite",
                            description: "Weekly God Rotation",
                            author: {
                                name: "Smite",
                                icon_url: "http://orig09.deviantart.net/6fc3/f/2013/095/9/a/smite___icon_by_j1mb091-d572cyp.png",
                                url: "https://smite.gamepedia.com/Smite_Wiki"
                            },
                            color: 0xea6f2e,
                            thumbnail: {
                                url: "http://orig12.deviantart.net/8394/f/2016/338/1/2/smite_icon__4__by_malfacio-daqii8u.png"
                            },
                            fields: [{
                                name: "●▬▬▬๑۩۩๑▬▬▬●",
                                value: `:small_orange_diamond:  ${rotation[0]}\n:small_orange_diamond:  ${rotation[1]}\n:small_orange_diamond:  ${rotation[2]}\n:small_orange_diamond:  ${rotation[3]}`,
                                inline: true
                            }, {
                                name: "●▬▬▬๑۩۩๑▬▬▬●",
                                value: `:small_orange_diamond:  ${rotation[4]}\n:small_orange_diamond:  ${rotation[5]}\n:small_orange_diamond:  ${rotation[6]}\n:small_orange_diamond:  ${rotation[7]}`,
                                inline: true
                            }],
                            footer: {
                                text: `© 2014 - ${(new Date).getYear()+1900} | Hi-Rez Studios, Inc.`,
                                icon_url: "http://www.gamasutra.com/db_area/images/news/2014/Apr/214615/hr.jpg"
                            }
                        }
                    });
                })
            }

            function hots() {
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
                    var champions = '';
                    if (!error && response.statusCode == 200) {
                        var $ = cheerio.load(html);
                        $('.free_champion_rotation li').each(function(i, element) {
                            var a = $(element)[0].children[0].children[0].children[2].children[0].children[0].data;
                            champions += a + "\n";
                        });
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
                                value: champions,
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
            console.log(err);
        }
    }
};