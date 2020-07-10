let aliases = require('../aliases');
let queries = require('../queries');
let queryHelper = require('./query');

function buildSelect() {
    let selects = [];

    for (let column in aliases) {
        selects.push(`${column} AS \`${aliases[column]}\``);
    }

    return selects.join(', ');
}

function buildJoins(params) {
    let joins = [];

    return joins.join(' ');
}

function buildWhere(params) {
    let wheres = [];

    wheres.push('InventoryNo IS NOT NULL ');

    for (let i in params) {
        queries.forEach(query => {
            if (i === query.param && params[i].length) {
                let where = '';

                if (query.field.indexOf('.') !== -1) {
                    where += `AND ${query.field} `;
                } else {
                    where += `AND ${process.env.MYSQL_RECORDS_TABLE}.${query.field} `;
                }

                let comparisonOperator = queryHelper.getComparisonOperator(query, params[i]);

                where += comparisonOperator + ` `;

                params[i] = removeSpecialChars(params[i]);

                if (!query.type) {
                    query.type = 'string';
                }

                if (comparisonOperator === 'BETWEEN') {
                    let range = params[i].split('..');
                    where += `'${range[0]}' AND '${range[1]}' `;
                } else if (query.type === 'number') {
                    where += `${params[i]} `;
                } else {
                    where += `'`;

                    if (query.conditional === 'match') {
                        where += `%`;
                    }

                    where += `${params[i]}`;

                    if (query.conditional === 'match' || query.conditional === 'matchend') {
                        where += `%`;
                    }

                    where += `' `;
                }

                wheres.push(where);
            }
        });
    }

    console.log(wheres);

    return wheres.join(' ');
}

function removeSpecialChars(text) {
    text = text.replace('>', '');
    text = text.replace('<', '');

    return text;
}

function parse(results) {
    let records = [];

    results.forEach(result => {
        if (result.imageUrls && result.imageUrls.length) {
            result.imageUrls = result.imageUrls.split(',');

            for (let i in result.imageUrls) {
                result.imageUrls[i] = prepareImageUrl(result.imageUrls[i]);
            }
        }

        if (result.clipUrls && result.clipUrls.length) {
            result.clipUrls = result.clipUrls.split(',');
        }

        records.push(result);
    });

    return records;
}

function prepareImageUrl(url) {
    let newUrl;

    if (url.indexOf('http://') === -1) {
        newUrl = process.env.IMAGE_BASE_URL + url;

        if (newUrl.indexOf('../../../') !== -1 || newUrl.indexOf('../../') !== -1) {
            newUrl = newUrl.replace('../../../', '');
            newUrl = newUrl.replace('../../', '');
            newUrl = newUrl.replace(' ', '%20');
        }
    } else {
        newUrl = url;
    }

    if (newUrl.indexOf(process.env.IMAGE_BASE_URL) === -1) {
        newUrl = process.env.IMAGE_BASE_URL + newUrl;
    }

    return newUrl;
}

module.exports = {
    buildSelect: buildSelect,
    buildWhere: buildWhere,
    parse: parse,
};