const express = require('express')
require('dotenv').config()
const rotas = require('./router')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
app.use(rotas)

const port = process.env.PORT || 3000
app.listen(port)