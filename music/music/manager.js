const managers = new Map();
const consts = require('../../music/index');
const ytdl = require('ytdl-core');
const uuid = require('node-uuid');

class Manager {
    constructor(gid) {
        managers.set(gid, this);
        this.uid = undefined;
        this.song = undefined;
        this.songQueue = [];
        this.guild = gid;
    }

    get getSong() {
        return this.song;
    }

    skip() {
        let uid = uuid.v4();
        if (consts.client.voiceConnections.get(this.guild)) {
            this.uid = uid;
            consts.client.voiceConnections.get(this.guild).stopPlaying();
        }
        this.song = this.songQueue.shift();
        if (!this.song)
            return;
        this.uid = uid;
        let dis = this;
        consts.client.joinVoiceChannel(dis.song.channel).then(conn => {
            this.handle(dis, uid, conn);
        }, err => {
            console.log(err.stack);
            if (consts.client.voiceConnections.get(this.guild))
                this.handle(dis, uid, consts.client.voiceConnections.get(this.guild));
            try {
                consts.client.createMessage(dis.song.textChannel, `<@!${dis.song.requestedBy}> could not join the channel!\nResuming in the same one I am in right now!`);
            } catch (_err) {}
        });
    }

    handle(dis, uid, conn) {
        let stream = ytdl(this.song.url, { audioonly: true });
        try {
            consts.client.createMessage(dis.song.textChannel, `<@!${dis.song.requestedBy}> requested the song ${dis.song.info.title}!`);
        } catch (err) {}
        conn.play(stream);
        conn.on('end', () => {
            if (dis.songQueue.length < 1) {
                consts.client.leaveVoiceChannel(dis.song.channel);
            }
            if (dis.uid !== uid)
                return;
            if (dis.songQueue.length >= 1)
                dis.skip();
        });
    }

    resume() {
        if (consts.client.voiceConnections.get(this.guild))
            consts.client.voiceConnections.get(this.guild).resume();
    }

    pause() {
        if (consts.client.voiceConnections.get(this.guild))
            consts.client.voiceConnections.get(this.guild).pause();
    }

    queue(song) {
        this.songQueue.push(song);
        if (consts.client.voiceConnections.get(this.guild))
            if (consts.client.voiceConnections.get(this.guild).playing)
                return;
        if (this.songQueue.length < 2)
            this.skip();
    }

    getQueue() {
        return this.songQueue;
    }

    destroyNow() {
        this.uid = undefined;
        this.song = undefined;
        this.songQueue = undefined;
        managers.delete(this.guild);
        this.guild = undefined;
    }

    static get(gid) {
        if (!managers.has(gid)) {
            managers.set(gid, new Manager(gid));
        }
        return managers.get(gid);
    }

    static destroy(gid) {
        if (managers.has(gid))
            managers.get(gid).destroyNow();
    }
}

module.exports = Manager;