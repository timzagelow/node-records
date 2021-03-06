const routes = require('express').Router();
let db = require('./db');
let aliasHelper = require('./helpers/alias');
const { BadRequest, GeneralError } = require('./helpers/errors');

routes.put('/:id', (req, res, next) => {
    let updates = {};
    let item = req.body;

    try {
        if (!item) {
            throw new BadRequest('No fields to update');
        }

        for (let alias in item) {
            let key = aliasHelper.findKeyByAlias(alias);

            if (key) {
                updates[key] = item[alias];
            }
        }

        if (!updates.length) {
            throw new BadRequest('No fields to update');
        }

        let update = `UPDATE ${process.env.MYSQL_RECORDS_TABLE} SET `;
        let values = [];

        for (let key in updates) {
            update += `\`${key}\` = ?, `;
            values.push(updates[key]);
        }

        update = update.slice(0, -2);
        update += ` WHERE InventoryNo = ${req.params.id}`;

        db.then((connection => {
            connection.execute(update, values, (err) => {
                if (err) {
                    throw new GeneralError(err.message);
                }

                res.sendStatus(200);
            });
        }));
    } catch (err) {
        next(err);
    }
});

routes.get('/', (req, res) => {
    let selector = require('./helpers/selector');

    db.then((connection => {

        let selectString = selector.buildSelect();
        let whereString = selector.buildWhere(req.query);

        connection.query(`SELECT ${selectString} FROM ${process.env.MYSQL_RECORDS_TABLE}
                          WHERE ${whereString} 
                          LIMIT 500`, (error, results, fields) => {
            if (error) {
                console.log(error);
                return;
            }

            let records = selector.parse(results);

            res.send(records);
        });
    }));
});

module.exports = routes;