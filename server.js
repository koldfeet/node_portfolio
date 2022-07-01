const express = require("express")
const app = express()
const cors = require("cors") //make api calls from frontend to backend
const dotenv = require("dotenv").config()
const PORT = process.env.PORT
const path = require("path")
const mysql = require("mysql")
const dbService = require("./dbService.js") //import dbService page
const { response } = require("express")


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))
app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
    res.render("home.ejs")
})

app.get("/projects", (req, res) => {
    res.render("projects.ejs")
})

app.get("/gallery", (req, res) => {
    res.render("gallery.ejs")
})

// ======== contact routes START "CRUD" =========
app.get("/contacts", (req, res) => {
    res.render("contacts.ejs")
})

//create
app.post("/insert", (req, res) => {

})

//read
app.get("/getAll", (req, res) => {
    const db = dbService.getDbServiceInstance()

    const result = db.getAllData()

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err))
})


// ======== contact routes END "CRUD" =========

app.listen(PORT, () => {
    console.log(`Server is listenning on PORT: 5000`)
})