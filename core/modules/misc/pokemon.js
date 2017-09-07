let client = require("../client");
let eris = client.eris;
let fs = require('fs');
let cheerio = require('cheerio');
let request = require("request");
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let Pokedex = require('pokedex-promise-v2');
let P = new Pokedex();

module.exports = {
    label: 'pokedex',
    enabled: true,
    isSubcommand: false,
    generator: (message, args) => {
        try {
            eris.createMessage(config.starbucks, "[`" + message.channel.guild.name + "`" + "~>" + "`" + message.channel.name + "`]" + "**" + message.author.username + "**:" + message.content);
            var args2 = message.content.split(' ');
            if (args2[1] != undefined) {
                P.getPokemonByName(args2[1], function(response, error) { // with callback 
                    if (!error) {
                        console.log(response);

                        var habtext = "";
                        var statstext = "";
                        var typetext = "";
                        response.abilities.forEach(function(abilitie) {
                            habtext += `**Nome**: ${abilitie.ability.name} **Escondido**: ${abilitie.is_hidden}\n`;
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
                                description: `**Altura**: ${response.height}\n**Peso**: ${response.weight}\n**Exp**: ${response.base_experience}`,
                                color: 265897,
                                fields: [{
                                    name: `Tipos`,
                                    value: typetext,
                                    inline: false
                                }, {
                                    name: `Adicionado na Geração`,
                                    value: `Em Breve`,
                                    inline: false
                                }, {
                                    name: `Número na Pokédex`,
                                    value: response.id,
                                    inline: false
                                }, {
                                    name: `Habilidades`,
                                    value: habtext,
                                    inline: false
                                }, {
                                    name: `Treinamento`,
                                    value: statstext,
                                    inline: false
                                }, {
                                    name: `Evoluções`,
                                    value: `Em Breve`,
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
                eris.createMessage(message.channel.id, `Não sou nenhum, adivinho... Fale qual pokemon, quer saber?`);
            }
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