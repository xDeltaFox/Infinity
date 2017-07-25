let eris = require('../lib/client');
let firebase = require('firebase');
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let locale = require('../utils/lang');

var db = firebase.database();
var ref = db.ref();

module.exports = {
    label: 'betroll',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            var setUserData = ref.child('Bot/Usuario/' + message.author.id);
            ref.once("value")
                .then(function(snapshot) {
                    var existsData = snapshot.child('Bot/Usuario/' + message.author.id).exists();
                    var userData = snapshot.child('Bot/Usuario/' + message.author.id);
                    var lang = snapshot.child('Bot/Servidor/' + message.channel.guild.id).child('language');
                    if (existsData) {
                        var content = message.content.split(' ');
                        var a = userData.child('money').val();
                        var one = Math.floor(Math.random() * 10);
                        var two = Math.floor(Math.random() * 10);
                        var three = Math.floor(Math.random() * 10);
                        var text1 = locale(lang.val(), "betroll.text1").replace("${one}", one).replace("${two}", two).replace("${three}", three).replace("${message.author.mention}", message.author.mention).replace("${content[1]*2}", content[1] * 2);
                        var text2 = locale(lang.val(), "betroll.text2").replace("${one}", one).replace("${two}", two).replace("${three}", three).replace("${message.author.mention}", message.author.mention).replace("${content[1]}", content[1]);
                        var text3 = locale(lang.val(), "betroll.text3").replace("${message.author.mention}", message.author.mention);
                        if (userData.child('money').val() > content[1]) {
                            if (one == two || two == three || three == one) {
                                eris.createMessage(message.channel.id, text1);
                                setUserData.child('money').set(a + content[1] * 2);
                            } else {
                                eris.createMessage(message.channel.id, text2);
                                setUserData.child('money').set(a - content[1]);
                            }
                        } else {
                            eris.createMessage(message.channel.id, text3);
                        }
                    }
                });
        } catch (err) {
            eris.createMessage(config.logChannel, `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:${this.label}\n\t>> ${err.response}\n\t${err.stack}`);
        }
    },
    options: {
        description: 'rode os numeros e ganhe money',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['ts']
    }
};