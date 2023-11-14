const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT
const cors = require('cors')

app.use(cors())

const mysql = require('mysql')
const db = mysql.createConnection({
    // connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    // debug: false,
})

db.connect((err) => {
    if (err) {
        console.error('Error: ' + err.stack)
        return
    }
    console.log('MySql connected')
})

app.get('/', (req, res) => {
    db.query('SELECT 1 + 1 AS solution', (err, results) => {
        if (err) {
            res.status(500).send('Error: ' + err)
            return
        }
        res.send('Test success, 1 + 1 = ' + results[0].solution)
    })
})

app.get('/hello', (req, res) => {
    res.json('Hello from API 😃')
})

const start = () => {
    app.listen(port, () => console.log(`App listening on port ${port}`))
}

start()
