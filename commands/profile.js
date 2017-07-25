let eris = require('../lib/client');
let firebase = require("firebase");
let fs = require('fs');
let Canvas = require('canvas');
let pixelUtil = require('pixel-util');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

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
                        msg.edit("Gerando perfil..." + "\n`Criando perfil`").catch()
                        if (message.member.permission.has('embedLinks')) {
                            var Font = Canvas.Font;
                            var image = new Canvas.Image;
                            var image2 = new Canvas.Image;
                            var canvas;

                            msg.edit("Gerando perfil..." + "\n`Pegando background`").catch()

                            pixelUtil.createBuffer("https://images.discordapp.net/attachments/309478380787597312/337730109236838401/level_background_for_a_mobile_game__by_bvigec-d5vi8b0.jpg?width=855&height=481").then(buffer => {
                                image.src = buffer;

                                canvas = new Canvas(321, 241);
                                var ctx = canvas.getContext('2d');

                                ctx.drawImage(image, 0, 0, 321, 241);

                                msg.edit("Gerando perfil..." + "\n`Montando perfil`").catch()

                                pixelUtil.createBuffer("https://images.discordapp.net/attachments/309478380787597312/337728114106957824/Tampletes-profile2.png?width=241&height=181").then(buffer => {
                                    image2.src = buffer;

                                    ctx.drawImage(image2, 0, 0, 321, 241);

                                    msg.edit("Gerando perfil..." + "\n`Adicionando avatar`").catch()

                                    pixelUtil.createBuffer(message.author.avatarURL).then(buffer => {
                                        image2.src = buffer;

                                        ctx.save();

                                        ctx.drawImage(image2, 114, 18, 83, 83);

                                        ctx.globalCompositeOperation = "destination-in";

                                        ctx.beginPath();
                                        ctx.arc(155.5, 59.5, 43, 0, Math.PI * 2, true);
                                        ctx.fill();
                                        ctx.closePath();

                                        ctx.restore();

                                        msg.edit("Gerando perfil..." + "\n`Pegando informações`").catch()

                                        pixelUtil.createBuffer("https://images.discordapp.net/attachments/309478380787597312/338085539167207425/Tampletes-profile.png?width=241&height=181").then(buffer => {
                                            image2.src = buffer;

                                            ctx.drawImage(image2, 0, 0, 321, 241);

                                            msg.edit("Gerando perfil..." + "\n`Enviando buffer`").catch()

                                            // Username
                                            ctx.font = '14px Arial';
                                            ctx.fillStyle = '#000000';
                                            ctx.fillText(`${message.author.username}`, 23, 150);

                                            // Level
                                            ctx.font = '14px Arial';
                                            ctx.fillStyle = '#000000';
                                            ctx.fillText(`Level: ${userdata.child('levels/level').val()}`, 23, 175);

                                            message.channel.createMessage(`${message.author.mention} - Perfil`, {
                                                file: canvas.toBuffer(),
                                                name: 'canvas.png'
                                            }).then(picsent => {
                                                var stop = Date.now();
                                                var diff = (stop - start);
                                                msg.edit("ACABEI! \n Perfil gerado em `" + diff / 1000 + "s`").catch()
                                            })
                                        });
                                    });
                                });
                            });
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
        alias: ['ts']
    }
};