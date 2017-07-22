let eris = require('../lib/client');
let moment = require("moment");
let tz = require("moment-timezone");
let firebase = require("firebase");

var db = firebase.database();
var ref = db.ref();

module.exports = {
    event: 'channelDelete',
    enabled: true,
    handler: (channel) => {

        ref.once("value")
            .then(function(snapshot) {
                var log = snapshot.child('Bot/Servidor/' + channel.guild.id + '/log/');

                if (log.child('ChannelDelete').val()) {
                    eris.createMessage(log.child('logchannelid').val(), `[${moment().tz('America/Sao_Paulo').format('lll')}] :pencil: Log ` + "`ChannelDelete`:" + `\n**#${channel.name}** foi deletado`);
                }
            });
    }
};