let fs = require("fs");
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
let { userDB, serverDB, channelDB, globalDB } = require('./database_ops.js');

module.exports = {
    userDB,
    serverDB,
    channelDB,
    globalDB,
    increaseExp: async function increaseExp(Author) {
        let xp = Author.model.xpGain;
        await Author.update({ $inc: { "model.exp": xp } });
    },
    levelUp: async function levelUp(Author) {
        //==-!> Level up system
        let defactor = 0.1;
        let curLevel = Math.floor(0.1 * Math.sqrt(Author.model.exp));
        let moneyadd = Author.model.money + (Math.floor(Math.random() * 200));
        let xpGain = Author.model.xpGain + 1;
        if (curLevel > Author.model.level) {
            //==-> Change Data 
            await Author.update({ "model.level": curLevel, "model.money": moneyadd });
            if ((curLevel.toString().startsWith('3') || curLevel.toString().startsWith('5') || curLevel.toString().startsWith('7') || curLevel.toString().startsWith('9')) && curLevel.toString().endsWith('0')) {
                await Author.update({ "model.xpGain": xpGain });
            }
            console.log(`${Author.tag} subiu para o level ${curLevel}!`);
        }
    },
    randomize: function randomize(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}