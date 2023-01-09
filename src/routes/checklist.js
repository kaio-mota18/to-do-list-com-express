const express = require('express')
const router = express.Router()

const Checklist = require('../models/checklist')

router.get('/checklist', (req, res) => {
  console.log('Passou por checklist')
  res.send()
})

router.post('/checklist', async (req, res) => {
  let { name } = req.body

  try {
    let checklist = await Checklist.create({ name })
    res.status(200).json(checklist)
  } catch (error) {
    res.status(422).json(error)
  }
})

router.get('/checklist/:id', (req, res) => {
  console.log(req.params.id)
  res.send(`ID: ${req.params.id}`)
})

module.exports = router
