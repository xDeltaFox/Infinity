const mongoose = require('mongoose');
mongoose.connect('', { useMongoClient: true });
mongoose.Promise = global.Promise;
const Promise = require("bluebird");
Promise.promisifyAll(require("mongoose"));

const Schema = mongoose.Schema

const Mixed = Schema.Types.Mixed;

//SERVER
const Server = new Schema({
    id: { type: String, required: true, index: { unique: true } },
    name: String,
    logging: false,
    modules: {

    },
    channels: Mixed
}, { strict: false });

//CHANS
const Channel = new Schema({
    name: String,
    LANGUAGE: String,
    id: { type: String, required: true, index: { unique: true } },
    modules: {
        BUSTER: Mixed,
        DROPSLY: { type: Number, default: 0 },
        EXP: { type: Boolean, default: true },
        LVUP: { type: Boolean, default: true },
        DROPS: { type: Boolean, default: true },
        DISABLED: Array
    }
}, { strict: false });

//USRS
const User = new Schema({
    name: String,
    tag: String,
    updated_at: { type: Date },
    id: { type: String, required: true, index: { unique: true } },
    modules: {

    }
}, { strict: false });

User.pre('update', function(next) {
    this.updated_at = Date.now();
    next();
}, { strict: false });

const Globals = new Schema({
    id: { type: Number, default: 0, unique: true },
    data: Mixed
});

//MARKET
const Background = new Schema({
    name: String,
    id: { type: String, index: { unique: true } },
    rarity: { type: String, index: true },
    tags: { type: String, index: true }
}, { strict: false });

module.exports = {
    user: mongoose.model('User', User, 'userdb'),
    server: mongoose.model('Server', Server, 'serverdb'),
    channel: mongoose.model('Channel', Channel, 'channeldb'),
    global: mongoose.model('Global', Globals, 'globals')
};