const express = require("express")
const mysql = require("mysql")
const bodyParser = require("body-parser")
const exphbs = require("express-handlebars")

const app = express()
const PORT = process.env.PORT || 5000

//parsing middleware
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//parse application/json
app.use(bodyParser.json())

//static files
app.use(express.static("public"))

//templating engine
app.engine("hbs", exphbs.engine({ extname: ".hbs" }))
app.set("view engine", "hbs")

//connection to db pool


// connect to db
pool.getConnection((err, connection) => {
    if (err) throw err
    console.log("Connected as ID " + connection.threadId)
})

//routes
const routes = require("./server/routes/user")
app.use("/", routes)

app.listen(PORT, () => {
    console.log(`Server is listenning on PORT: ${PORT}`)
})