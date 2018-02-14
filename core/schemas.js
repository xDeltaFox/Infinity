const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/infinitybot');
mongoose.Promise = global.Promise;
const Promise = require("bluebird");
Promise.promisifyAll(require("mongoose"));
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed;

// mongoose.connection.on('open', function(){
//     mongoose.connection.db.dropDatabase(function (err) {
//       console.log('db dropped');
//       process.exit(0);
//     });
// });

//SERVER
const Server = new Schema({
    partner: { type: Boolean, default: false },
    partnerDetails: {
        description: { type: String, default: '' },
        website: { type: String, default: '' },
        tags: { type: String, default: '' },
        feats: { type: String, default: '' },
        langs: { type: String, default: '' },
        langsA: { type: Array, default: [] },
        region: { type: String, default: '' },
        picture: { type: String, default: '' },
        invite: { type: String, default: '' },
    },
    id: { type: String, required: true, index: { unique: true } },
    name: { type: String },
    model: {
        DISABLED: { type: Array, default: [] },
        prefix: { type: String, default: "++" },
        lang: { type: String, default: "pt-br" }
    },
    channels: Mixed
}, { strict: false });

//CHANS
const Channel = new Schema({
    name: { type: String },
    id: { type: String, required: true, index: { unique: true } },
    model: {
        DISABLED: { type: Array, default: [] }
    }
}, { strict: false });

//USRS
const User = new Schema({
    name: { type: String },
    tag: { type: String },
    id: { type: String, required: true, index: { unique: true } },
    model: {
        level: { type: Number, default: 0 },
        exp: { type: Number, default: 0 },
        xpGain: { type: Number, default: 1 },
        money: { type: Number, default: 0 },
        coins: { type: Number, default: 0 },
        daily: { type: Number, default: new Date().getTime() },
        persotext: { type: String, default: "Não tem nada para ver aqui" },
        rep: { type: Number, default: 0 }
    }
}, { strict: false });

const Background = new Schema({
    name: String,
    id: { type: String, index: { unique: true } },
    price: { type: Number },
    categorys: { type: Array, default: [] },
    rarity: { type: Number },
    dropRate: { type: Number, default: 0 },
    dropable: { type: Boolean, default: true },
    sellable: { type: Boolean, default: true }
}, { strict: false });

const Global = new Schema({
    id: { type: Number, default: 0, require: true },
    model: {
        dailyEpoch: { type: Number, default: new Date().getTime() },
        epochStamp: { type: Number, default: new Date(new Date().getTime()) },
        blacklist: { type: Array, default: [] }
    }
}, { strict: false });

module.exports = {
    user: mongoose.model('User', User, 'userdb'),
    server: mongoose.model('Server', Server, 'serverdb'),
    channel: mongoose.model('Channel', Channel, 'channeldb'),
    global: mongoose.model('Global', Global, 'globals')
};