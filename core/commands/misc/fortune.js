let request = require('request');

module.exports = {
    label: 'fortune',
    enabled: true,
    generator: async(eris, serverDB, channelDB, userDB, language, args, message) => {
        try {
            var Server = message.channel.guild;
            var Channel = message.channel;
            var Author = message.author;
            var Member = message.member;
            var MSG = message.content;

            //-----------------MAGIC---------------------

            const categories = ["all", "computers", "cookie", "definitions", "miscellaneous", "people", "platitudes", "politics", "science", "wisdom"];
            let category = content[1];
            if (category != undefined || category != null) {
                if (categories.includes(category.toLowerCase())) {
                    var options = {
                        url: `http://yerkee.com/api/fortune/${category.toLowerCase()}`,
                        headers: {
                            'User-Agent': 'request'
                        }
                    };

                    function callback(error, response, body) {
                        if (!error && response.statusCode == 200) {
                            var info = JSON.parse(body);
                            eris.createMessage(message.channel.id, `<:fortune_cookie:367023635191431178>\n${info.fortune}`);
                        }
                    }
                    request(options, callback);
                } else {
                    eris.createMessage(message.channel.id, "Forneça a categoria para qu poder continuar.");
                }
            } else {
                eris.createMessage(message.channel.id, "Forneça a categoria para qu poder continuar.");
            }
        } catch (err) {
            console.log(err);
        }
    }
};