'use strict';

let client = require('../Client.js');
let eris = client.eris;
let request = require('request');

module.exports = {
    event: 'error',
    enabled: true,
    handler: async(eris, serverDB, channelDB, userDB, gear, err) => {
        if (!err) return;

        eris.executeWebhook("409744781669826571", "UWIctBJEuJdLimGuHrwKsYeL1WHW4m5vC6DF_-jyV673U5ly7pNbMejaC4of9VabmQ6n", {
            content: "",
            embeds: [{
                title: "Infinity console",
                description: `
                    **${err}**
                    ${err.stack}
                    `,
                color: '990000'
            }]
        });
    }
};