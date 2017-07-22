let eris = require('../lib/client');
let firebase = require("firebase");
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

var db = firebase.database();
var ref = db.ref();

module.exports = {
    label: 'money',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            var setuserdata = ref.child('Bot/Usuario/' + message.author.id + '/');
            ref.once("value")
                .then(function(snapshot) {
                    var userdata = snapshot.child('Bot/Usuario/' + message.author.id + '/');

                    if (userdata.child('levels/money').val() == undefined) {
                        setuserdata.child('levels/money').set(500);
                        eris.createMessage(message.channel.id, `Add #500 Rows a sua carteira - ${message.author.mention}`);
                    } else {
                        eris.createMessage(message.channel.id, "Você tem " + userdata.child('levels/money').val() + " de row. ");
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