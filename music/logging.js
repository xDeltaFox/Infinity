const fs = require('fs');
const sysout = console.log;
const syserr = console.error;
const info = console.info;
let logFile = './latest.log';

const toFile = log => {
    if (logFile)
        fs.appendFile(logFile, log + '\n', () => {
        });
};
const out = log => {
    sysout(log);
    toFile(log);
};

/**
 * Sets `console.log`, `console.error` and `console.info`
 */
const hook = () => {
    toFile(logFile, `--- NEW ${new Date()} NEW ---\n\t`);
    console.log = log => {
        let d = new Date();
        log = `[${d.toString()} LOG] ${log}\t`;
        out(log);
    };
    console.info = log => {
        let d = new Date();
        log = `[${d.toString()} INFO] ${log}\t`;
        info(log);
    };
    console.error = log => {
        let d = new Date();
        log = `[${d.toString()} ERROR] ${log}\n\t`;
        out(log);
    };
};

/**
 * Resets `console.log`, `console.error` and `console.info`
 */
const unhook = () => {
    console.log = sysout;
    console.error = syserr;
    console.info = info;
};

module.exports = {
    sysout: sysout, toFile: toFile, out: out, setFile: (file) => {
        "use strict";
        logFile = file;
    }, hook: hook, unhook: unhook
};