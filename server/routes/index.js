const express = require('express')

const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  res.status(404).end()
  console.log(123)
})

module.exports = router
