const env = require('../../config.js');
const mysql = require('mysql');

let pool = {}
    pool = mysql.createConnection({
        host:env.MYSQL_HOST,
        user:env.MYSQL_USER,
        password:env.MYSQL_PASSWORD,
        database:env.MYSQL_DB
    })
    pool.connect( function onConnect(err) {   // The server is either down
        if (err) {                                  // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
        }                                           // to avoid a hot loop, and to allow our node script to
    });    

    
module.exports = pool;
