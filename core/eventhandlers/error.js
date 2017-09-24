'use strict';

let client = require('../client');
let eris = client.eris;
let request = require('request');
let gear = require('../utils/gearboxes');
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

module.exports = {
    event: 'error',
    enabled: true,
    handler: (err) => {
        if (!err) return;

        eris.createChannelWebhook(config.HookChannelID, { name: "Infinity Crash", avatar: "https://cdn.discordapp.com/avatars/313474367847923712/609348182f65bc414e617846b1258571.png?size=256" }).then(webhook => {
            eris.executeWebhook(webhook.id, webhook.token, {
                content: "",
                embeds: [{
                    title: "Infinity console",
                    description: `
                        **${err}**
                        ${err.stack}
                        `,
                    color: '990000'
                }],
                username: "Infinity Crash"
            });
            setTimeout(function() {
                eris.deleteWebhook(webhook.id);
            }, 1000);
        });
    }
};