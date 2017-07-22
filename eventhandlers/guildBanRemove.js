let eris = require('../lib/client');
let moment = require("moment");
let tz = require("moment-timezone");
let firebase = require("firebase");

var db = firebase.database();
var ref = db.ref();

module.exports = {
    event: 'guildBanRemove',
    enabled: true,
    handler: (guild, user) => {

        ref.once("value")
            .then(function(snapshot) {
                var log = snapshot.child('Bot/Servidor/' + guild.id + '/log/');

                if (log.child('GuildBanRemove').val()) {
                    eris.createMessage(log.child('logchannelid').val(), `[${moment().tz('America/Sao_Paulo').format('lll')}] :pencil: Log ` + "`DESBANIMENTO`:" + "```\n" + `ID: ${user.id}` + "\n```" + `\n${user.mention} ${user.username}#${user.discriminator} foi desbanido!`);
                }
            });
    }
};