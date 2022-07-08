const path = require('path')

const express = require('express')

const {sequelize} = require(path.join(__dirname, './models'))
const questionRoutes = require(path.join(__dirname, './routes/questions'))

require('dotenv').config({path: path.join(__dirname, '.env')})

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../ui/views'))


app.use(express.urlencoded())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../ui/public')))

app.use(questionRoutes)


app.listen(process.env.PORT, async () => {
  await sequelize.authenticate()
  console.log('database connected')
})
