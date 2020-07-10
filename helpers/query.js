function getComparisonOperator(query, search) {
    if (query.conditional === 'operator') {
        if (search.indexOf('>') !== -1) {
            return '>';
        } else if (search.indexOf('<') !== -1) {
            return '<';
        } else if (search.indexOf('..') !== -1) {
            return 'BETWEEN';
        } else {
            return '=';
        }
    } else {
        return query.conditional === 'eq' ? '=' : 'LIKE';
    }
}

module.exports = {
    getComparisonOperator: getComparisonOperator,
};