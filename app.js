const express = require('express') // biblioteca para importar o express e abrir meu servidor
const path = require('path') //biblioteca que serve para juntar caminhos ?
const methodOverride = require('method-override')

const app = express()

const checkListRouter = require('./src/routes/checklist') //a rota do documento checklist.js sendo importada na variável checklistRouter
const taskRouter = require('./src/routes/task')

const rootRouter = require('./src/routes/index') //a rota responsável por renderizar minhas views sendo importada em rootRouter

require('./config/database') //importação das configurações do mongoose com o mongo no documento databse

app.use(express.json()) //usando o método json() existente no express
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }))

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'src/views')) //aqui estou configurando que as views estarão no diretório que se encontra no caminho src/views
app.set('view engine', 'ejs') // aqui esotu configurando qual o tipo de engine que esotu utilizando

app.use('/', rootRouter) // Estou usando as funções encontradas no documento de rotas
app.use('/checklists', checkListRouter)
app.use('/checklists', taskRouter.checklistDependent)
app.use('/tasks', taskRouter.simple)

const porta = 3000 //servidor
app.listen(porta, () => {
  console.log(`App example funcionando na porta ${porta}`)
})
