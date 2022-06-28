const express = require("express")
const app = express()
const PORT = 5000
const path = require("path")

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

app.listen(PORT, () => {
    console.log(`Server is listenning on PORT: ${PORT}`)
})