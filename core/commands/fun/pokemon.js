let request = require("request");
let Pokedex = require('pokedex-promise-v2');
let P = new Pokedex();

module.exports = {
    label: 'pokedex',
    enabled: true,
    generator: async(eris, serverDB, channelDB, userDB, language, args, message) => {
        try {
            var Server = message.channel.guild;
            var Channel = message.channel;
            var Author = message.author;
            var MSG = message.content;

            //-----------------MAGIC---------------------

            var args2 = message.content.split(' ');
            if (args2[1] != undefined) {
                P.getPokemonByName(args2[1], function(response, error) { // with callback 
                    if (!error) {
                        console.log(response);

                        var habtext = "";
                        var statstext = "";
                        var typetext = "";
                        response.abilities.forEach(function(abilitie) {
                            habtext += language.pokemon.habtext.replace('${abilitie.ability.name}', abilitie.ability.name).replace('${abilitie.is_hidden}', abilitie.is_hidden);
                        });

                        response.stats.forEach(function(stat) {
                            statstext += `**${stat.stat.name}** => **base_stat**: ${stat.base_stat} **effort**: ${stat.effort}\n`;
                        });

                        response.types.forEach(function(type) {
                            typetext += `${type.type.name}\n`;
                        });

                        P.getGenerationsList()
                            .then(function(response) {
                                console.log(response);
                                response.results.forEach(generation => {
                                    request({
                                        url: generation.url,
                                        json: true
                                    }, function(error, response, body) {
                                        if (!error && response.statusCode === 200) {
                                            console.log(generation.name + " => " + body);
                                        }
                                    });
                                });
                            })
                            .catch(function(error) {
                                console.log('There was an ERROR: ', error);
                            });

                        eris.createMessage(message.channel.id, {
                            embed: {
                                title: response.name,
                                description: language.pokemon.description.replace("${response.height}", response.height).replace("${response.weight}", response.weight).replace("${response.base_experience}", response.base_experience),
                                color: 265897,
                                fields: [{
                                    name: language.pokemon.fields1,
                                    value: typetext,
                                    inline: false
                                }, {
                                    name: language.pokemon.fields2,
                                    value: language.pokemon.fieldssoon,
                                    inline: false
                                }, {
                                    name: language.pokemon.fields3,
                                    value: response.id,
                                    inline: false
                                }, {
                                    name: language.pokemon.fields4,
                                    value: habtext,
                                    inline: false
                                }, {
                                    name: language.pokemon.fields5,
                                    value: statstext,
                                    inline: false
                                }, {
                                    name: language.pokemon.fields6,
                                    value: language.pokemon.fieldssoon,
                                    inline: false
                                }],
                                thumbnail: {
                                    url: response.sprites.front_default
                                }
                            }
                        });
                    } else {
                        console.log(error)
                    }
                });
            } else {
                eris.createMessage(message.channel.id, language.pokemon.err);
            }
        } catch (err) {
            console.log(err);
        }
    }
};