let fs = require('fs');

function getlang(lang, key) {
    var valor;
    switch (lang) {
        case 'en':
        case 'en-us':
            //console.log('en-us');
            var language = JSON.parse(fs.readFileSync(`./utils/lang/en-us.json`));
            valor = eval("language." + key);
            break;
        case 'pt':
        case 'pt-br':
            //console.log('pt-br');
            var language = JSON.parse(fs.readFileSync(`./utils/lang/pt-br.json`));
            valor = eval("language." + key);
            break;
        default:
            //console.log('dev');
            var language = JSON.parse(fs.readFileSync(`./utils/lang/pt-br.json`));
            valor = eval("language." + key);
            break;
    }
    return valor;
}

module.exports = getlang;