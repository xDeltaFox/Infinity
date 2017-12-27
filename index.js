var fs = require('fs');
var path = require('path');

console.log('Carregando eris.');
var client = require('./core/infinity');
var eris = client.eris;

//======================================//
//      CAREGANDO COMANDOS
//======================================//

var files = fs.readdirSync('./core/commands');
for (var i = 0; i < files.length; i++) {
    var filedir = './core/commands/' + files[i]
    fs.readdir(filedir, (err, files) => {
        if (err) {
            console.log('Comandos não podem ser carregados...', { attach: err });
        } else {
            files.forEach((file) => {
                try {
                    var c = require(filedir + '/' + file);
                    if (c.enabled && !c.isSubcommand) {
                        var cmd = eris.registerCommand(c.label, c.generator, c.options);
                        registerSubcommands(c, cmd);
                        console.log('Comando ' + c.label + ' foi carregado com sucesso.');
                        client.commandsCount++;

                        function registerSubcommands(cmd, parent) {
                            cmd.subcommands = cmd.subcommands || [];
                            cmd.subcommands.forEach((subcmd) => {
                                if (subcmd.enabled) {
                                    var c = parent.registerSubcommand(subcmd.label, subcmd.generator, subcmd.options);
                                    registerSubcommands(subcmd, c);
                                }
                            });
                        }
                    }
                } catch (e) {
                    console.log('Erro no carregamento do comando ' + file, { attach: e })
                }
            });
            eris.connect();
        }
    });
}

//======================================//
//      CARREGANDO EVENTOS
//======================================//

fs.readdir('./core/eventhandlers', (err, files) => {
    if (err) {
        console.log('Eventos não podem ser carregados...', { attach: err });
        process.exit(1);
    } else {
        files.forEach((file) => {
            try {
                var f = require('./core/eventhandlers/' + file);
                if (f.enabled) {
                    eris[f.once ? 'once' : 'on'](f.event, f.handler);
                    console.log('Evento ' + f.event + ' foi carregado com sucesso.');
                }
            } catch (e) {
                console.log('Erro no carregamento do evento ' + file, { attach: e })
            }
        });
    }
});