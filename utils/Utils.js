let eris = require('../lib/client');
let firebase = require("firebase");
let fs = require('fs');
let moment = require('moment');

var db = firebase.database();
var ref = db.ref();

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
}

module.exports = Utils;