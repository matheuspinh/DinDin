const express = require('express')
const rotas = require('./router')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(rotas)

app.listen(3000)