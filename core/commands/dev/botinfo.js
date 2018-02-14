let os = require('os');

module.exports = {
    label: 'bot',
    enabled: true,
    isSubcommand: false,
    generator: async(eris, serverDB, channelDB, userDB, language, args, message) => {
        try {
            var botinfo = "***Hello, " + message.author.username + ". You're looking well today***.\n" +
                "**Library**: " + "```\n" + "Eris v0.8.0 (by abalabahaha)" + "\n```\n" +
                "**Linguagem**: " + "```\n" + "JavaScript" + "\n```\n" +
                "**Versão do Infinity**: " + "```\n" + config.botVersion + "\n```\n" +
                "**Comandos**: " + "```\n" + "Infinity tem " + 6 + " comandos" + "\n```\n" +
                "**Servidores**: " + "```\n" + eris.guilds.size + "\n```\n" +
                "**Shards**: " + "```\n" + eris.shards.size + "\n```\n" +
                "**Usuários**:" + "```\n" + eris.users.size + "\n```\n" +
                "**RAM(Usada/Max)**: " + "```\n" + bytesToSize(os.totalmem() - os.freemem()) + "/" + bytesToSize(os.totalmem()) + "\n```\n" +
                "**Uptime**: " + "```\n" + format(process.uptime()) + "\n```\n" +
                "**Servidor Official**: " + "```\n" + "https://discord.gg/XsqNxkY" + "\n```\n" +
                "***Infinity foi criado por xDeltaFox***.";
            message.channel.createMessage(botinfo);
        } catch (err) {
            console.log(err);
        }
    }
};