const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

router.post('/plan-to-work-answer', function (req,res) {

  // Make a variable and give it the value from 'plan-to-work'
  var planToWork = req.session.data['plan-to-work']

  // Check whether the variable matches a condition
  if (planToWork == "Yes"){
    // Send user to next page
    res.redirect("q03-name")
  }
  else {
    // Send user to ineligible page
    res.redirect("ineligible")
  }

})

router.post('/in-work-answer', function (req,res) {

  // Make a variable and give it the value from 'in-work'
  var inWork = req.session.data['in-work']

  // Check whether the variable matches a condition
  if (inWork == "Yes"){
    // Send user to next page
    res.redirect("q03-name")
  }
  else {
    // Send user to q02-plan-to-work page
    res.redirect("q02-plan-to-work")
  }

})

router.post('/any-other-names', function (req,res) {

  // Make a variable and give it the value from 'any-other-names'
  var anyOtherNames = req.session.data['any-other-names']

  // Check whether the variable matches a condition
  if (anyOtherNames == "Yes"){
    // Send user to next page
    res.redirect("q04-1-other-names-placeholder")
  }
  else {
    // Send user to q05-date-of-birth page
    res.redirect("q05-date-of-birth")
  }

})

// Colin's magic starts here


// function to filter out unchecked values
function filterUnchecked(checkBoxes) {
    if (checkBoxes.length > 0) {
        return checkBoxes.filter(value => value !== '_unchecked');
    } else {
        return {};
    }
}

router.post('/q13-contacting-you', function (req, res) {
    const validLocations = filterUnchecked(req.session.data['contact-pref'])
    // redirect to the fist element
    if (validLocations.includes('sms') || validLocations.includes('telephone')) {
      // redirect them to the telphone section
      res.redirect('q13-2-mobile');
    } if (validLocations.includes('email')) {
      res.redirect('q13-1-email-address');
    } else {
      res.redirect('q13-3-postal-address');
    }
})

router.post('/q13-2-mobile', function (req, res) {
    const validLocations = filterUnchecked(req.session.data['contact-pref'])
    // redirect to the fist element

    if (validLocations.includes('email')) {
      res.redirect('q13-1-email-address');
    } if (validLocations.includes('letter')) {
      res.redirect('q13-3-postal-address');
    } else {
      res.redirect('check-your-answers');
    }
})

router.post('/q13-1-email-address', function (req, res) {
    const validLocations = filterUnchecked(req.session.data['contact-pref'])
    // redirect to the fist element

    if (validLocations.includes('letter')) {
      res.redirect('q13-3-postal-address');
    } else {
      res.redirect('check-your-answers');
    }
})

router.post('/q13-3-postal-address', function (req,res) {

  // Make a variable and give it the value from 'plan-to-work'
  var isPostal = req.session.data['is-postal']

  // Check whether the variable matches a condition
  if (isPostal == "Yes"){
    // Send user to next page
    res.redirect("q-postal-address")
  }
  else {
    // Send user to ineligible page
    res.redirect("check-your-answers")
  }

})



module.exports = router
