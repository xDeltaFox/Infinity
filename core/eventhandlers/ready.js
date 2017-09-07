let client = require('../client');
let eris = client.eris;
let request = require('request');
let gear = require('../utils/gearboxes');
let config = JSON.parse(fs.readFileSync('../../config.json', 'utf8'));

module.exports = {
    event: 'ready',
    enabled: true,
    handler: () => {
        console.log('Estou pronto!');

        eris.createChannelWebhook(350469006433714186, { name: "Infinity", avatar: "https://cdn.discordapp.com/avatars/313474367847923712/609348182f65bc414e617846b1258571.webp?size=256" }).then(webhook => {
            eris.executeWebhook(webhook.id, webhook.token, {
                content: "",
                embeds: {
                    embed: {
                        title: 'Informações de login...',
                        description: `Logado com sucesso!`,
                        color: '#FFD700'
                    }
                },
                username: "Infinity"
            });
            setTimeout(function() {
                eris.deleteWebhook(webhook.id);
            }, 5000);
        });

        var dbotsKey = config.discordbots.token;
        request.post({
                url: `https://discordbots.org/api/bots/313474367847923712/stats`,
                method: 'POST',
                headers: { Authorization: dbotsKey, 'Content-Type': 'application/json' },
                body: JSON.stringify({ server_count: eris.guilds.size })
            },
            function(error, response, body) {
                if (error) {
                    return console.error('upload failed:', error);
                }
                console.log('Upload successful!  Server responded with:', body);
            });
    }
};