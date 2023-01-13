const express = require('express') // importando o express
const router = express.Router() //importação da função que cria o roteador de rotas

const Checklist = require('../models/checklist') //estou importando o modelo Checklist com o seu caminho correspondente

router.get('/', async (req, res) => {
  //quando na rota / for feito uma requisição do tipo GET, no meu console será informado que passou por checklist
  try {
    let checklist = await Checklist.find({})
    res.status(200).json(checklist)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.post('/', async (req, res) => {
  //utilizou de função assíncrona para não ter que ficar passando THEN e CATCH
  let { name } = req.body // isso é correspodnendo a colocar 'req.body['name']'

  try {
    //ele vai tentar algo
    let checklist = await Checklist.create({ name }) // a variável checklist vai receber a resposta da criação no banco de dados usando o modelo Checklist que foi importado acima, o parâmetro de criação é justamente name que foi recolhido da requisição
    res.status(200).json(checklist) // a resposta em res é o status confirmando o sucesso e mandando o json com o que foi criado no banco de dados com o modelo Checklist
  } catch (error) {
    res.status(422).json(error)
  }
})

router.get('/:id', async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id)
    res.status(200).json(checklist)
  } catch (error) {
    res.status(422).json(error)
  }
})

module.exports = router
