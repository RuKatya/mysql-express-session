const express = require('express')
const session = require("express-session");
const { sessionStore } = require('./sqlConnection');
const { userData } = require('./data');
const PORT = 5454
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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
    } else {
        req.session.userinfo = userData
        req.session.isAuthenticates = true
        console.log(req.session)
        res.send("Landing success!")
    }
})

app.use('/', function (req, res) {
    if (req.session.userinfo) {
        res.send("Hello " + req.ession.userinfo + " Welcome")
    } else { res.send("Not Logged In") }
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})