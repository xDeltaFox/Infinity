let client = require('../client');
let eris = client.eris;
let fs = require('fs');
let moment = require('moment');

class Utils {
    format(seconds) {
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

    PegarTamanhodaBarro(ValorMin, ValorMax) {
        return ValorMin / ValorMax;
    }

    PegarPorcentagemdaBarro(ValorMin, ValorMax, factor) {
        return PegarTamanhodaBarro(ValorMin, ValorMax) * factor;
    }

    geturl(urlArgs) {
        var urlBase = "https://us.api.battle.net/";
        var urlOptions = "?locale=pt_BR&apikey=rva5kant7gqcj3cpw7ds4csqr7dk84cd";
        return JSON.parse(urlBase + urlArgs + urlOptions);
    }
}

module.exports = Utils;