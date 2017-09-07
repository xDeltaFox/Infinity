let client = require('../client');
let eris = client.eris;
let moment = require("moment");
let tz = require("moment-timezone");

module.exports = {
    event: 'guildCreate',
    enabled: true,
    handler: (guild) => {
        client.serverSetup(guild);

        eris.createMessage('309478380787597312', {
            embed: {
                color: Math.floor(Math.random() * 16777216),
                title: ":tada: Novo Servidor",
                description: `Nome: ${guild.name}\n Dono: ${eris.users.get(guild.ownerID).username}#${eris.users.get(guild.ownerID).discriminator}\nMembros: ${guild.memberCount}`
            }
        });
    }
};