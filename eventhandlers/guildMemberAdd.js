let eris = require('../lib/client');
let moment = require("moment");
let tz = require("moment-timezone");
let firebase = require("firebase");

var db = firebase.database();
var ref = db.ref();

module.exports = {
    event: 'guildMemberAdd',
    enabled: true,
    handler: (guild, member) => {

        ref.once("value")
            .then(function(snapshot) {
                //log joinMember
                var log = snapshot.child('Bot/Servidor/' + guild.id + '/log/');

                if (log.child('GuildMemberAdd').val()) {
                    eris.createMessage(log.child('logchannelid').val(), `[${moment().tz('America/Sao_Paulo').format('lll')}] :pencil: Log ` + "`JoinMember`:" + "```\n" + `ID: ${member.id}` + "\n```" + `\n${member.mention} ${member.username}#${member.discriminator} entrou!`);
                }

                //Welcome
                function reWelcome(srt) {
                    return srt.replace('%MENTION%', member.mention).replace('%SERVER%', guild.name).replace('%USERNAME%', member.username);
                }

                var server = snapshot.child('Bot/Servidor/' + guild.id + '/');

                if (server.child('welcome').val()) {
                    var msgwelcome = reWelcome(server.child('msgwelcome').val());
                    eris.createMessage(server.child('welcomechannelid').val(), msgwelcome);
                }

                if (server.child('ativarautorole').val()) {
                    guild.addMemberRole(member.id, server.child('autorole').val());
                }
            });
    }
};