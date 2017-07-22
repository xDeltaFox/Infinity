let eris = require('../lib/client');
let fs = require('fs');
let cheerio = require('cheerio');
let request = require("request");
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

module.exports = {
    label: 'pokemon',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            request("http://digimonpets.xpg.uol.com.br/", function(err, resp, body) {
                if (!err && resp.statusCode == 200) {
                    var $ = cheerio.load(body);
                    var lvl = $('.tbody tr td').attr('small');
                    //var name =  $('.tbody tr td img').eq(2).attr('src').split('/').pop().replace(/(.gif)$/, '');
                    var exp = $('.tbody tr td').attr('small');
                    eris.createMessage(message.channel.id, `AKI >> ${lvl} // ${exp}`);
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