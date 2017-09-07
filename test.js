let fs = require('fs');

var options = {
    save: "nada",
    sdfg: "s nrg",
    savfe: "dfhdhhs",
    savdfe: "nfgfgafghfgda",
    savdfe: "nada",
    savfge: "nadga",
    safgve: "nadfsdfda",
    save: "ngddffadfshdfga",
    save: "ndfdffs",
    save: "nagdfda",
    safdsdfdfve: "ndfada",
    sdfsve: "nada",
    sdfsave: "nadfda",
    sdsfave: "df",
    save: "nfddsfada",
    sadfve: "nadfhjhghfgdgda",
    saggdfve: "df",
    sdfave: "nada",
};

fs.writeFile("./list.json", JSON.stringify(options), function(err) {})




// let files = fs.readdirSync('./core/modules');
// for (i = 0; i < files.length; i++) {
//     let filedir = './core/modules/' + files[i]
//     console.log(filedir);
//     //let morefiles = fs.readdirSync(filedir)
//     fs.readdir(filedir, (err, files) => {
//         if (err) {
//             //console.log('Comandos não podem ser carregados...', { attach: err });
//         } else {
//             files.forEach((file) => {
//                 try {
//                     let c = filedir + '/' + file;
//                     console.log(c);
//                 } catch (e) {
//                     //console.log('Erro no carregamento do comando ' + file, { attach: e })
//                 }
//             });
//         }
//     });
//     // if (morefiles.indexOf(command + ".js") > -1) {
//     //     console.log(morefiles.length);
//     // }
// }