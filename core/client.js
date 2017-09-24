'use strict';

let Eris = require("eris-additions")(require("eris"));
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let cheerio = require('cheerio');
let request = require("request");
let moment = require('moment');
let gear = require('./utils/gearboxes');

console.log('          --- - - - - = = = = = = Iniciando Infinity...');

//-------------Variaveis "Globais"-------------

var commandsCount = 0;

let eris = new Eris.CommandClient(config.token, {
    messageLimit: 250,
    largeThreshold: 500,
    autoReconnect: true,
    disableEveryone: true,
    getAllUsers: true,
    sequencerWait: 100,
    moreMentions: true,
    maxShards: config.shardCount,
    gatewayVersion: 6,
    cleanContent: true,
    defaultImageFormat: 'png'
}, {
    defaultHelpCommand: false,
    description: 'To infinity and beyond',
    owner: '**xDeltaFox#8871**',
    name: '**Infinity**',
    ignoreBots: true,
    prefix: ['>']
});

eris.Embed = require('eris-embed-builder');

eris.users.first = function first() {
    return this.values().next().value;
}

function format(seconds) {
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

//Database load!
console.log('          --- - - - - = = = = = = Carregando a database...');
const DB = gear.DB
const userDB = gear.userDB
var defaults = require("./utils/defaults"); // Database Defaults
console.log('          --- - - - - = = = = = = Database carregada.');

//DASHBOARD INIT
console.log('          --- - - - - = = = = = = Carregando o Dash...');
const dash = require("../dash/host"); // Website
dash.init(eris, DB, userDB)
console.log('          --- - - - - = = = = = = Dash carregado...');

function setupInfinity() {
    console.log('          --- - - - - = = = = = = Verificando Infinity...');
    if (!DB.get("infinity") || DB.get("infinity") == undefined) {
        DB.set("infinity", defaults.global);
    }

    if (!userDB.get(eris.user.id) || userDB.get(eris.user.id) == undefined) {
        userDB.set(eris.user.id, defaults.infinty);
    }
}

var serverSetup = function serverSetup(guild) {
    if (!DB.get(guild.id) || DB.get(guild.id) == undefined) {
        console.log('          --- - - - - = = = = = = Verificando Guild: ' + guild.name);
        DB.set(guild.id, defaults.guild)
        var gg = DB.get(guild.id)
        gg.name = guild.name
        gg.ID = guild.id
        DB.set(guild.id, gg)
        guild.channels.forEach(element => {
            if (element.type != 'voice') {
                console.log('          --- - - - - = = = = = = Verificando Channel: ' + element.name)
                var GGD = DB.get(guild.id)
                GGD.channels[element.id] = defaults.channel
                DB.set(guild.id, GGD)
                var gg = DB.get(guild.id)
                gg.channels[element.id].name = element.name
                DB.set(guild.id, gg)
            }
        });
    } else {
        gear.normaliseGUILD(guild, DB)
    }
}

function channelSetup(element, guild) {
    console.log('          --- - - - - = = = = = = Verificando Channel: ' + element.name + " do servidor " + guild.name)
        //  DB.get(guild.id).channels[element.id] =
        //element.mods = DB.get(guild.id).channels[element.id].modules;
    var GGD = DB.get(guild.id)
    GGD.channels[element.id] = defaults.channel
    DB.set(guild.id, GGD)
    var gg = DB.get(guild.id)
    gg.channels[element.id].name = element.name
    gg.channels[element.id].ID = element.id
    DB.set(guild.id, gg)
} //DB

function userSetup(user) {
    if (!userDB.get(user.id) || userDB.get(user.id) == undefined) {
        console.log('          --- - - - - = = = = = = Verificando Membro: ' + user.username)
        userDB.set(user.id, defaults.user)
        var uu = userDB.get(user.id)
        uu.name = user.username
        uu.ID = user.id
        userDB.set(user.id, uu)
    } else {
        gear.normaliseUSER(user, userDB, DB)
    }
} //DB

console.log('          --- - - - - = = = = = = Iniciando Update(all time).')
setInterval(function() {
    var date = new Date();
    if (date.getHours() === 3) {
        console.log('          --- - - - - = = = = = = Iniciando Update(all time).');
        let epc = date.getTime();
        gear.superuserDefine(eris.user, "epochStamp", date);
        if (!userDB.get(eris.user.id).dailyEpoch || userDB.get(eris.user.id).dailyEpoch == undefined) {
            gear.superuserDefine(eris.user, "dailyEpoch", epc);
        }
        var botEntry = userDB.get(eris.user.id);
        try {
            botEntry.dailyEpoch = epc
        } catch (e) {
            botEntry.dailyEpoch = epc
        }
        if (isNaN(botEntry.dailyEpoch)) {
            botEntry.dailyEpoch = epc
        }
        userDB.set(eris.user.id, botEntry);
    }
}, 1000);

setInterval(function() {
    DB.get("infinity").totalServers = eris.guilds.size;
    DB.get("infinity").totalUsers = eris.users.size;
}, 15000);

//------------------STATUS------------------

var i = 0;

setInterval(() => { // Update the bot's status for each shard every 10 minutes
    let listgames = JSON.parse(fs.readFileSync('./core/listgames.json', 'utf8'));
    var status = [
        `${listgames.games[Math.floor(Math.random() * listgames.games.length)]} em ${eris.guilds.size} servidores || >ajuda`,
        `${listgames.games[Math.floor(Math.random() * listgames.games.length)]} para ${eris.users.size} usuarios || >ajuda`,
        `Entre no meu servidor! https://discord.gg/thKZC2d`,
        `${listgames.games[Math.floor(Math.random() * listgames.games.length)]} á ${format(process.uptime())}`
    ];
    if (listgames.length !== 0 && eris.uptime !== 0) {
        i++;
        if (i > status.length - 1) {
            i = 0;
        }
        eris.editStatus("online", { name: status[i], type: 1, url: 'https://www.twitch.tv/xdeltafox1' });
    }
}, 30000);

module.exports = {
    Discord: Eris,
    eris: eris,
    DB: DB,
    userDB: userDB,
    serverSetup: serverSetup,
    userSetup: userSetup,
    channelSetup: channelSetup,
    setupInfinity: setupInfinity,
    commandsCount: commandsCount
};