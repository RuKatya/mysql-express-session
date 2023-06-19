const express = require('express')
const mysql = require('mysql2');
const session = require("express-session")
const MySQLStore = require("express-mysql-session")(session)
const PORT = 5454
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const userData = {
    userName: "Katya",
    pass: "123!@#"
}

const options = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "123123",
    database: "sql_express"
}

const sessionConnect = mysql.createConnection(options)

const sessionStore = new MySQLStore({
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

app.use(session({
    key: "name_of_cookie",
    secret: "some_secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}))

app.use('/login', function (req, res) {
    const { username, password } = req.body
    if (username != userData.username || password != userData.password) {
        return res.status(401).json({
            errror: true,
            message: "Username or Password is invalid"
        })
    }
    else {
        req.session.userinfo = userData.userName
        console.log(req.session)
        res.send("Landing success!")
    }
})

app.use('/', function (req, res) {
    if (req.session.userinfo) {
        res.send("Hello " + req.session.userinfo + " Welcome")
    }
    else {
        res.send("Not Logged In")
    }
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})