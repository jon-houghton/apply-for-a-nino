const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

router.post('/plan-to-work-answer', function (req,res) {

  // Make a variable and give it the value from 'plan-to-work'
  var planToWork = req.session.data['plan-to-work']

  // Check whether the variable matches a condition
  if (planToWork == "yes"){
    // Send user to next page
    res.redirect("/eligible")
  }
  else {
    // Send user to ineligible page
    res.redirect("/q02-in-work")
  }

})

router.post('/in-work-answer', function (req,res) {

  // Make a variable and give it the value from 'plan-to-work'
  var inWork = req.session.data['in-work']

  // Check whether the variable matches a condition
  if (inWork == "yes"){
    // Send user to next page
    res.redirect("/eligible")
  }
  else {
    // Send user to ineligible page
    res.redirect("/ineligible")
  }

})

router.get('/go-back', function(req, res) {
    if (req.query.prev_page === 'q01-plan-to-work'){
      res.render('/q01-plan-to-work');
    } else if(req.query.prev_page === 'q02-in-work'){
      res.render('/q02-in-work');
    } e
});

module.exports = router
