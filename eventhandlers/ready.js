let eris = require('../lib/client');
let request = require('request');

module.exports = {
    event: 'ready',
    enabled: true,
    handler: () => {
        console.log('Estou pronto!');

        var dbotsKey = "YOUR-TOKEN";

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