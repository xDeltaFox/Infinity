let Eris = require("eris-additions")(require("eris"));
global.gear = require('./gearboxes.js');
global.fs = require('fs');
global.chalk = require("chalk");
global.async = require("async");
global.config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

let eris = new Eris(config.token, {
    messageLimit: 250,
    largeThreshold: 500,
    autoReconnect: true,
    disableEveryone: true,
    getAllUsers: true,
    sequencerWait: 100,
    moreMentions: true,
    maxShards: config.shardCount,
    cleanContent: true,
    defaultImageFormat: 'png'
});

//Database load!
const serverDB = gear.serverDB;
const channelDB = gear.channelDB;
const userDB = gear.userDB;
console.log('[Infinity-bot] Database carregada.');

global.format = function(seconds) {
    function pad(s) {
        return (s < 10 ? '0' : '') + s;
    }
    var hours = Math.floor(seconds / (60 * 60));
    var minutes = Math.floor(seconds % (60 * 60) / 60);
    var seconds = Math.floor(seconds % 60);

    if (hours > 0) {
        return pad(hours) + ' horas(s), ' + pad(minutes) + 'minuto(s), ' + pad(seconds) + 'segundo(s)';
    } else {
        return pad(minutes) + ' minuto(s), ' + pad(seconds) + ' segundo(s)';
    }
}

global.bytesToSize = function(bytes) {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

Object.defineProperty(Eris.User.prototype, "tag", {
    get: function() {
        return `${this.username}#${this.discriminator}`;
    }
});

//===================Process handler===================//
process.on('unhandledRejection', function(err, p) {

    console.log(chalk.green("//===================Error===================//"));
    console.log(chalk.red('Unhandled Rejection at: Promise \n', p, "\n\nReason:", err.stack));
    //GB.sendReport("Promise report", "Rejection: " + reason.stack, 0xE81123)
    console.log(chalk.green("//===================Error===================//"));

    eris.executeWebhook("409744781669826571", "UWIctBJEuJdLimGuHrwKsYeL1WHW4m5vC6DF_-jyV673U5ly7pNbMejaC4of9VabmQ6n", {
        content: "",
        embeds: [{
            title: "Promise Report",
            description: `
                **${err}**
                Rejection: ${err.stack}
                `,
            color: 0xE81123
        }]
    });
});

process.on('uncaughtException', function(err) {

    console.log(chalk.green("//===================Error===================//"));
    console.log(chalk.red('EXCEPTION: \n' + err));
    //GB.sendReport("Exception report", "Rejection: " + err.stack, 0xE81123);
    console.log(chalk.red(err.stack));
    console.log(chalk.green("//===================Error===================//"));

    eris.executeWebhook("409744781669826571", "UWIctBJEuJdLimGuHrwKsYeL1WHW4m5vC6DF_-jyV673U5ly7pNbMejaC4of9VabmQ6n", {
        content: "",
        embeds: [{
            title: "Exception",
            description: `
                **${err}**
                ${err.stack}
                `,
            color: 0xE81123
        }]
    });
});

module.exports = {
    eris,
    serverDB,
    channelDB,
    userDB,
    gear
}