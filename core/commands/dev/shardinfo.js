module.exports = {
    label: 'shard',
    enabled: true,
    isSubcommand: false,
    generator: async(eris, serverDB, channelDB, userDB, language, args, message) => {
        try {
            var shardsinfo = `  Shard   |   Status  |   Latency |   Ready   \n`;
            eris.shards.forEach(shard => {
                shardsinfo += ` [${shard.id+1}/${eris.shards.size}]  | ${shard.status}  | ${shard.latency} ms  | ${shard.ready} \n`;
            });
            eris.createMessage(message.channel.id, "```css\n" + shardsinfo + "\n```");
        } catch (err) {
            console.log(err);
        }
    }
};