console.log('[Infinity-bot] Carregando...');

let fs = require("fs");
let client = require('./core/Client.js');
client.eris.connect();

fs.readdir('./core/eventhandlers', (err, files) => {
    if (err) {
        console.log('[Infinity-bot] Eventos não podem ser carregados...', { attach: err });
        process.exit(1);
    } else {
        files.forEach((file) => {
            try {
                let f = require('./core/eventhandlers/' + file);
                if (f.enabled) {
                    client.eris[f.once ? 'once' : 'on'](f.event, (...args) => f.handler(client.eris, client.serverDB, client.channelDB, client.userDB, ...args));
                    console.log('[Infinity-bot] Evento ' + f.event + ' foi carregado com sucesso.');
                }
            } catch (e) {
                console.log('[Infinity-bot] Erro no carregamento do evento ' + file, { attach: e })
            }
        });
    }
});