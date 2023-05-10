const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'mumin007',
  database: 'auth'
});

module.exports = pool.promise();