// Damn generic name
module.exports = {
    getURLParams: (url) => {
        "use strict";
        if(typeof(url) === 'string'){
            if(url.includes('?')){
                let ret = {};
                url = url.substring(url.indexOf('?') + 1);
                for(let kvPair of url.split('&')){
                    if(!kvPair.includes('=')){
                        ret[kvPair] = '';
                        continue;
                    }
                    let pair = kvPair.split('=');
                    ret[pair[0]] = decodeURIComponent(pair[1]);
                }
                return ret;
            } else return {};
        }
    }
};
