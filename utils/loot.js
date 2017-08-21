var loot = {};

loot.local.DP = function() {
    var loots = ["rubi", "jade", "obsidian", "quartzo", "safira", "diamante", "esmeralda", "ametista"];
    return loots[Math.floor(Math.random() * loots.length)];
}

module.exports = loot;