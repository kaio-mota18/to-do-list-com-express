const express = require('express')
const app = express()

const checkListRouter = require('./src/routes/checklist')
require('./config/database')

app.use(express.json())
app.use('./checklists', checkListRouter)

const porta = 3000
app.listen(porta, () => {
  console.log(`App example funcionando na porta ${porta}`)
})
