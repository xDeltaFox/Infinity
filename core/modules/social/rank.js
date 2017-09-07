let client = require("../client");
let eris = client.eris;
let fs = require('fs');
let arraySort = require('array-sort');
let moment = require('moment');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let locale = require('../utils/lang');
let gear = require('../utils/gearboxes');

module.exports = {
    label: 'rank',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            var content = message.content.split(' ')[1];
            eris.createMessage(config.starbucks, "[`" + message.channel.guild.name + "`" + "~>" + "`" + message.channel.name + "`]" + "**" + message.author.username + "**:" + message.content);
            var lang = gear.DB.get(message.channel.guild.id).modules.lang;
            //Set Them Up
            var Server = message.channel.guild;
            var Channel = message.channel;
            var Author = message.author;
            //var Target = message.mentions[0];
            if (Author.bot) return;
            var MSG = message.content;

            var DB = client.DB;
            var userDB = client.userDB;
            var userData = userDB.get(Author.id).modules;

            var rankItem = [];
            var ranked = [];
            var iter = 0;
            var aiter = 0;
            var baiter = 0;
            var psent = 0;

            var fields = "";
            var title = "Um rank qualquer";

            var medals = [':first_place: 1st',
                ':second_place: 2nd',
                ':third_place: 3rd',
                ':medal: 4th',
                ':medal: 5th'
            ]

            switch (content) {
                case 'xp':
                    title = "Rank de XP";
                    eris.users.forEach(e => {
                        var xp = userDB.get(Author.id).modules.exp;
                        var money = userDB.get(Author.id).modules.money;
                        rankItem.exp = xp.val();
                        rankItem.money = money.val();
                        rankItem.name = e.username;
                        rankItem.id = e.id;

                        ranked.push(rankItem);
                        rankItem = [];
                    });

                    arraySort(ranked, 'exp', {
                        reverse: true
                    });

                    for (var i = 0; i < 5; i++) {
                        fields += "\n" + medals[i] + "\n```" + ranked[i].name + "``` \n  ID - " + ranked[i].id;
                        fields += '\t**Xp**: ' + ranked[i].exp + "\n";
                    }
                    break;

                case 'money':
                    title = "Rank de Dinheiro";
                    eris.users.forEach(e => {
                        var xp = userDB.get(Author.id).modules.exp;
                        var money = userDB.get(Author.id).modules.money;
                        rankItem.exp = xp.val();
                        rankItem.money = money.val();
                        rankItem.name = e.username;
                        rankItem.id = e.id;

                        ranked.push(rankItem);
                        rankItem = [];
                    });

                    arraySort(ranked, 'money', {
                        reverse: true
                    });

                    for (var i = 0; i < 5; i++) {
                        fields += "\n" + medals[i] + "\n```" + ranked[i].name + "``` \n  ID - " + ranked[i].id;
                        fields += '\t**money**: ' + ranked[i].money + "\n";
                    }
                    break;

                default:
                    title = "Rank de Servers";
                    eris.guilds.forEach(i => {
                        iter++;
                        aiter = (i.members.size + aiter);

                        var botamt = 0;
                        i.members.map(member => {
                            if (member.bot) {
                                botamt++;
                            }
                        });
                        baiter = ((i.members.size - botamt) + baiter);
                        var psent = (botamt / i.members.size) * 100;
                        //if (psent >= 15) return;

                        if (i.id == "110373943822540800") return;
                        rankItem.member = i.members.size;
                        rankItem.region = flag(i.region);
                        rankItem.name = (i.name);
                        rankItem.id = (i.id);

                        rankItem.bots = (botamt);
                        ranked.push(rankItem);
                        rankItem = [];
                    });

                    arraySort(ranked, 'member', {
                        reverse: true
                    });

                    for (var i = 0; i < ranked.length; i++) {
                        var parsent = (ranked[i].bots / ranked[i].member) * 100;
                        var server = 0;
                        if (server < ranked.length) {
                            if (parsent < 25) {
                                fields += "\n" + medals[server] + "\n```" + ranked[i].name + "``` \n  ID - " + ranked[i].id;
                                fields += '\t**Região**: ' + ranked[i].region + '\n**Membros**: ' + ranked[i].member;
                                fields += "\t**Bots**: " + ranked[i].bots + " " + " (" + parsent.toFixed(2) + "%)";
                                server++;
                            }
                        }
                    }
                    break;
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
                    title: title,
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