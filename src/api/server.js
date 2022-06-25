const path = require('path')

const express = require('express')
require('dotenv').config({path: path.join(__dirname, '.env')})

const app = express()

app.set('view engine', 'pug')

app.use(express.static(path.join))


app.listen(process.env.PORT)
