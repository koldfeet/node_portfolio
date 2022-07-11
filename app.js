const express = require("express")
const mysql = require("mysql")
const bodyParser = require("body-parser")
const exphbs = require("express-handlebars")
const dotenv = require("dotenv")
const nodemailer = require("nodemailer")

require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 5000

//parsing middleware
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//parse application/json
app.use(bodyParser.json())

//static files
app.use(express.static("public"))

//templating engine handlebars to .hbs
app.engine("hbs", exphbs.engine({ extname: ".hbs" }))
app.set("view engine", "hbs")

// //connection to db pool
// const pool = mysql.createPool({
//     connectionLimit: 100,
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME
// })

////connection to clearDB on HEROKU
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.HEROKU_HOST,
    user: process.env.HEROKU_USER,
    password: process.env.HEROKU_PASSWORD,
    database: process.env.HEROKU_DATABASE
})

// connect to db
pool.getConnection((err, connection) => {
    if (err) throw err
    console.log("Connected as ID " + connection.threadId)
})

//routes
const routes = require("./server/routes/user")
app.use("/", routes)

app.listen(PORT, (err) => {
    if (err) throw err
    console.log(`Server is listenning on PORT: ${PORT}`)
})