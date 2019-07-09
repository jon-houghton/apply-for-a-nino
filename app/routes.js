const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

router.post('/plan-to-work-answer', function (req,res) {

  // Make a variable and give it the value from 'plan-to-work'
  var planToWork = req.session.data['plan-to-work']

  // Check whether the variable matches a condition
  if (planToWork == "Yes"){
    // Send user to next page
    res.redirect("version-02/q03-name")
  }
  else {
    // Send user to ineligible page
    res.redirect("version-02/ineligible")
  }

})

router.post('/in-work-answer', function (req,res) {

  // Make a variable and give it the value from 'plan-to-work'
  var inWork = req.session.data['in-work']

  // Check whether the variable matches a condition
  if (inWork == "Yes"){
    // Send user to next page
    res.redirect("version-02/q03-name")
  }
  else {
    // Send user to ineligible page
    res.redirect("version-02/q02-plan-to-work")
  }

})

router.post('/any-other-names', function (req,res) {

  // Make a variable and give it the value from 'plan-to-work'
  var anyOtherNames = req.session.data['any-other-names']

  // Check whether the variable matches a condition
  if (anyOtherNames == "yes"){
    // Send user to next page
    res.redirect("version-02/q04-1-other-names-placeholder")
  }
  else {
    // Send user to ineligible page
    res.redirect("version-02/q05-date-of-birth")
  }

})

module.exports = router
