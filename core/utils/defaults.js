module.exports = {

    //Infinity
    infinty: {
        dailyEpoch: 1500271200000,
        epochStamp: new Date(1500271200000)
    },

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