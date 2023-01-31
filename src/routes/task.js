const express = require('express')
const router = express.Router()

const ChecklistDependentRoute = require('../models/checklist')
const Task = require('../models/tasks')

router.get('/:id/tasks/new', async (req, res) => {
  try {
    const task = new Task()
    res
      .status(200)
      .render('tasks/new', { checklistId: req.params.id, task: task })
  } catch (error) {
    res.status(500).render('pages/error', { error: 'Error loading form.' })
  }
})

router.post('/:id/tasks', async (req, res) => {
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

module.exports = { checklistDependent: ChecklistDependentRoute }
