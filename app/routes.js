const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

// tell the router on every url that has /version-01, use the routes file in views/version-01
router.use('/version-01', (req, res, next) => {
  // make sure to pass req, res, next in to the require at the end
  return require('./views/version-01/routes')(req, res, next)
})

// tell the router on every url that has /version-02, use the routes file in views/version-02
router.use('/version-02', (req, res, next) => {
  // make sure to pass req, res, next in to the require at the end
  return require('./views/version-02/routes')(req, res, next)
})

// tell the router on every url that has /version-03, use the routes file in views/version-03
router.use('/version-03', (req, res, next) => {
  // make sure to pass req, res, next in to the require at the end
  return require('./views/version-03/routes')(req, res, next)
})

// tell the router on every url that has /version-03, use the routes file in views/version-03
router.use('/version-04', (req, res, next) => {
  // make sure to pass req, res, next in to the require at the end
  return require('./views/version-04/routes')(req, res, next)
})

module.exports = router
