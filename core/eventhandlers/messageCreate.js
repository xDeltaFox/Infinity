let client = require('../client');
let eris = client.eris;
let moment = require("moment");
let tz = require("moment-timezone");
//let Canvas = require('canvas-prebuilt');
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let pixelUtil = require('pixel-util');
let gear = require('../utils/gearboxes');

eris.users.first = function first() {
    return this.values().next().value;
}

module.exports = {
    event: 'messageCreate',
    enabled: true,
    handler: (message) => {
        try {

            //Set Them Up
            var Server = message.channel.guild;
            var Channel = message.channel;
            var Author = message.author;
            if (Author.bot) return;
            //var Target = message.mentions.users.first() || Author;
            var MSG = message.content;

            var DB = client.DB;
            var userDB = client.userDB;
            var userData = userDB.get(Author.id);

            //SETUPS
            //-------------------------------------------------------------
            client.serverSetup(Server);
            client.userSetup(Author);
            //client.userSetup(Target);

            //A NEW CHANNEL? --------------------------------------------
            if (DB.get(Server.id).channels[Channel.id] == undefined) {
                client.channelSetup(Channel, Server);
            }
            let defaultgreet = {
                hi: false,
                joinText: "Bem-vindo ao %server%, %username%!",
                greetChan: ""
            }

            if (!DB.get(Server.id).modules.GREET || DB.get(Server.id).modules.GREET === undefined) {
                gear.guildDefine(Server, "GREET", defaultgreet)
            }

            let defaultgreetB = {
                hi: false,
                joinText: "%username% saiu do %server%!",
                greetChan: ""
            }
            if (!DB.get(Server.id).modules.FWELL || DB.get(Server.id).modules.FWELL === undefined) {
                gear.guildDefine(Server, "FWELL", defaultgreetB)
            }

            //TRY level shit
            //------------------------------------------------------------
            try {
                if (DB.get(Server.id).modules && !DB.get(Server.id).modules.disabled.includes("level")) {
                    gear.updateEXP(Author, DB, userDB)
                } else if (DB.get(Server.id).modules && !DB.get(Server.id).channels[Channel.id].modules.DISABLED.includes("level")) {
                    gear.updateEXP(Author, DB, userDB)
                }
            } catch (err) {
                client.serverSetup(Server) // maybe no server
            }

            //USER CHECK
            //-------------------------------------------------------------
            // if (!userData.persotext || userData.persotext == undefined) {
            //     userData.persotext = "Não tem nada para ver aqui";
            // }
            //gear.userDefine(Author, 'daily', 1500271200000);

            //INVITE CHECK
            //-------------------------------------------------------------
            let inviteRegex = /discord(?:(?:.{0,7})(?:gg|me)(?:\/)(?:\w{5}|\w{7})(?:\s|\n)|\.me(?:\/\w*)|app\.com\/invite)/i;
            let inviteRegex2 = /(?:discord(?:(?:\.|.?dot.?)(?:me|gg)|app(?:\.|.?dot.?)com\/invite)\/([\w]{10,16}|[abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789]{4,8}))/g;
            let inviteRegex3 = /(?:^|\s)discord(?:app\.com\/invite|\.gg)\/(?:[0-9a-z\-]+)(?:$|\s)/i;

            if (DB.get(Server.id).modules.invite) {
                if (message.channel.guild.members.get(eris.user.id).permission.has('manageMessages')) {
                    if ((inviteRegex.test(message.content) || inviteRegex2.test(message.content))) {
                        eris.deleteMessage(message.channel.id, message.id);
                        eris.createMessage(message.channel.id, `${message.author.mention} parou com esses convites, antes que eu taque fogo em você. :fire:`);
                    }
                }
            }
        } catch (err) {
            eris.createMessage(config.logChannel, `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}\n\t>> ${err.response}\n\t${err.stack}`);
        }
    }
};