let eris = require('../lib/client');
let moment = require("moment");
let tz = require("moment-timezone");
let firebase = require("firebase");

var db = firebase.database();
var ref = db.ref();

module.exports = {
    event: 'messageUpdate',
    enabled: true,
    handler: (message, oldmessage) => {
        if (message.author.bot) return;
        if (message.channel.id != '335175374189363202') {
            ref.once("value")
                .then(function(snapshot) {
                    //log joinMember
                    var log = snapshot.child('Bot/Servidor/' + message.channel.guild.id + '/log/');

                    if (log.child('GuildMemberAdd').val()) {
                        eris.createMessage(log.child('logchannelid').val(), `[${moment().tz('America/Sao_Paulo').format('lll')}] :pencil: Log ` + "`MessageUpdate`:" + "```\n" + `Usuario: ${message.author.username} <${message.author.id}>\nChannel: #${message.channel.name} <${message.channel.id}>` + "\n```" + `\n` + "```\n" + `Antes: ${oldmessage.content}` + "\n```" + "\n```\n" + `Depois: ${message.content}` + "\n```");
                    }
                });
        }
    }
};