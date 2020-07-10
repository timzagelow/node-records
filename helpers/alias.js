let aliases = require('../aliases');

function findKeyByAlias(alias) {
    for (let key in aliases) {
        if (alias === aliases[key]) {
            return key;
        }
    }
}

module.exports = {
    findKeyByAlias: findKeyByAlias,
};