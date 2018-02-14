'use strict';

let client = require('../Client.js');
let eris = client.eris;
let request = require('request');
let moment = require("moment");
let tz = require("moment-timezone");

module.exports = {
    event: 'guildMemberAdd',
    enabled: true,
    handler: async(eris, serverDB, channelDB, userDB, gear, guild, member) => {
        let userData = await new Promise(async resolve => {
            userDB.findOne({ id: member.id }).then(channel => {
                if (!channel) return resolve(channelDB.new(member));
                return resolve(channel);
            });
        });
    }
};