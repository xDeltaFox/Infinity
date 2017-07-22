let eris = require('../lib/client');
let moment = require("moment");
let tz = require("moment-timezone");
let firebase = require("firebase");

var db = firebase.database();
var ref = db.ref();

module.exports = {
    event: 'guildRoleDelete',
    enabled: true,
    handler: (guild, role) => {

        ref.once("value")
            .then(function(snapshot) {
                var log = snapshot.child('Bot/Servidor/' + guild.id + '/log/');

                if (log.child('GuildRoleDelete').val()) {
                    eris.createMessage(log.child('logchannelid').val(), `[${moment().tz('America/Sao_Paulo').format('lll')}] :pencil: Log ` + "`RoleDelete`:" + `\n${role.name} foi deletado!`);
                }
            });
    }
};