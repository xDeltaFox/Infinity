let eris = require('../lib/client');
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

module.exports = {
    label: 'shard',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            var shardsinfo = "";
            eris.shards.forEach(shard => {
                shardsinfo += `Shard [${shard.id+1}/${eris.shards.size}] | Status: ${shard.status} | Latency: ${shard.latency} ms | Ready: ${shard.ready}\n`;
            });
            return "```css\n" + shardsinfo + "\n```";
        } catch (err) {
            eris.createMessage(config.logChannel, `[${message.channel.guild.name}>>${message.channel.name}]${message.author.username}#${message.author.discriminator}:${this.label}\n\t>> ${err.response}\n\t${err.stack}`);
        }
    },
    options: {
        description: 'Veja as shards do bot',
        deleteCommand: false,
        caseInsensitive: true,
        alias: ['si']
    }
};