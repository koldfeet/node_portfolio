const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const PORT = process.env.PORT
const path = require("path")
const mysql = require("mysql")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))
app.use(express.static(path.join(__dirname, "public")))

app.get("/", (request, response) => {
    response.render("home.ejs")
})

app.get("/projects", (request, response) => {
    response.render("projects.ejs")
})

app.get("/gallery", (request, response) => {
    response.render("gallery.ejs")
})

// ======== contact routes START "CRUD" =========
app.get("/contacts", (request, response) => {
    response.render("contacts.ejs")
})



// ======== contact routes END "CRUD" =========

app.listen(PORT, () => {
    console.log(`Server is listenning on PORT: 5000`)
})