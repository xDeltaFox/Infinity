let client = require('../client');
let eris = client.eris;

var userRole = function userRole(member, guild) {
    var roles = eris.guilds.get(guild.id).members.get(member).roles;
    var text = "";
    if (roles && roles.length > 0) {
        return roles.map(r => eris.guilds.get(guild.id).roles.get(r).name).join(', ');
    } else {
        return text = "Este usuario não tem cargos";
    }
}

function userStatus(member, guild) {
    if (eris.guilds.get(guild.id).members.get(member.id).status === 'online') {
        return 'Online';
    } else if (eris.guilds.get(guild.id).members.get(member.id).status === 'dnd') {
        return 'Ocupado';
    } else if (eris.guilds.get(guild.id).members.get(member.id).status === 'idle') {
        return 'Ausente';
    } else if (eris.guilds.get(guild.id).members.get(member.id).status === 'offline') {
        return 'Offline';
    }
}

function findRoles(content) {
    return eris.guilds.get(message.channel.guild.id).roles.find(role => role.name.toLowerCase() == content.toLowerCase())
}

function findPerm(guild, author, nameperm) {
    return eris.guilds.get(guild.id).members.get(author.id).permission.has(nameperm);
}

module.exports = {
    userRole: userRole,
    userStatus: userStatus,
    findRoles: findRoles,
    findPerm: findPerm
}