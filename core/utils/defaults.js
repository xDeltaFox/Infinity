module.exports = {

    //global
    global: {
        totalServers: 0,
        totalUsers: 0
    },

    //GUILD
    guild: {
        name: "",
        ID: "",
        modules: {
            GREET: {
                hi: false,
                joinText: "Bem-vindo ao %server%, %username%!",
                greetChan: ""
            },
            FWELL: {
                hi: false,
                joinText: "%username% saiu do %server%!",
                greetChan: ""
            },
            MONEY: true,
            LEVELS: true,
            LVUP: true,
            DROPS: true,
            ANNOUNCE: false,
            invite: false,
            prefix: ">",
            lang: 'pt-br',
            disabled: ['cog'],
            autoroles: [],
            city: false,
            cities: {
                nome: "",
                id: "",
                money: 0,
                população: 0,
                residencia: 0,
                comercio: 0,
                industria: 0,
                dem_residencial: 0,
                dem_comercial: 0,
                dem_industrial: 0
            },
            minerais: {
                carvão: 0,
                ferro: 0,
                energia: 0,
                agua: 0,
                oxigenio: 0,
                combustivel: 0,
                aluminio: 0,
                uranium: 0,
                quimico: 0,
                aço: 0,
                carbono: 0,
                silício: 0,
                vidro: 0,
                eletronico: 0,
                carvao: 0,
                diamante: 0,
                obsidian: 0,
                quartz: 0,
                ruby: 0,
                sapphire: 0
            }
        },
        channels: {}
    },
    //CHANNEL
    channel: {
        name: "",
        ID: "",
        modules: {
            DROPSLY: 0,
            MONEY: true,
            LEVELS: true,
            LVUP: true,
            DROPS: true,
            DISABLED: ['cog']
        }
    },
    //USER
    user: {
        name: "",
        ID: "",
        modules: {
            eval: false,
            level: 0,
            exp: 0,
            money: 0,
            coins: 0,
            medals: [0, 0, 0, 0, 0, 0, 0, 0],
            daily: 1486595162497,
            persotext: "Não tem nada para ver aqui",
            rep: 0,
            bgID: "https://wallpaperscraft.com/image/minimalism_sky_clouds_sun_mountains_lake_landscape_95458_602x339.jpg"
        }
    }
}