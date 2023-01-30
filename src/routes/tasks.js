const express = require('express')
const router = express.Router()

const checklistDependentRoute = require('../models/checklist')
const Task = require('../models/tasks')

router.get('/:id/tasks/new', async (req, res) => {
  try {
    let task = Task()
    res
      .status(200)
      .redner('tasks/new', { checklistId: req.params.id, tasks: task })
  } catch (error) {
    res.status(422).render('pages/error', {
      errors: 'Erro ao carregar o formulário de tarefas'
    })
  }
})

router.post('/:id/tasks', async (req, res) => {
  let { name } = req.body.task
  let task = new Task({ name, checklist: req.params.id })
  try {
    await task.save()
    let checklist = await Checklist.findById(req.params.id)
    checklist.tasks.push(task)
  } catch (error) {
    let errors = error.errors
    res
      .status(422)
      .render('tasks/new', {
        task: { ...task, errors },
        checklist: req.params.id
      })
  }
})

module.exports = { checklistDependent: checklistDependentRoute }
