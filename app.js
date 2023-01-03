const express = require('express')

const app = express()
const porta = 3000

app.get('/json', (req, res) => {
  res.json({ title: 'tarefa exemplo', done: true })
})

app.get('/', (req, res) => {
  res.send('<h1>Lista de tarefas :D</h1>')
})

app.listen(porta, () => {
  console.log(`App example funcionando na porta ${porta}`)
})
