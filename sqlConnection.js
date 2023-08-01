const session = require("express-session")
const MySQLStore = require("express-mysql-session")(session)
const mysql = require('mysql2');

const options = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "123123",
    database: "sql_express"
}

const sessionConnect = mysql.createConnection(options)

exports.sessionStore = new MySQLStore({
    expiration: 10800000,
    createDatabaseTable: true,
    schema: {
        tableName: 'sessiontbl',
        columnNames: {
            session_id: 'sesssion_id',
            expires: 'expires',
            data: 'data'
        }
    }
}, sessionConnect)