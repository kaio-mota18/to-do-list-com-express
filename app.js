const express = require('express')
const checkListRouter = require('./src/routes/checklist')
require('./config/database')

const app = express()
const porta = 3000
app.use(express.json())

app.use(checkListRouter)

app.listen(porta, () => {
  console.log(`App example funcionando na porta ${porta}`)
})
