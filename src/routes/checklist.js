const express = require('express')
const router = express.Router()

router.get('/checklist', (req, res) => {
  console.log('Passou por checklist')
  res.send()
})

module.exports = router
