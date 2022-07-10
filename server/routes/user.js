const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

router.get("/", userController.home)
router.get("/gallery", userController.gallery)
router.get("/projects", userController.projects)

//contact page
//create, find, update, delete
router.get("/contact", userController.view)
router.post("/contact", userController.find)
router.get("/add-info", userController.form)
router.post("/add-info", userController.create)
router.get("/edit-info/:id", userController.edit)
router.post("/edit-info/:id", userController.update)
router.get("/view-info/:id", userController.viewAll)
router.get("/contact/:id", userController.delete)

//nodemailer
router.post("/send", userController.send)

module.exports = router