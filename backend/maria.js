const maria = require('mysql');
const conn = maria.createConnection({
    host:'localhost',
    port:3307,
    user:'mintai',
    password:'1029',
    database:'multiplex'
});
module.exports = conn;