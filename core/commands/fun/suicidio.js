module.exports = {
    label: 'suicidio',
    enabled: true,
    generator: async(eris, serverDB, channelDB, userDB, language, args, message) => {
        try {
            var Server = message.channel.guild;
            var Channel = message.channel;
            var Author = message.author;
            var MSG = message.content;

            //-----------------MAGIC---------------------

            var imagem = ["https://media.giphy.com/media/ENB1fIlVnMRcQ/giphy.gif", "https://media.giphy.com/media/xuDHhHcCR0rew/giphy.gif", "https://media.giphy.com/media/l2JeiuwmhZlkrVOkU/giphy.gif", "https://media.giphy.com/media/jSxK33dwEMbkY/giphy.gif", "https://media.giphy.com/media/vkwAeqMEUSaoU/giphy.gif"];

            message.channel.createEmbed()
                .color(Math.floor(Math.random() * 16777216))
                .title(language.suicidio.replace("${message.author.username}", message.author.username))
                .image(imagem[Math.floor(Math.random() * imagem.length)])
                .send()
        } catch (err) {
            console.log(err);
        }
    }
};