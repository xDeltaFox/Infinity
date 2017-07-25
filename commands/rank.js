let eris = require('../lib/client');
let fs = require('fs');
let arraySort = require('array-sort');
let moment = require('moment');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let locale = require('../utils/lang');
let firebase = require("firebase");

var db = firebase.database();
var ref = db.ref();

module.exports = {
    label: 'rank',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[```" + message.channel.guild.name + "```" + "~>" + "```" + message.channel.name + "```]" + "**" + message.author.username + "**:" + message.content);
            ref.once("value")
                .then(function(snapshot) {
                    var lang = snapshot.child('Bot/Servidor/' + message.channel.guild.id).child('language');

                    var rankItem = [];
                    var ranked = [];
                    var iter = 0;
                    var aiter = 0;
                    var baiter = 0;
                    var psent = 0;
                    eris.guilds.forEach(i => {
                        iter++
                        aiter = (i.members.size + aiter)

                        var botamt = 0;
                        i.members.map(member => {
                            if (member.bot) {
                                botamt++;
                            }
                        });
                        baiter = ((i.members.size - botamt) + baiter)
                        var psent = (botamt / i.members.size) * 100
                            //if (psent >= 15) return;

                        if (i.id == "110373943822540800") return;
                        rankItem.exp = i.members.size
                        rankItem.level = flag(i.region)
                        rankItem.name = (i.name)
                        rankItem.id = (i.id)

                        rankItem.bots = (botamt)
                        ranked.push(rankItem)
                        rankItem = []
                    });
                    arraySort(ranked, 'exp', {
                        reverse: true
                    });

                    var fields = "";

                    var medals = [':first_place: 1st',
                        ':second_place: 2nd',
                        ':third_place: 3rd',
                        ':medal: 4th',
                        ':medal: 5th'
                    ]

                    for (var i = 0; i < ranked.length; i++) {
                        var parsent = (ranked[i].bots / ranked[i].exp) * 100;
                        var server = 0;
                        if (server < ranked.length) {
                            if (parsent < 15) {
                                fields += "\n" + medals[server] + "\n```" + ranked[i].name + "``` \n  ID - " + ranked[i].id;
                                fields += '\nRegião :' + ranked[i].level + '\n**' + ranked[i].exp + '** Membros';
                                fields += "\nBots\n" + ranked[i].bots + " " + " (" + parsent.toFixed(2) + "%)";
                                server++;
                            }
                        }
                    }

                    function flag(input) {
                        let R = input
                        switch (true) {
                            case R.includes("eu-"):
                                return ":flag_eu: " + R.substr(3)[0].toUpperCase();
                                break;
                            case R.includes("us-"):
                                return ":flag_us: " + R.substr(3)[0].toUpperCase();
                                break;
                            case R.includes("brazil"):
                                return ":flag_br:";
                                break;
                            case R.includes("london"):
                                return ":flag_gb:";
                                break;
                            case R.includes("singapore"):
                                return ":flag_sg:";
                                break;
                            case R.includes("hongkong"):
                                return ":flag_hk:";
                                break;
                            case R.includes("russia"):
                                return ":flag_ru:";
                                break;
                            case R.includes("sydney"):
                                return ":flag_au:";
                                break;
                            default:
                                return ":map: " + R;
                                break;
                        }
                    }

                    eris.createMessage(message.channel.id, {
                        embed: {
                            color: Math.floor(Math.random() * 16777216),
                            thumbnail: {
                                url: eris.user.avatarURL,
                                proxy_url: eris.user.avatarURL
                            },
                            description: fields,
                            footer: {
                                text: moment().format("llll"),
                                icon_url: message.author.avatarURL
                            }
                        }
                    });
                });
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