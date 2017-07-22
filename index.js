let fs = require('fs');
let path = require('path');

let eris = require('./lib/client');

fs.readdir('./commands', (err, files)=> {
    if (err) {
        console.log('Commands could not be loaded.', {attach: err});
        process.exit(1);
    } else {
        files.forEach((file)=> {
            try {
                let c = require('./commands/' + file);
                if (c.enabled && !c.isSubcommand) {
                    let cmd = eris.registerCommand(c.label, c.generator, c.options);
                    registerSubcommands(c, cmd);

                    function registerSubcommands(cmd, parent) {
                        cmd.subcommands = cmd.subcommands || [];
                        cmd.subcommands.forEach((subcmd)=> {
                            if (subcmd.enabled) {
                                let c = parent.registerSubcommand(subcmd.label, subcmd.generator, subcmd.options);
                                registerSubcommands(subcmd, c);
                            }
                        });
                    }
                }
            } catch (e) {
                console.log('Error while loading command ' + file, {attach: e})
            }
        });
        eris.connect();
    }
});

fs.readdir('./eventhandlers', (err, files)=> {
    if (err) {
        console.log('Eventhandlers could not be loaded.', {attach: err});
        process.exit(1);
    } else {
        files.forEach((file)=> {
            try {
                let f = require('./eventhandlers/' + file);
                if (f.enabled) {
                    eris[f.once ? 'once' : 'on'](f.event, f.handler);
                    console.log('Loaded handler for ' + f.event);
                }
            } catch (e) {
                console.log('Error while loading eventhandler ' + file, {attach: e})
            }
        });
    }
});