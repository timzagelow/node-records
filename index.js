require('dotenv').config();

const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cors());
app.options('*', cors());

app.use(function(err, req, res, next) {
    res.status(500).end(err.message);
});

const routes = require('./routes');

app.use('/records', routes);


app.listen(port, () => console.log('Up!'));