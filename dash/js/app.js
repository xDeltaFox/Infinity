(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBpV7zlBFTGsBL4wcv4Mc5AlRguaOfA6TE",
    authDomain: "bot2-3d2c4.firebaseapp.com",
    databaseURL: "https://bot2-3d2c4.firebaseio.com",
    projectId: "bot2-3d2c4",
    storageBucket: "bot2-3d2c4.appspot.com",
    messagingSenderId: "788985892056"
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
        menu[0].style.width = '25%';
    } else {
        menu[0].style.transition = 'width 0.5s ease';
        menu[0].style.width = '0%';
    }
}

function select(aba) {
    var News = document.getElementsByClassName('News');
    var comandos = document.getElementsByClassName('comandos');
    var doacoes = document.getElementsByClassName('doacoes');
    var smTitleBar = document.getElementsByClassName('smTitleBar');
    if (aba == "News") {
        News[0].style.display = "inherit";
        comandos[0].style.display = "none";
        doacoes[0].style.display = "none";
        smTitleBar[0].children[2].innerHTML = "Bem-vindo";
    } else if (aba == "comandos") {
        News[0].style.display = "none";
        comandos[0].style.display = "inherit";
        doacoes[0].style.display = "none";
        smTitleBar[0].children[2].innerHTML = "Comandos";
    } else if (aba == "doacoes") {
        News[0].style.display = "none";
        comandos[0].style.display = "none";
        doacoes[0].style.display = "inherit";
        smTitleBar[0].children[2].innerHTML = "Doações";
    }
}
},{}]},{},[1]);
