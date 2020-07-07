let aliases = require('../aliases');

function build() {
    let selects = [];

    for (let column in aliases) {
        selects.push(`${column} AS \`${aliases[column]}\``);
    }

    return selects.join(', ');
}

module.exports = {
    build: build
};