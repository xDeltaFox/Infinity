let eris = require('../lib/client');
let fs = require('fs');
let YouTube = require('youtube-node');
let moment = require('moment');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

let youTube = new YouTube();
youTube.setKey('KEY');

module.exports = {
    label: 'yt',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[```" + message.channel.guild.name + "```" + "~>" + "```" + message.channel.name + "```]" + "**" + message.author.username + "**:" + message.content);
            var video = message.content.slice(4);
            youTube.search(video, 1, function(error, result) {
                try {
                    if (error) {
                        console.log(error);
                    } else {
                        // console.log(result);
                        result.items.forEach(function(video) {
                            console.log(video);
                            var id;
                            if (video.id.videoId != undefined) {
                                id = video.id.videoId;
                            } else {
                                id = video.snippet.channelId;
                            }
                            eris.createMessage(message.channel.id, {
                                embed: {
                                    color: Math.floor(Math.random() * 16777216),
                                    title: video.snippet.title,
                                    description: "https://www.youtube.com/watch?v=" + id,
                                    thumbnail: {
                                        url: video.snippet.thumbnails.high.url,
                                        proxy_url: video.snippet.thumbnails.high.url
                                    },
                                    fields: [{
                                        name: '**Enviado por: **',
                                        value: video.snippet.channelTitle,
                                        inline: true
                                    }, {
                                        name: '**Publicado em: **',
                                        value: moment(video.snippet.publishedAt).format('LLLL'),
                                        inline: true
                                    }, {
                                        name: '**Descrição: **',
                                        value: video.snippet.description,
                                        inline: true
                                    }],
                                    footer: {
                                        text: 'por ' + message.author.username + "#" + message.author.discriminator,
                                        icon_url: message.author.avatarURL
                                    }
                                }
                            });
                        });
                    }
                } catch (err) {
                    eris.createMessage(config.logChannel, `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:${this.label}\n\t>> ${err.response}\n\t${err.stack}`);
                }
            });
        } catch (err) {
            eris.createMessage(config.logChannel, `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:${this.label}\n\t>> ${err.response}\n\t${err.stack}`);
        }
    },
    options: {
        description: 'faça uma busca pelo seu video no youtube',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['ts']
    }
};