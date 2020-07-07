require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

let db = require('./db');
let selector = require('./helpers/selector');

app.get('/', (req, res) => {
    db.then((connection => {

        let selectString = selector.build();

        connection.query(`SELECT ${selectString} FROM ${process.env.MYSQL_RECORDS_TABLE} LIMIT 10`, (error, results, fields) => {
            if (error) {
                console.log(error);
                return;
            }

            let records = selector.parse(results);

            res.send(records);
        });
    }));
});

app.listen(port, () => console.log('Up!'));