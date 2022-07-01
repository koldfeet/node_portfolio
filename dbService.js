const mysql = require("mysql")
const dotenv = require("dotenv").config()
const instance = null;

const connection = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: "",
    port: 3306
})

connection.connect((err) => {
    if (err) {
        console.log(err.message)
    }
    console.log("DB is now " + connection.state + " !")
})

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService()
    }
    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names;"

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })

            console.log(response)
            return response

        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = DbService