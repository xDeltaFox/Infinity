const fs = require("fs");
const gear = require("./gearboxes");

const STAMPBASE = "../../resources/lists/Raridade.json";
const BGBASE = "../../resources/lists/Background.json";
const MEDALBASE = "../../resources/lists/medals.json";
const COLORBASE = "../../resources/lists/colors.json";
const FLAIRBASE = "../../resources/lists/flairs.json";

/*
0~5 -   Rubine
6~8 -   Rubine+
9~10 -  Background
11~12 - Medal
13~15 - Jades
16~17 - Jades

SIZES
======
1 - Tiny
3 - Medium
5 - Large
8 - Humongous
======

RARITY
======
1 - Comum      1001 -  2500
2 - Incomun    581  -  1350
3 - Rara       121  -  580
4 - Lendária   11   -  120
5 - Epica      1    -  10
======
*/

var values = {
    C: 1,
    I: 2,
    R: 3,
    L: 4,
    E: 5
}

var Locais = [
    "Hospital",
    "Delegacia",
    "Prefeitura",
    "Padaria",
    "Centro Comercial",
    "Supermercado",
    "Shopping",
    "Loja",
    "Indusria",
    "Mineradora",
    "Aldeia",
    "Porto",
    "Cruzeiro",
    "Usina Nuclear",
    "Jazida",
    "Fazenda",
    "Residencia",
    "Predio",
    "Rua",
    "Estudio"
];


class Lootbox {
    constructor(rarity, size) {
        this.rarity = rarity || "C";
        this.size = size || 3;
        this.content = []
        this.stakes = 0
        this.data = {
            local: "Rua",
            prizes: {
                medals: [],
                bgs: [],
                stamps: [],
                rubines: [],
                jades: [],
                carvão: [],
                ferro: [],
                energia: [],
                agua: [],
                oxigenio: [],
                combustivel: [],
                aluminio: [],
                uranium: [],
                quimico: [],
                aço: [],
                carbono: [],
                silício: [],
                vidro: [],
                eletronico: [],
                carvao: [],
                diamante: [],
                obsidian: [],
                quartz: [],
                sapphire: [],
                items: [],
                colors: []
            }
        }
    }

    getLocal() {
        return Locais[gear.randomize(0, Locais.length - 1)];
    }

    reroll() {
        this.stakes++
            this.data.prizes = {
                medals: [],
                bgs: [],
                stamps: [],
                rubines: [],
                jades: [],
                carvão: [],
                ferro: [],
                energia: [],
                agua: [],
                oxigenio: [],
                combustivel: [],
                aluminio: [],
                uranium: [],
                quimico: [],
                aço: [],
                carbono: [],
                silício: [],
                vidro: [],
                eletronico: [],
                carvao: [],
                diamante: [],
                obsidian: [],
                quartz: [],
                sapphire: [],
                items: [],
                colors: []
            }
        this.open()
    }

    getStamps(rarity) {
        let base = JSON.parse(fs.readFileSync(STAMPBASE))
        let prize = base[rarity][gear.randomize(0, base[rarity].length - 1)]
        console.log("PRIZE:" + prize)
        this.data.prizes.stamps.push([rarity, prize])
    }

    getJades(rarity) {
        let rar = values[rarity]
        let rr = gear.randomize(8, 10)
        this.data.prizes.jades.push([rarity, Math.floor(rar * (gear.randomize(80, 100)) * 18 / 10)])
    }
    getBG(rarity) {
        let base = JSON.parse(fs.readFileSync(BGBASE))
        let filter = base.filter(bg => bg.rarity === rarity)
        let prize = filter[gear.randomize(0, filter.length - 1)]
        console.log("PRIZE:" + prize)
        this.data.prizes.bgs.push([rarity, prize])
    }
    getMedal(rarity) {
        let base = JSON.parse(fs.readFileSync(MEDALBASE))
        let filter = base.filter(med => med.rarity === rarity)
        let prize = filter[gear.randomize(0, filter.length - 1)]
        console.log("PRIZE:" + prize)
        console.log(prize)
        this.data.prizes.medals.push([rarity, prize])
    }
    getRubines(rarity) {
        let rar = values[rarity]
        let rr = gear.randomize(80, 100)
        console.log("RAR:  " + rar + " * " + rr)
        this.data.prizes.rubines.push([rarity, Math.floor(rar * (rr) / 4)])
    }

    rarityCheck() {
        let a = Math.floor(Math.random() * (2500 - 1 + 1) + 1);
        switch (true) {
            case a <= 10:
                return "E"
                break;
            case a <= 120:
                return "L"
                break;
            case a <= 580:
                return "R"
                break;
            case a <= 1350:
                return "I"
                break;
            default:
                return "C"
                break;
        }
    }

    checkout(USER) {
        let p = this.data.prizes
        for (i = 0; i < p.medals.length; ++i) gear.userAdd(USER, "medalInventory", p.medals[i]);
        for (i = 0; i < p.stamps.length; ++i) gear.userAdd(USER, "mstampInventory", p.stamps[i]);
        for (i = 0; i < p.bgs.length; ++i) gear.userAdd(USER, "bgInventory", p.bgs[i]);
        for (i = 0; i < p.colors.length; ++i) gear.userAdd(USER, "colorInventory", p.colors[i]);
        for (i = 0; i < p.items.length; ++i) gear.userAdd(USER, "INVENTORY", p.items[i]);
        for (i = 0; i < p.rubines.length; ++i) gear.userIncrement(USER, "minerais.ruby", p.rubines[i]);
        for (i = 0; i < p.jades.length; ++i) gear.userIncrement(USER, "minerais.jades", p.jades[i]);
    }

    getPrize(finder, rarity) {
        switch (true) {
            case finder <= 2:
                this.data.local = Locais[gear.randomize(0, Locais.length - 1)];
                return this.getRubines(rarity)
                break;
            case finder <= 4:
                this.data.local = Locais[gear.randomize(0, Locais.length - 1)];
                return this.getRubines(rarity)
                break;
            case finder <= 9:
                this.data.local = Locais[gear.randomize(0, Locais.length - 1)];
                return this.getJades(rarity)
                break;
            case finder <= 11:
                this.data.local = Locais[gear.randomize(0, Locais.length - 1)];
                return this.getMedal(rarity)
                break;
            case finder <= 14:
                this.data.local = Locais[gear.randomize(0, Locais.length - 1)];
                return this.getBG(rarity)
                break;
            case finder <= 16:
                this.data.local = Locais[gear.randomize(0, Locais.length - 1)];
                return this.getStamps(rarity)
                break;
            default:
                this.data.local = Locais[gear.randomize(0, Locais.length - 1)];
                return this.getRubines(rarity)
                break;
        }
    }

    open() {
        return new Promise(async resolve => {
            let ff = gear.randomize(0, 17)
            this.getPrize(ff, this.rarity)
            for (i = 1; i < this.size; ++i) {
                let f = gear.randomize(0, 17)
                let r = this.rarityCheck()
                await this.getPrize(f, r);
            }
            return resolve(this.data)
        })
    }
}

module.exports = {
    Lootbox: Lootbox
};