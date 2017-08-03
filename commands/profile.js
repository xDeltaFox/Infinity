let eris = require('../lib/client');
let firebase = require("firebase");
let fs = require('fs');
let arraySort = require('array-sort');
let Canvas = require('canvas');
let pixelUtil = require('pixel-util');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let Utils = require('../utils/Utils');

var utils = new Utils();
var db = firebase.database();
var ref = db.ref();

module.exports = {
    label: 'profile',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[`" + message.channel.guild.name + "`" + "~>" + "`" + message.channel.name + "`]" + "**" + message.author.username + "**:" + message.content);
            var start = Date.now();

            eris.createMessage(message.channel.id, 'Iniciando...').then(msg => {
                ref.once("value")
                    .then(function(snapshot) {
                        var userdata = snapshot.child('Bot/Usuario/' + message.author.id + '/');

                        msg.edit("Gerando perfil..." + "\n`Pegando informações`").catch()
                            // Informações

                        // var xp = userdata.child('levels/xp').val();
                        // for (var i = xp; i > 0; i++) {
                        //     let curLevel = Math.floor(0.1 * Math.sqrt(xp));
                        //     if (curLevel > (userdata.child('levels/level').val() ? userdata.child('levels/level').val() : 0)) {
                        //         return i;
                        //     }
                        // }
                        var rankItem = [];
                        var ranked = [];
                        var background;
                        var level;
                        var money;
                        var rank;

                        userdata.child('background').val() ? background = userdata.child('background').val() : background = "https://images.discordapp.net/attachments/309478380787597312/337730109236838401/level_background_for_a_mobile_game__by_bvigec-d5vi8b0.jpg?width=855&height=481";
                        userdata.child('levels/level').val() ? level = userdata.child('levels/level').val() : level = 0;
                        userdata.child('levels/money').val() ? money = userdata.child('levels/money').val() : money = 0;

                        eris.users.forEach(e => {
                            var xp = snapshot.child('Bot/Usuario/' + e.id).child('levels/xp');
                            var money = snapshot.child('Bot/Usuario/' + e.id).child('levels/money');
                            rankItem.exp = xp.val();
                            rankItem.money = money.val();
                            rankItem.name = e.username;
                            rankItem.id = e.id;

                            ranked.push(rankItem);
                            rankItem = [];
                        });

                        arraySort(ranked, 'exp', {
                            reverse: true
                        });

                        for (var i = 0; i < ranked.length; i++) {
                            if (ranked[i].id == message.author.id) {
                                rank = i + 1;
                            }
                        }

                        // Progress Bar

                        var largura = 0;
                        var autura = 7;

                        var exp = userdata.child('levels/xp').val();
                        var exptoNex = Math.pow(Number(Math.floor(0.1 * Math.sqrt(exp)) + "0") + 10, 2).toString();
                        var exptoThis = Math.pow(Number(Math.floor(0.1 * Math.sqrt(exp)) + "0"), 2).toString();
                        var frameofact = Math.pow(Number(Math.floor(0.1 * Math.sqrt(exp)) + "0") + 10, 2) - Math.pow(Number(Math.floor(0.1 * Math.sqrt(exp)) + "0"), 2);
                        var percent = (((Number(exp) - Number(exptoThis)) / frameofact) * 100).toFixed(0);

                        try {
                            largura = (316 / 100) * percent;
                        } catch (e) {
                            largura = 316;
                        }

                        // Perfil

                        msg.edit("Gerando perfil..." + "\n`Criando perfil`").catch()
                        if (message.channel.guild.channels.get(message.channel.id).permissionsOf(eris.user.id).has('attachFiles')) {
                            var image = new Canvas.Image;
                            var backgroundImage = new Canvas.Image;
                            var canvas = new Canvas(321, 241);
                            var ctx = canvas.getContext('2d');

                            msg.edit("Gerando perfil..." + "\n`Adicionando avatar`").catch()
                            pixelUtil.createBuffer(message.author.avatarURL).then(buffer => {
                                image.src = buffer;

                                ctx.drawImage(image, 114, 18, 83, 83);

                                ctx.save();

                                ctx.globalCompositeOperation = "destination-atop";

                                ctx.beginPath();
                                ctx.arc(155.5, 59.5, 43, 0, Math.PI * 2, true);
                                ctx.fillStyle = '#ffffff';
                                ctx.fill();
                                ctx.closePath();

                                ctx.restore();

                                msg.edit("Gerando perfil..." + "\n`Criando a barra de experiencia`").catch()
                                pixelUtil.createBuffer("https://cdn.discordapp.com/attachments/309478380787597312/340928426301063178/Progress_bar.png").then(buffer => {
                                    image.src = buffer;

                                    ctx.drawImage(image, 2, 231, largura, autura);

                                    msg.edit("Gerando perfil..." + "\n`Adicionando informações`").catch()
                                    pixelUtil.createBuffer("https://cdn.discordapp.com/attachments/309478380787597312/341021090497429504/Tampletes-profile.png").then(buffer => {
                                        image.src = buffer;

                                        ctx.drawImage(image, 0, 0, 321, 241);

                                        // Username
                                        ctx.font = '14px Arial';
                                        ctx.fillStyle = '#000000';
                                        ctx.fillText(`${message.author.username}`, 113, 143);

                                        // Level
                                        ctx.font = '14px Arial';
                                        ctx.fillStyle = '#000000';
                                        ctx.fillText(`${level}`, 43, 38);

                                        // Money
                                        ctx.font = '14px Arial';
                                        ctx.fillStyle = '#000000';
                                        ctx.fillText(`₹${money}`, 244, 38);

                                        // Rank
                                        ctx.font = '14px Arial';
                                        ctx.fillStyle = '#000000';
                                        ctx.fillText(`#${rank}`, 38, 78);

                                        // Exp
                                        ctx.font = '14px Arial';
                                        ctx.fillStyle = '#000000';
                                        ctx.fillText(`${percent}% [${exp}/${exptoNex}]`, 35, 230);

                                        msg.edit("Gerando perfil..." + "\n`Pegando background`").catch()
                                        pixelUtil.createBuffer(background).then(buffer => {
                                            backgroundImage.src = buffer;

                                            ctx.globalCompositeOperation = "destination-over";

                                            ctx.drawImage(backgroundImage, 0, 0, 321, 241);

                                            msg.edit("Gerando perfil..." + "\n`Enviando buffer`").catch()
                                            message.channel.createMessage(`${message.author.mention} - Perfil`, {
                                                file: canvas.toBuffer(),
                                                name: 'canvas.png'
                                            }).then(picsent => {
                                                var stop = Date.now();
                                                var diff = (stop - start);
                                                msg.edit("ACABEI!\nPerfil gerado em `" + diff / 1000 + "s`").catch()
                                            })
                                        });
                                    });
                                });
                            });
                        } else {
                            msg.edit("AI! isso machuca, não ter permissão. Pq faz isso comigo? Me dá permissão de `attachFiles`");
                        }
                    });
            });
        } catch (err) {
            eris.createMessage(config.logChannel, `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:${this.label}\n\t>> ${err.response}\n\t${err.stack}`);
        }
    },
    options: {
        description: 'Descrição',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['pf']
    }
};