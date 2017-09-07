let client = require('../client');
let eris = client.eris;
let request = require('request');
let gear = require('../utils/gearboxes');

module.exports = {
    event: 'error',
    enabled: true,
    handler: (err) => {
        if (!err) return;
        let name = "Infinity Crash"
        let txb = "Minor error! Check console"
        let tx = `
        **${err}**
        ${err.stack}
        `
        let color = '#ffdc49'
        gear.sendSlack(name, txb, tx, color)
    }
};