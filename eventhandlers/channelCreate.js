let eris = require('../lib/client');
let moment = require("moment");
let tz = require("moment-timezone");
let firebase = require("firebase");

var db = firebase.database();
var ref = db.ref();

module.exports = {
    event: 'channelCreate',
    enabled: true,
    handler: (channel) => {

        if (channel.guild != undefined) {
            ref.once("value")
                .then(function(snapshot) {
                    var log = snapshot.child('Bot/Servidor/' + channel.guild.id + '/log/');

                    if (log.child('ChannelCreate').val()) {
                        eris.createMessage(log.child('logchannelid').val(), `[${moment().tz('America/Sao_Paulo').format('lll')}] :pencil: Log ` + "`ChannelCreate`:" + `\n**#${channel.name}** foi criado`);
                    }
                });
        }
    }
};