let eris = require('../lib/client');
let moment = require("moment");
let tz = require("moment-timezone");
let firebase = require("firebase");

var db = firebase.database();
var ref = db.ref();

module.exports = {
    event: 'voiceChannelSwitch',
    enabled: true,
    handler: (member, newchannel, oldchannel) => {

        ref.once("value")
            .then(function(snapshot) {
                var log = snapshot.child('Bot/Servidor/' + member.guild.id + '/log/');

                if (log.child('VoiceChannelSwitch').val()) {
                    eris.createMessage(log.child('logchannelid').val(), `[${moment().tz('America/Sao_Paulo').format('lll')}] :pencil: Log ` + "`voiceChannelSwitch`:" + "```\n" + `Usuario: ${member.username} <${member.id}>` + "\n```" + `\n${member.mention} trocou de canal de voz ${oldchannel.name} ~> ${newchannel.name}`);
                }
            });
    }
};