const mysql = require("mysql")
const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
require('dotenv').config()

//connection to db pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

//contact page nodemailer form 
exports.send = (req, res) => {
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
        <li>${req.body.name}</li>
        <li>${req.body.company}</li>
        <li>${req.body.email}</li>
        <li>${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        // host: "smtp.ethereal.email",
        // port: 587,
        secure: false, // true for 465, false for other ports
        service: "hotmail",
        auth: {
            user: process.env.MAILER_EMAIL, // generated ethereal user
            pass: process.env.MAILER_PW, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let mailOptions = {
        from: '"Nodemailer Contact" <chris.tr88@outlook.com>', // sender address
        to: process.env.MAILER_EMAIL, // list of receivers
        subject: "Node Contact Request", // Subject line
        text: "Hello world?", // plain text body
        html: output, // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.render("contact.hbs", { msg: "Email has been sent" })
    })
}


//rendering home page
exports.home = (req, res) => {
    res.render("home.hbs")
}

//rendering gallery page
exports.gallery = (req, res) => {
    res.render("gallery.hbs")
}

//rendering project page
exports.projects = (req, res) => {
    res.render("projects.hbs")
}

// view user
exports.view = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log("Connected as ID " + connection.threadId)
        // user connection
        connection.query("SELECT * FROM client_management.client", (err, rows) => {
            // when done with the connection, release it
            connection.release()

            if (!err) {
                let removedUser = req.query.removed
                res.render("contact.hbs", { rows, removedUser })
            } else {
                console.log(err)
            }

            // console.log("The data from user table: \n", rows)
        })
    })
}

// find user by search
exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log("Connected as ID " + connection.threadId)

        let searchTerm = req.body.search

        // user connection
        connection.query("SELECT * FROM client_management.client WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ?", ["%" + searchTerm + "%", "%" + searchTerm + "%", "%" + searchTerm + "%"], (err, rows) => {
            // when done with the connection, release it
            connection.release()

            if (!err) {
                res.render("contact.hbs", { rows })
            } else {
                console.log(err)
            }

            // console.log("The data from user table: \n", rows)
        })
    })
}

// ADD info
exports.form = (req, res) => {
    res.render("add-info")
}

// add new information
exports.create = (req, res) => {
    const { first_name, last_name, email, comments } = req.body
    // res.render("add-info")

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log("Connected as ID " + connection.threadId)

        let searchTerm = req.body.search

        // user connection
        connection.query("INSERT INTO client SET first_name = ?, last_name = ? , email = ?, comments = ?", [first_name, last_name, email, comments], (err, rows) => {
            // when done with the connection, release it
            connection.release()

            if (!err) {
                res.render("add-info.hbs", { alert: "Infomation added successfully" })
            } else {
                console.log(err)
            }

            // console.log("The data from user table: \n", rows)
        })
    })
}

// edit user
exports.edit = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log("Connected as ID " + connection.threadId)
        // user connection

        connection.query("SELECT * FROM client_management.client WHERE id = ?", [req.params.id], (err, rows) => {
            // when done with the connection, release it
            connection.release()

            if (!err) {
                res.render("edit-info.hbs", { rows })
            } else {
                console.log(err)
            }

            // console.log("The data from user table: \n", rows)
        })
    })
}

// edit user submit btn
exports.update = (req, res) => {
    const { first_name, last_name, email, comments } = req.body

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log("Connected as ID " + connection.threadId)
        // user connection

        connection.query("UPDATE client_management.client SET first_name = ?, last_name = ?, email = ?, comments = ? WHERE id = ?", [first_name, last_name, email, comments, req.params.id], (err, rows) => {
            // when done with the connection, release it
            connection.release()

            if (!err) {

                pool.getConnection((err, connection) => {
                    if (err) throw err
                    console.log("Connected as ID " + connection.threadId)
                    // user connection

                    connection.query("SELECT * FROM client_management.client WHERE id = ?", [req.params.id], (err, rows) => {
                        // when done with the connection, release it
                        connection.release()

                        if (!err) {
                            res.render("edit-info.hbs", { rows, alert: `${first_name} ${last_name} has been updated.` })
                        } else {
                            console.log(err)
                        }

                        // console.log("The data from user table: \n", rows)
                    })
                })

            } else {
                console.log(err)
            }

            // console.log("The data from user table: \n", rows)
        })
    })
}

//delete btn
exports.delete = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log("Connected as ID " + connection.threadId)
        // user connection

        connection.query("DELETE FROM client_management.client WHERE id = ?", [req.params.id], (err, rows) => {
            // when done with the connection, release it
            connection.release()

            if (!err) {
                let removedUser = encodeURIComponent("Information successfully removed.")
                res.redirect("/contact?removed=" + removedUser)
            } else {
                console.log(err)
            }

            // console.log("The data from user table: \n", rows)
        })
    })
}

//view btn
exports.viewAll = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log("Connected as ID " + connection.threadId)
        // user connection
        connection.query("SELECT * FROM client_management.client WHERE id = ?", [req.params.id], (err, rows) => {
            // when done with the connection, release it
            connection.release()

            if (!err) {
                res.render("view-info.hbs", { rows })
            } else {
                console.log(err)
            }

            // console.log("The data from user table: \n", rows)
        })
    })
}