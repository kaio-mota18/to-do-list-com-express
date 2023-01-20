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

// Rota utilizada para inserir dados no banco

router.post('/', async (req, res) => {
  //utilizou de função assíncrona para não ter que ficar passando THEN e CATCH
  let { name } = req.body.checklist // isso é correspodnendo a colocar 'req.body['name']'
  let checklist = new Checklist({ name })

  try {
    await checklist.save()
    res.redirect('/checklists')
  } catch (error) {
    res
      .status(422)
      .render('checklists/new', { checklists: { ...checklist.error } })
  }
})

// rota do formulário de novas checklists. Por ora, não há modificação no banco de dados.

router.get('/new', async (req, res) => {
  try {
    let checklist = new Checklist()
    res.status(200).render('checklists/new', { checklist: checklist })
  } catch (error) {
    res
      .status(500)
      .render('checklists/error', { errors: 'Erro ao carregar o formulário' })
  }
})

//rota para acessar a página de edição de formulário

router.get('/:id/edit', async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id)
    res.status(200).render('checklists/edit', { checklist: checklist })
  } catch (error) {
    res.status(422).render('checklists/error', {
      errors: 'Erro ao tentar editar a coleção de tarefas'
    })
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

// Rota para atualizar um elemento específico do banco de dados

router.put('/:id', async (req, res) => {
  let { name } = req.body.checklist
  let checklist = await Checklist.findById(req.params.id)
  try {
    await checklist.update({ name })
    res.status(200).redirect('/checklists')
  } catch (error) {
    let erros = error.errors
    res
      .status(422)
      .render('checklists/edit', { checklist: { ...checklist, errors } })
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
