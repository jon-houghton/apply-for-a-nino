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

// NEED TO CHANGE THE FILE NAMES TO Q12


// function to filter out unchecked values
function filterUnchecked(checkBoxes) {
    if (checkBoxes.length > 0) {
        return checkBoxes.filter(value => value !== '_unchecked');
    } else {
        return {};
    }
}

router.post('/q12-contacting-you', function (req, res) {
    const validLocations = filterUnchecked(req.session.data['contact-pref'])
    // redirect to the fist element
    if (validLocations.includes('telephone') && validLocations.includes('sms')) {
      // redirect them to the mobile page
      res.redirect('q12-1-mobile');
    } if (validLocations.includes('sms')) {
      res.redirect('q12-1-mobile');
    } if (validLocations.includes('telephone')) {
      res.redirect('q12-2-telephone');
    } if (validLocations.includes('email')) {
      res.redirect('q13-1-email-address');
    } if (validLocations.includes('letter')) {
      res.redirect('q13-3-postal-address');
    } else {
      res.redirect('check-your-answers');
    }
})

router.post('/q12-1-mobile', function (req, res) {
    const validLocations = filterUnchecked(req.session.data['contact-pref'])
    // redirect to the fist element
    if (validLocations.includes('telephone') && validLocations.includes('sms')) {
      // redirect them to the mobile page
      res.redirect('q12-3-telephone-call');
    } if (validLocations.includes('email')) {
      res.redirect('q13-1-email-address');
    } if (validLocations.includes('letter')) {
      res.redirect('q13-3-postal-address');
    } else {
      res.redirect('check-your-answers');
    }
})

router.post('/q12-2-telephone', function (req, res) {
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

// * TO FIX * need a router here to allow user to answer 'no', input an alternative number, then continue with email and postal address questions
router.post('/q12-3-telephone-call', function (req, res) {
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

  // Make a variable and give it the value from 'postal-address'
  var isPostal = req.session.data['is-postal']

  // Check whether the variable matches a condition
  if (isPostal == "No"){
    // Send user to add-a-postal-address
    res.redirect("q-postal-address")
  }
  else {
    // Send user to check-your-answers
    res.redirect("check-your-answers")
  }

})


router.post('check-for-next-page', function (req, res) {
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


module.exports = router
