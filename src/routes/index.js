const express = require('express')
const router = express.Router()

// check the status of server
router.get('/', function (_req, res) {
  res.send('Live!! 👌')
})

module.exports = router
