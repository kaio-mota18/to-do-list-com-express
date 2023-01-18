const express = require('express') // importando o express
const router = express.Router() //importação da função que cria o roteador de rotas

const Checklist = require('../models/checklist') //estou importando o modelo Checklist com o seu caminho correspondente

// Rota INDEX utilizada para retornar todas as coleções listadas (checklists)

router.get('/', async (req, res) => {
  try {
    //ele vai tentar algo
    let checklists = await Checklist.find({})
    res.status(200).render('checklists/index.ejs', { checklists: checklists }) // a resposta em res é o status confirmando o sucesso e renderizando a página que se enconta no caimnho checklists/index com um parâmetro de checklists = checklists
  } catch (error) {
    res
      .status(200)
      .render('pages/error', { error: 'Erro ao tentar exibir as listas' })
  }
})

// Rota utilizada para selecionar uma coleção específica, no caso, a chave utilizada é o 'name'

router.get('/:id', async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id)
    res.status(200).render('checklists/show', { checklist: checklist })
  } catch (error) {
    res.status(200).render('pages/error', {
      error: 'Erro ao tentar exibir as listas de tarefas'
    })
  }
})

// Rota utilizada para inserir dados no banco

router.post('/', async (req, res) => {
  //utilizou de função assíncrona para não ter que ficar passando THEN e CATCH
  let { name } = req.body // isso é correspodnendo a colocar 'req.body['name']'

  try {
    let checklist = await Checklist.create({ name }) // a variável checklist vai receber a resposta da criação no banco de dados usando o modelo Checklist que foi importado acima, o parâmetro de criação é justamente name que foi recolhido da requisição
    res.status(200).json(checklist)
  } catch (error) {
    res.status(422).json(error)
  }
})

// Rota para atualizar um elemento específico do banco de dados

router.put('/:id', async (req, res) => {
  let { name } = req.body

  try {
    let checklist = await Checklist.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    ) //O último parâmetro é só para ocntrolar o retorno e garantir que seja o retorno com o elemento novo que foi atualziado
    res.status(200).json(checklist)
  } catch (error) {
    res.status(422).json(error)
  }
})

// Rota utilizada para deletar um elemento específico do banco de dados.

router.delete('/:id', async (req, res) => {
  try {
    let checklistDeleted = await Checklist.findByIdAndRemove(req.params.id)
    res.status(200).json(checklistDeleted)
  } catch (error) {
    res.status(422).json(error)
  }
})

module.exports = router
