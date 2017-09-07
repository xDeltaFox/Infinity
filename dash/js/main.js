'use strict';

// Initialize Firebase
var config = {
    apiKey: "apiKey",
    authDomain: "authDomain",
    databaseURL: "databaseURL",
    projectId: "projectId",
    storageBucket: "storageBucket",
    messagingSenderId: "messagingSenderId"
};
firebase.initializeApp(config);

var db = firebase.database();
var ref = db.ref();

setInterval(function() {
    ref.once("value")
        .then(function(snapshot) {
            document.getElementById('guilds').innerText = snapshot.child('site/totalServers').val();
            document.getElementById('membres').innerText = snapshot.child('site/totalUsers').val();
        });
}, 500);


var skynetDB = {};
$.getJSON("https://discordapp.com/api/guilds/238977913863536640/embed.json", function(json) {
    //  document.getElementById('x').innerHTML= json
    var a = _.findKey(json.members, { 'id': '313474367847923712' });
    try {
        $('#x').html(json.members[a].status)
        $('.holster-md').addClass(json.members[a].status)
    } catch (e) {
        $('#x').html('DOWN')
        $('.holster-md').addClass('offline')
    }
});

$.getJSON("https://discordapp.com/api/guilds/238977913863536640/embed.json", function(json) {
    //  document.getElementById('x').innerHTML= json
    var b = _.findKey(json.members, { 'id': '238975494047924224' });
    try {
        $('#staff-status').html(json.members[b].status)
        $('.staff-name').html(`${json.members[b].username}#${json.members[b].discriminator}`)
        $('.holster-staff').addClass(json.members[b].status)
    } catch (e) {
        $('#staff-status').html('DOWN')
        $('.staff-name').html('xDeltaFox#8871')
        $('.holster-staff').addClass('offline')
    }
});

function menuview() {
    var menu = document.getElementsByClassName('menu');
    if (menu[0].style.width == '0%') {
        menu[0].style.transition = 'width 0.5s ease';
        menu[0].style.width = '10%';
    } else {
        menu[0].style.transition = 'width 0.5s ease';
        menu[0].style.width = '0%';
    }
}

function home() {
    window.location.replace('/');
}

function select(aba) {
    var News = document.getElementsByClassName('News');
    var comandos = document.getElementsByClassName('comandos');
    var doacoes = document.getElementsByClassName('doacoes');
    var dash = document.getElementsByClassName('dash');
    var top = document.getElementsByClassName('top');
    if (aba == "News") {
        News[0].style.display = "inherit";
        comandos[0].style.display = "none";
        doacoes[0].style.display = "none";
        dash[0].style.display = "none";
        top[0].children[1].innerHTML = "Bem-vindo";
    } else if (aba == "comandos") {
        News[0].style.display = "none";
        comandos[0].style.display = "inherit";
        doacoes[0].style.display = "none";
        dash[0].style.display = "none";
        top[0].children[1].innerHTML = "Comandos";
    } else if (aba == "doacoes") {
        News[0].style.display = "none";
        comandos[0].style.display = "none";
        doacoes[0].style.display = "inherit";
        dash[0].style.display = "none";
        top[0].children[1].innerHTML = "Doações";
    } else if (aba == "dash") {
        News[0].style.display = "none";
        comandos[0].style.display = "none";
        doacoes[0].style.display = "none";
        dash[0].style.display = "inherit";
        top[0].children[1].innerHTML = "Dash";
    }
}