'use strict';

let request = require('request');

module.exports = {
    event: 'ready',
    enabled: true,
    handler: async(eris, serverDB, channelDB, userDB, gear) => {
        var listgames = JSON.parse(fs.readFileSync('./core/listgames.json', 'utf8'));

        console.log('[Infinity-bot] Estou pronto!');

        // console.log('[Infinity-bot] Verificando Infinity...');
        // if (!DB.get("infinity") || DB.get("infinity") == undefined) {
        //     DB.set("infinity", require("../defaults").global);
        // }

        // if (!userDB.get(eris.user.id) || userDB.get(eris.user.id) == undefined) {
        //     userDB.set(eris.user.id, require("../defaults").infinty);
        // }

        // https://canary.discordapp.com/api/webhooks/409744781669826571/UWIctBJEuJdLimGuHrwKsYeL1WHW4m5vC6DF_-jyV673U5ly7pNbMejaC4of9VabmQ6n
        eris.executeWebhook("409744781669826571", "UWIctBJEuJdLimGuHrwKsYeL1WHW4m5vC6DF_-jyV673U5ly7pNbMejaC4of9VabmQ6n", {
            content: "",
            embeds: [{
                title: 'Informações de login...',
                description: '```js\nLogado com sucesso!\n```',
                color: '152689'
            }]
        });

        if (listgames.length !== 0 && eris.uptime !== 0) {
            eris.editStatus("online", { name: `${listgames.games[Math.floor(Math.random() * listgames.games.length)]} em ${eris.guilds.size} servidores`, type: 1, url: 'https://www.twitch.tv/xdeltafox1' });
            console.log('[Infinity-bot] Atualizando status.');
        }
        setInterval(() => {
            if (listgames.length !== 0 && eris.uptime !== 0) {
                eris.editStatus("online", { name: `${listgames.games[Math.floor(Math.random() * listgames.games.length)]} em ${eris.guilds.size} servidores`, type: 1, url: 'https://www.twitch.tv/xdeltafox1' });
                console.log('[Infinity-bot] Atualizando status.');
            }
        }, 60000 * 30);
    }
};