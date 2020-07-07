const mysql = require('mysql2');
// const Client = require('ssh2').Client;
// const ssh = new Client();
//
// let db = new Promise((resolve, reject) => {
//     ssh.on('ready', () => {
//         ssh.forwardOut('127.0.0.1', process.env.SSH_SOURCE_PORT, '127.0.0.1', 3306, (err, stream) => {
//             if (err) throw err;
//
//             let connection = mysql.createConnection({
//                 host: process.env.MYSQL_HOST,
//                 user: process.env.MYSQL_USER,
//                 password: process.env.MYSQL_PASSWORD,
//                 database: process.env.MYSQL_DB,
//                 stream: stream,
//             });
//
//             connection.connect((err) => {
//                 if (!err) {
//                     resolve(connection);
//                 } else {
//                     reject(err);
//                 }
//             });
//         });
//     }).connect({
//         host: process.env.SSH_HOST,
//         port: process.env.SSH_PORT,
//         username: process.env.SSH_USER,
//         password: process.env.SSH_PASSWORD,
//     });
// });

let db = new Promise((resolve, reject) => {
    let connection = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB
        });

    connection.connect((err) => {
        if (!err) {
            resolve(connection);
        } else {
            reject(err);
        }
    });
});


module.exports = db;