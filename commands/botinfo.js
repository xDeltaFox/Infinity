let fs = require('fs');
let os = require('os');
let eris = require('../lib/client');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

function bytesToSize(bytes) {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
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

module.exports = {
    label: 'bot',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[`" + message.channel.guild.name + "`" + "~>" + "`" + message.channel.name + "`]" + "**" + message.author.username + "**:" + message.content);
            message.channel.createEmbed()
                .author("To infinity and beyond", eris.user.avatarURL)
                .color(Math.floor(Math.random() * 16777216))
                .field('**Library**', '```\nEris v0.7.0 (by abalabahaha)\n```', false)
                .field('**Versão do Infinity**', '```\n' + `${config.botVersion}` + '\n```', true)
                .field('**Linguagem**', '```\nJavaScript\n```', true)
                .field('**Prefix**', '```\n>\n```', true)
                .field('**Servidores**', '```\n' + `${eris.guilds.size}` + '\n```', true)
                .field('**Shards**', '```\n' + `${eris.shards.size}` + '\n```', true)
                .field('**Usuários**', '```\n' + `${eris.users.size}` + '\n```', true)
                .field('**RAM(Usada/Max)**', '```\n' + `${bytesToSize(os.totalmem() - os.freemem())+ "/" +bytesToSize(os.totalmem())}` + '\n```', true)
                .field('**Uptime**', '```\n' + `${format(process.uptime())}` + '\n```', true)
                .field('**Website**', 'http://infinitybot.gq/', false)
                .field('**Servidor Official**', 'https://discord.gg/thKZC2d', true)
                .footer("Infinity foi criado por xDeltaFox", eris.user.avatarURL)
                .send()
        } catch (err) {
            eris.createMessage(config.logChannel, `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:${this.label}\n\t>> ${err.response}\n\t${err.stack}`);
        }
    },
    options: {
        description: 'Veja as info do bot',
        cooldown: 5000,
        cooldownMessage: 'Cuidado com o flood!',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['bi']
    }
};