const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000
const path = require("path")
const mysql = require("mysql")
const ejs = require("ejs")
const bodyParser = require("body-parser")

require("dotenv").config()
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))
app.use(express.static(path.join(__dirname, "public")))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/projects", (request, response, next) => {
    response.render("projects.ejs")
})

app.get("/gallery", (request, response, next) => {
    response.render("gallery.ejs")
})

app.get("/contacts", (request, response, next) => {
    response.render("contacts.ejs")
})

app.get("/", (request, response, next) => {
    response.render("home.ejs")
})

// ======= handle error for when page not found =========
app.use((request, response, next) => {
    response.status(404).send("<h1> Page not found </h1>")
})

app.listen(PORT, () => {
    console.log(`Server is listenning on PORT: 5000`)
})