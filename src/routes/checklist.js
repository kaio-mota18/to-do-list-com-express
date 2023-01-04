const express = require('express')
const router = express.Router()

router.get('/checklist', (req, res) => {
  console.log('Passou por checklist')
  res.send()
})

router.post('/checklist', (req, res) => {
  console.log(req.body)
  res.status(200).json(req.body)
})

router.get('/checklist/:id', (req, res) => {
  console.log(req.params.id)
  res.send(`ID: ${req.params.id}`)
})

module.exports = router
