let eris = require('../lib/client');
let moment = require("moment");
let tz = require("moment-timezone");
let firebase = require("firebase");
//let Canvas = require('canvas-prebuilt');
let pixelUtil = require('pixel-util');

var db = firebase.database();
var ref = db.ref();

module.exports = {
    event: 'messageCreate',
    enabled: true,
    handler: (message) => {
        try {
            var setserverdata = ref.child('Bot/Servidor/' + message.channel.guild.id + '/');
            var setuserdata = ref.child('Bot/Usuario/' + message.author.id + '/');
            ref.once("value")
                .then(function(snapshot) {

                    let inviteRegex = /discord(?:(?:.{0,7})(?:gg|me)(?:\/)(?:\w{5}|\w{7})(?:\s|\n)|\.me(?:\/\w*)|app\.com\/invite)/i;
                    let inviteRegex2 = /(?:discord(?:(?:\.|.?dot.?)(?:me|gg)|app(?:\.|.?dot.?)com\/invite)\/([\w]{10,16}|[abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789]{4,8}))/g;
                    let inviteRegex3 = /(?:^|\s)discord(?:app\.com\/invite|\.gg)\/(?:[0-9a-z\-]+)(?:$|\s)/i;

                    var userdata = snapshot.child('Bot/Usuario/' + message.author.id + '/');
                    var serverdata = snapshot.child('Bot/Servidor/' + message.channel.guild.id + '/');

                    if (!userdata.child('personaltxt').val()) {
                        setuserdata.child('personaltxt').set("Não tem nada para ver aqui");
                    }

                    if (serverdata.child('level').val() == undefined) {
                        setserverdata.child('level').set(false);
                    }

                    setuserdata.child('levels/xp').set(userdata.child('levels/xp').val() + (userdata.child('levels/morexp').val() ? userdata.child('levels/morexp').val() : 4));

                    let curLevel = Math.floor(0.1 * Math.sqrt(userdata.child('levels/xp').val()));
                    let moneyadd = Math.floor(Math.random() * 200);
                    if (curLevel > (userdata.child('levels/level').val() ? userdata.child('levels/level').val() : 0)) {
                        setuserdata.child('levels/level').set(curLevel);
                        setuserdata.child('levels/money').set((userdata.child('levels/money').val() ? userdata.child('levels/money').val() : 500) + moneyadd);
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

                    if (serverdata.child('invite').val()) {
                        if (message.channel.guild.members.get(eris.user.id).permission.has('manageMessages')) {
                            if ((inviteRegex.test(message.content) || inviteRegex2.test(message.content))) {
                                eris.deleteMessage(message.channel.id, message.id);
                                eris.createMessage(message.channel.id, `${message.author.mention} parou com esses convites, antes que eu taque fogo em você. :fire:`);
                            }
                        }
                    }

                });
        } catch (err) {

        }
    }
};