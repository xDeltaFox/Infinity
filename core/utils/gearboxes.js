let fs = require("fs");
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

// DATABASE
const PersistentCollection = require('djs-collection-persistent');

const DB = new PersistentCollection({
    name: "DB"
});
const userDB = new PersistentCollection({
    name: 'userDB'
});

var updateEXP = function updateEXP(TG, DB, userDB) {
    try {
        var userData = this.userDB.get(TG.id).modules;
    } catch (e) {}
    try {
        var userData = userDB.get(TG.id).modules;
    } catch (e) { console.log("2:    " + e) }
    var caller = TG.username // Checar Caller

    //LEVEL UP CHECKER
    //-----------------------------------------------------

    this.userIncrement(TG, 'exp', Math.floor(Math.random() * 7));

    let curLevel = Math.floor(0.1 * Math.sqrt(userData.exp));
    let moneyadd = Math.floor(Math.random() * 200);
    if (curLevel > userData.level) {
        this.userIncrement(TG, 'level', 1);
        this.userIncrement(TG, 'money', moneyadd);
        // if (message.channel.guild.members.get(eris.user.id).permission.has('sendMessages') && serverdata.child('level').val()) {
        //     var Font = Canvas.Font;
        //     var image = new Canvas.Image;
        //     var image2 = new Canvas.Image;
        //     var canvas;

        //     pixelUtil.createBuffer("https://cdn.discordapp.com/attachments/309478380787597312/317453131174641666/level.png").then(buffer => {
        //         image.src = buffer;

        //         canvas = new Canvas(89, 110);
        //         var ctx = canvas.getContext('2d');
        //         ctx.drawImage(image, 0, 0);

        //         pixelUtil.createBuffer(message.author.avatarURL).then(buffer => {
        //             image2.src = buffer;

        //             ctx.drawImage(image2, 15, 10, 58, 58);

        //             ctx.font = '12px Arial';
        //             ctx.fillStyle = '#325415';
        //             ctx.fillText(`${message.author.username}`, (89 / 2) / 4, 85);

        //             ctx.font = '12px Arial';
        //             ctx.fillStyle = '#245876';
        //             ctx.fillText(`Level ${userdata.child('levels/xp').val()}`, (89 / 2) / 4, 100);

        //             message.channel.createMessage('**LEVEL UP!**', {
        //                 file: canvas.toBuffer(),
        //                 name: 'canvas.png'
        //             });
        //         });
        //     });
        // }
    }
}
var normaliseUSER = function normaliseUSER(User, userDB, DB) {
    try {
        var Umodules = userDB.get(User.id)
            //console.log(User.id)
        Umodules.ID = User.id
        Umodules.username = User.username
        Umodules.name = User.username
        Umodules.discriminator = User.discriminator
        Umodules.tag = User.tag
        Umodules.avatarURL = User.avatarURL

        if (Umodules.modules.goodies < 0) {
            Umodules.modules.goodies = 0
        }
        Umodules.modules.goodies = parseInt(Umodules.modules.goodies)
        userDB.set(User.id, Umodules)
    } catch (err) {
        //   console.log("not this")
    }
}
var normaliseGUILD = function normaliseGUILD(SERV, DB) {
    var GG = DB.get(SERV.id)
    GG.ID = SERV.id
    GG.iconURL = SERV.iconURL
    DB.set(SERV.id, GG)
}
var randomize = function randomize(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
var userAdd = function userAdd(target, param, val) {
    try {
        var Umodules = userDB.get(target.id)
        if (!Umodules.modules[param]) {
            Umodules.modules[param] = []
        }

        if (param.includes('.')) {
            param = param.split('.')
            Umodules.modules[param[0]][param[1]].push(val)
        } else {
            Umodules.modules[param].push(val)
        }
        userDB.set(target.id, Umodules)
    } catch (err) {
        console.log('ERROR JSON')
        console.log(err.stack)
    }
}
var guildAdd = function guildAdd(target, param, val) {
    try {
        var Smodules = DB.get(target.id)
        if (param.includes('.')) {
            param = param.split('.')
            if (!Smodules.modules[param[0]][param[1]]) {
                Smodules.modules[param[0]][param[1]] = []
            }
            Smodules.modules[param[0]][param[1]].push(val)
        } else {
            console.log("INCLUDES")
            Smodules.modules[param].push(val)
        }
        DB.set(target.id, Smodules)
    } catch (err) {
        console.log('ERROR JSON')
        console.log(err.stack)
    }
}
var channelAdd = function channelAdd(target, param, val) {
    try {
        var Tchannel = DB.get(target.guild.id)
        if (!Tchannel.channels[target.id].modules[param]) {
            Tchannel.channels[target.id].modules[param] = []
        }

        if (param.includes('.')) {
            param = param.split('.')
            Tchannel.channels[target.id].modules[param[0]][param[1]].push(val)
        } else {
            Tchannel.channels[target.id].modules[param].push(val)
        }
        DB.set(target.guild.id, Tchannel)
    } catch (err) {
        console.log('ERROR JSON')
        console.log(err.stack)
    }
}
var userRemove = function userRemove(target, param, val) {
    try {
        var Umodules = userDB.get(target.id)
        if (param.includes('.')) {
            param = param.split('.')
            Umodules.modules[param[0]][param[1]].removeire(val)
        } else {
            Umodules.modules[param].removeire(val)
        }
        userDB.set(target.id, Umodules)
    } catch (err) {
        console.log('ERROR JSON')
        console.log(err.stack)
    }
}
var guildRemove = function guildRemove(target, param, val) {
    try {
        var Smodules = DB.get(target.id)
        if (param.includes('.')) {
            param = param.split('.')
            Smodules.modules[param[0]][param[1]].removeire(val)
        } else {
            Smodules.modules[param].removeire(val)
        }
        DB.set(target.id, Smodules)
    } catch (err) {
        console.log('ERROR JSON')
        console.log(err.stack)
    }
}
var channelRemove = function channelRemove(target, param, val) {
    try {
        var Tchannel = DB.get(target.guild.id)
        if (param.includes('.')) {
            param = param.split('.')
            Tchannel.channels[target.id].modules[param[0]][param[1]].removeire(val)
        } else {
            Tchannel.channels[target.id].modules[param].removeire(val)
        }
        DB.set(target.guild.id, Tchannel)
    } catch (err) {
        console.log('ERROR JSON')
        console.log(err.stack)
    }
}
var userIncrement = function userIncrement(target, param, val) {
    try {
        var Umodules = userDB.get(target.id)
        if (!Umodules.modules[param]) {
            Umodules.modules[param] = 0
        }
        if (param.includes('.')) {
            param = param.split('.')
            Umodules.modules[param[0]][param[1]] += val
        } else {
            Umodules.modules[param] += val
        }
        userDB.set(target.id, Umodules)
    } catch (err) {
        console.log('ERROR JSON')
        console.log(err.stack)
    }
}
var guildIncrement = function guildIncrement(target, param, val) {
    try {
        var Smodules = DB.get(target.id)
        if (!Smodules.modules[param]) {
            Smodules.modules[param] = 0
        }
        if (param.includes('.')) {
            param = param.split('.')
            Smodules.modules[param[0]][param[1]] += val
        } else {
            Smodules.modules[param] += val
        }
        DB.set(target.id, Smodules)
    } catch (err) {
        console.log('ERROR JSON')
        console.log(err.stack)
    }
}
var channelIncrement = function channelIncrement(target, param, val) {
    try {
        var Tchannel = DB.get(target.guild.id)
        if (!Tchannel.channels[target.id].modules[param]) {
            Tchannel.channels[target.id].modules[param] = 0
        }

        if (param.includes('.')) {
            param = param.split('.')
            Tchannel.channels[target.id].modules[param[0]][param[1]] += val
        } else {
            Tchannel.channels[target.id].modules[param] += val
        }
        DB.set(target.guild.id, Tchannel)
    } catch (err) {
        console.log('ERROR JSON')
        console.log(err.stack)
    }
}
var userDefine = function userDefine(target, param, val) {
    try {
        var Umodules = userDB.get(target.id)
        if (param.includes('.')) {
            param = param.split('.')
            Umodules.modules[param[0]][param[1]] = val
        } else {
            Umodules.modules[param] = val
        }
        userDB.set(target.id, Umodules)
    } catch (err) {
        console.log('ERROR JSON')
        console.log(err.stack)
    }
}
var guildDefine = function guildDefine(target, param, val) {
    try {
        var Smodules = DB.get(target.id)
        if (param.includes('.')) {
            param = param.split('.')
            Smodules.modules[param[0]][param[1]] = val
        } else {
            Smodules.modules[param] = val
        }
        DB.set(target.id, Smodules)
    } catch (err) {
        console.log('ERROR JSON')
        console.log(err.stack)
    }
}
var channelDefine = function channelDefine(target, param, val) {
    try {
        var Tchannel = DB.get(target.guild.id)
        if (param.includes('.')) {
            param = param.split('.')
            Tchannel.channels[target.id].modules[param[0]][param[1]] = val
        } else {
            Tchannel.channels[target.id].modules[param] = val
        }
        DB.set(target.guild.id, Tchannel)
    } catch (err) {
        console.log('ERROR JSON')
        console.log(err.stack)
    }
}
var superuserDefine = function superuserDefine(target, param, val) {
    try {
        var Umodules = userDB.get(target.id)
        if (param.includes('.')) {
            param = param.split('.')
            Umodules[param[0]][param[1]] = val
        } else {
            Umodules[param] = val
        }
        userDB.set(target.id, Umodules)
    } catch (err) {
        console.log('ERROR JSON')
        console.log(err.stack)
    }
}
var superguildDefine = function superguildDefine(target, param, val) {
    try {
        var Smodules = DB.get(target.id)
        if (param.includes('.')) {
            param = param.split('.')
            Smodules[param[0]][param[1]] = val
        } else {
            Smodules[param] = val
        }
        DB.set(target.id, Smodules)
    } catch (err) {
        console.log('ERROR JSON')
        console.log(err.stack)
    }
}
var superchannelDefine = function superchannelDefine(target, param, val) {
    try {
        var Tchannel = DB.get(target.guild.id)
        if (param.includes('.')) {
            param = param.split('.')
            Tchannel.channels[target.id][param[0]][param[1]] = val
        } else {
            Tchannel.channels[target.id][param] = val
        }
        DB.set(target.guild.id, Tchannel)
    } catch (err) {
        console.log('ERROR JSON')
        console.log(err.stack)
    }
}

module.exports = {
    DB: DB,
    userDB: userDB,
    updateEXP: updateEXP,
    normaliseUSER: normaliseUSER,
    normaliseGUILD: normaliseGUILD,
    randomize: randomize,
    userAdd: userAdd,
    guildAdd: guildAdd,
    channelAdd: channelAdd,
    userRemove: userRemove,
    guildRemove: guildRemove,
    channelRemove: channelRemove,
    userIncrement: userIncrement,
    guildIncrement: guildIncrement,
    channelIncrement: channelIncrement,
    userDefine: userDefine,
    guildDefine: guildDefine,
    channelDefine: channelDefine,
    superuserDefine: superuserDefine,
    superguildDefine: superguildDefine,
    superchannelDefine: superchannelDefine
}