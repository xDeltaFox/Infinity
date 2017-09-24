let fs = require('fs');

// var options = {
//     save: "nada",
//     sdfg: "s nrg",
//     savfe: "dfhdhhs",
//     savdfe: "nfgfgafghfgda",
//     savdfe: "nada",
//     savfge: "nadga",
//     safgve: "nadfsdfda",
//     save: "ngddffadfshdfga",
//     save: "ndfdffs",
//     save: "nagdfda",
//     safdsdfdfve: "ndfada",
//     sdfsve: "nada",
//     sdfsave: "nadfda",
//     sdsfave: "df",
//     save: "nfddsfada",
//     sadfve: "nadfhjhghfgdgda",
//     saggdfve: "df",
//     sdfave: "nada",
// };

// fs.writeFile("./list.json", JSON.stringify(options), function(err) {})

var sla = ["lsdkfnsdklfndkl", "dhflsdhlkdhnf", "asdjcbhsdjkcs", "hdsfhisdfoihd", "dioshiodfsghsdfhdf"];

setInterval(() => { // Update the bot's status for each shard every 10 minutes
    let listgames = JSON.parse(fs.readFileSync('./core/listgames.json', 'utf8'));
    var status = [`${listgames.games[Math.floor(Math.random() * listgames.games.length)]} em ${eris.guilds.size} servidores || >ajuda`, `${listgames.games[Math.floor(Math.random() * listgames.games.length)]} para ${eris.users.size} usuarios || >ajuda`, `Entre no meu servidor! https://discord.gg/thKZC2d`, `${listgames.games[Math.floor(Math.random() * listgames.games.length)]} á ${format(process.uptime())}`];
    var i = 0;
    if (listgames.length !== 0 && eris.uptime !== 0) {
        i++;
        if (i > status.length - 1) {
            i = 0;
        }
        eris.editStatus("online", { name: status[i], type: 1, url: 'https://www.twitch.tv/xdeltafox1' });
    }
}, 30000);


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