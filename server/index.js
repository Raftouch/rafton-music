const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT

const mysql = require('mysql')
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'music-app',
})

db.connect(() => {
  console.log('MySql connected')
})

app.get('/', (req, res) => {
  res.json('Hello from Api !')
})

app.listen(port, () => console.log(`App listening on port ${port}`))
