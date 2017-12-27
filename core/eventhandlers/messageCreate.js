var Eris = require('../infinity.js');
var eris = Eris.eris;

module.exports = {
    event: 'messageCreate',
    enabled: true,
    handler: (message) => {
        try {
            if (message.channel.id == '394323844476829705') {
                message.addReaction(`👍`);
                message.addReaction(`👎`);
                message.addReaction(`🤷`);
            }
        } catch (err) {}
    }
};