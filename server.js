const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const PORT = process.env.PORT
const path = require("path")
const mysql = require("mysql")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))
app.use(express.static(path.join(__dirname, "public")))

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