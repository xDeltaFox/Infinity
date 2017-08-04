let eris = require('../lib/client');
let moment = require("moment");
let tz = require("moment-timezone");
let firebase = require("firebase");

var db = firebase.database();
var ref = db.ref();

module.exports = {
    event: 'guildCreate',
    enabled: true,
    handler: (guild) => {

        ref.once("value")
            .then(function(snapshot) {
                var log = snapshot.child('Bot/Servidor/' + guild.id + '/log/');

                eris.createMessage('309478380787597312', {
                    embed: {
                        color: Math.floor(Math.random() * 16777216),
                        title: ":tada: Novo Servidor",
                        description: `Nome: ${guild.name}\n Dono: ${eris.users.get(guild.ownerID).username}#${eris.users.get(guild.ownerID).discriminator}\nMembros: ${guild.memberCount}`
                    }
                });
            });
    }
};