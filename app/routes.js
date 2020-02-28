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

// tell the router on every url that has /version-04, use the routes file in views/version-04
router.use('/version-04', (req, res, next) => {
  // make sure to pass req, res, next in to the require at the end
  return require('./views/version-04/routes')(req, res, next)
})

// tell the router on every url that has /version-05, use the routes file in views/version-05
router.use('/version-05', (req, res, next) => {
  // make sure to pass req, res, next in to the require at the end
  return require('./views/version-05/routes')(req, res, next)
})

// tell the router on every url that has /version-06, use the routes file in views/version-06
router.use('/version-06', (req, res, next) => {
  // make sure to pass req, res, next in to the require at the end
  return require('./views/version-06/routes')(req, res, next)
})

// tell the router on every url that has /version-07, use the routes file in views/version-07
router.use('/version-07', (req, res, next) => {
  // make sure to pass req, res, next in to the require at the end
  return require('./views/version-07/routes')(req, res, next)
})

// tell the router on every url that has /version-08, use the routes file in views/version-08
router.use('/version-08', (req, res, next) => {
  // make sure to pass req, res, next in to the require at the end
  return require('./views/version-08/routes')(req, res, next)
})

// tell the router on every url that has /version-09, use the routes file in views/version-09
router.use('/version-09', (req, res, next) => {
  // make sure to pass req, res, next in to the require at the end
  return require('./views/version-09/routes')(req, res, next)
})

// tell the router on every url that has /version-10, use the routes file in views/version-10
router.use('/version-10', (req, res, next) => {
  // make sure to pass req, res, next in to the require at the end
  return require('./views/version-10/routes')(req, res, next)
})

// tell the router on every url that has /version-11, use the routes file in views/version-11
router.use('/version-11', (req, res, next) => {
  // make sure to pass req, res, next in to the require at the end
  return require('./views/version-11/routes')(req, res, next)
})

// tell the router on every url that has /version-12, use the routes file in views/version-12
router.use('/version-12', (req, res, next) => {
  // make sure to pass req, res, next in to the require at the end
  return require('./views/version-12/routes')(req, res, next)
})

// tell the router on every url that has /version-13, use the routes file in views/version-13
router.use('/version-13', (req, res, next) => {
  // make sure to pass req, res, next in to the require at the end
  return require('./views/version-13/routes')(req, res, next)
})

// tell the router on every url that has /version-14, use the routes file in views/version-14
router.use('/version-14', (req, res, next) => {
  // make sure to pass req, res, next in to the require at the end
  return require('./views/version-14/routes')(req, res, next)
})
module.exports = router
