let client = require("../../client");
let eris = client.eris;
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let locale = require('../utils/lang');
let gear = require('../../utils/gearboxes');
let request = require('request');
let cheerio = require('cheerio');

module.exports = {
    label: 'teste',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[`" + message.channel.guild.name + "`" + "~>" + "`" + message.channel.name + "`]" + "**" + message.author.username + "**:" + message.content);
            if (message.author.id == "238975494047924224") {
                var lang = gear.DB.get(message.channel.guild.id).modules.lang;
                //Set Them Up
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

                var nameHeros = args.replace(' ', '-');

                request('https://www.dotabuff.com/heroes/' + nameHeros, async function(error, response, html) {

                    if (!error && response.statusCode == 200) {
                        let $ = cheerio.load(html);

                        message.channel.createEmbed()
                            .title($('.header-content-title h1').html())
                            .description("")
                            .author("Dota", "", "")
                            .color('')
                            .thumbnail("")
                            .field("", , true)
                            .field("", , true)
                            .footer(`© 2013 - ${(new Date).getYear()+1900} | Valve Corporation, Inc.`, "")
                            .send()
                    }
                })
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