const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
    res.json('Hello from Api !')
})

app.listen(port, () => console.log(`App listening on port ${port}`))
