let fs = require('fs');
let flatten = require('flat');

function getlang(lang, key) {
    //var language = JSON.parse(fs.readFileSync(`./lang/${lang}.json`, 'utf8'));
    var language = {};

    fs.readdir('./lang', (err, files) => {
        if (err) {
            console.log('Error reading langfiles', { attach: err });
        } else {
            files.forEach((file) => {
                try {
                    let f = require('./lang/' + file);
                    if (file == lang) {
                        language[f.lang] = flatten(f.strings);
                    }
                } catch (e) {
                    console.log('Error reading langfile ' + file, { attach: e });
                }
            });
        }
    });

    console.log(language);
    return language + `.${key}`;
}

module.exports = getlang;