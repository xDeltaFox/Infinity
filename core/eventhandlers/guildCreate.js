'use strict';

let moment = require("moment");
let tz = require("moment-timezone");
let request = require('request');

module.exports = {
    event: 'guildCreate',
    enabled: true,
    handler: async(eris, serverDB, channelDB, userDB, gear, guild) => {
        let chanData = await new Promise(async resolve => {
            channelDB.findOne({ id: guild.id }).then(channel => {
                if (!channel) return resolve(channelDB.new(guild));
                return resolve(channel);
            });
        });

        eris.executeWebhook("367463605131673610", "M9E3UlUU6BO5XwteL2ylOUhlGhTvadxN69rf-hEPSP-cEtkguwpuuGwYA7_i6AUxSB4U", {
            embeds: [{
                color: Math.floor(Math.random() * 16777216),
                title: ":tada: Novo Servidor",
                description: `Nome: ${guild.name}\n Dono: ${eris.users.get(guild.ownerID).username}#${eris.users.get(guild.ownerID).discriminator}\nMembros: ${guild.memberCount}`
            }]
        });
    }
};