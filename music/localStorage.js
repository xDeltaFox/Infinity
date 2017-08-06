const fs = require('fs');
class LocalStorage {
    /**
     * Constructs a new local storage handler.
     * @param file {String} File to load/save from/into
     */
    constructor(file){
        this.file = file;
        this.jsonObject = {};
        if(fs.existsSync(file)){
            try {
                this.jsonObject = JSON.parse(fs.readFileSync(file, 'utf-8'));
            } catch (err){

            }
        }
    }

    /**
     * Sets a key to a value
     * @param key {String} The key to set
     * @param value {Object} The value to set
     */
    set(key, value){
        this.jsonObject[key] = value;
        this.save();
    }

    /**
     * Gets a value under a certain key.
     * @param key {String} Key to look under
     * @return {*} The value
     */
    get(key){
        return this.jsonObject[key];
    }

    save() {
        let json = JSON.stringify(this.jsonObject);
        fs.writeFile(this.file, json, 'utf-8', () => {});
    }
}

module.exports = LocalStorage;