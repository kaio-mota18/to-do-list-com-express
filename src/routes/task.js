const express = require('express')
const checklistDependentRoute = express.Router()
const simpleRoute = express.Router()

const Checklist = require('../models/checklist')
const Task = require('../models/tasks')

checklistDependentRoute.get('/:id/tasks/new', async (req, res) => {
  try {
    const task = Task()
    res
      .status(200)
      .render('tasks/new', { checklistId: req.params.id, task: task })
  } catch (error) {
    res
      .status(422)
      .render('pages/error', { errors: 'Erro ao carregar o formulário.' })
  }
})

simpleRoute.delete('/:id', async (req, res) => {
  try {
    let task = Task.findByIdAndDelete(req.params.id)
    let checklist = Checklist.findById(task.checklist)
    let taskToRemove = checklist.tasks.indexOf(task._id)
    checklist.tasks.splice(taskToRemove, 1)
    checklist.save()
    res.redirect(`/checklists/${checklist._id}`)
  } catch (error) {
    res
      .status(422)
      .render('pages/error', {
        errors: 'Erro ao carregar ao deletar a tarefa.'
      })
  }
})

checklistDependentRoute.post('/:id/tasks', async (req, res) => {
  const { name } = req.body.task
  const task = new Task({ name, checklist: req.params.id })
  try {
    await task.save()
    const checklist = await Checklist.findById(req.params.id)
    checklist.tasks.push(task)
    await checklist.save()
    res.redirect(`/checklists/${req.params.id}`)
  } catch (error) {
    const errors = error.errors
    res.status(422).render('tasks/new', {
      task: { ...task, errors },
      checklistId: req.params.id
    })
  }
})

module.exports = {
  checklistDependent: checklistDependentRoute,
  simple: simpleRoute
}
