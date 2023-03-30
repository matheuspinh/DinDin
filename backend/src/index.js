const express = require('express')
require('dotenv').config()
const rotas = require('./router')
const cors = require('cors')

const app = express()

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(rotas)

const port = process.env.PORT || 3000
app.listen(3000)