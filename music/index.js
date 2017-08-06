'use strict';
// Prepare global utils
require('./utils/utils.js');
// Prepare localStorage
global.localStorage = new(require('./localStorage.js'))('./localStorage.json');

const client = require('../lib/client');
const music = require('./music/manager.js');
module.exports = { client: client, manager: music };

client.on('error', (err) => console.error(err));

client.on('guildDelete', (guild) => music.destroy(guild.id));