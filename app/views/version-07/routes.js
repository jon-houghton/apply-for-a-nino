const express = require('express')
const router = express.Router()

router.post('/plan-to-work-answer', function (req, res) {
  // Make a variable and give it the value from 'plan-to-work'
  var planToWork = req.session.data['plan-to-work']

  // Check whether the variable matches a condition
  if (planToWork === 'Yes') {
    // Send user to next page
    res.redirect('q02-2-have-brp')
  } else {
    // Send user to ineligible page
    res.redirect('ineligible')
  }
})

router.post('/in-work-answer', function (req, res) {
  // Make a variable and give it the value from 'in-work'
  var inWork = req.session.data['in-work']

  // Check whether the variable matches a condition
  if (inWork === 'Yes') {
    // Send user to next page
    res.redirect('q02-3-nationality')
  } else {
    // Send user to q02-plan-to-work page
    res.redirect('q02-plan-to-work')
  }
})

router.post('/q02-3-nationality', function (req, res) {
  res.redirect('q02-3a-any-other-nationality');
})

router.post('/q02-3a-any-other-nationality', function (req, res) {

  // Variable to hold current nationality
  var nationality = req.session.data['nationality'];

  // Make a variable for our list of EU countries
  var euCountries = ['France', 'Spain','Austria'];

  // if applicant has more nationalities to add
  var hasOtherNationalities = req.session.data['other-nationality'];
  
  // Check whether the variable matches a condition
  if (hasOtherNationalities === 'Yes') {
    // redirect to add page
    res.redirect('q02-4-add-nationality')
  } else if (euCountries.includes(nationality) && hasOtherNationalities === 'No'){
    // redirect to appropriate ineligibility page
    res.redirect('index_no_eligibility')
  } else {
    // non-EU and no other nationality to consider, go straight to BRP page
    res.redirect('q02-2-have-brp')
    
  }
})

router.post('/add-other-nationality', function (req, res) { 
  // get anything we already have in a list of nationalities
  const otherNationalities = req.session.data['nationalities'] || [];

  // push the newly selected nationality to the list
  otherNationalities.push(req.session.data['other-nationality']);

  // update the session with the new state of the list
  req.session.data['nationalities'] = otherNationalities;

  // finally redirect to our list page which should display them all
  res.redirect('q02-5-nationality-list');

})

router.get('/q02-5-nationality-list', function (req, res) {

  // Create summary list row for current nationality
  const mainNationality = req.session.data['nationality']
  const currentNationality = {
    key: {
      classes: 'govuk-!-width-one-third',
      text: `Current nationality`
    },
    value: {
      classes: 'govuk-!-width-one-third',
      text: `${mainNationality}`
    },
    actions: {
      classes: 'govuk-!-width-one-third',
      items: [
        {
          href: `q02-nationality?change`,
          text: 'Change',
          visuallyHiddenText: `current nationality`
        }
      ]
    }
  }

  // Create array of summary list rows of other nationalities
  const otherNationalities = req.session.data['nationalities'] || [];
  const otherNationalityRows = otherNationalities.map((nationalities, i) => ({
    key: {
      classes: 'govuk-!-width-one-third',
      text: `Previous nationality ${(i === 0 ? '' : i + 1)}`
    },
    value: {
      classes: 'govuk-!-width-one-third',
      text: `${nationalities}`
    },
    actions: {
      classes: 'govuk-!-width-one-third',
      items: [
        {
          href: `change-other-nationality/${i}`,
          text: 'Change',
          visuallyHiddenText: `previous nationality ${i + 1}`
        },
        {
          href: `delete-other-nationality/${i}`,
          text: 'Delete',
          visuallyHiddenText: `previous nationality ${i + 1}`
        }
      ]
    }
  }))

  // Merge into one list and add to view
  res.locals.nationalities = [currentNationality, ...otherNationalityRows]
  res.render('version-07/q02-5-nationality-list.html')
  
})

router.post('/any-more-nationalities', function(req, res) {
  const anyMoreNationalities = req.session.data['any-more-nationalities'];
  const nationalities = req.session.data['nationalities'] || [];
  const currentNationality = req.session.data['nationality'];
  var euCountries = ['France', 'Spain', 'Austria']; 
  var matches = 0;

  if(anyMoreNationalities === 'Yes'){
    res.redirect('q02-4-add-nationality')
  } else {
    // add our current nationality to the list if its not there already
    if(!nationalities.includes(currentNationality)){
      nationalities.push(currentNationality);
    }
  
    console.log('final list of nationalities', nationalities)
    // check all nationalitiesfor the presence of anything not in the EU
    nationalities.map((eachNationality) => {
      if(!euCountries.includes(eachNationality)) {
        matches++;
      }
    })

    // if non eu anywhere in the list then redirect to brp
    if (matches > 0){
      res.redirect('q02-2-have-brp')
    }
    // Send user to boot out page
    res.redirect('index_no_eligibility')
  }

})
router.post('/have-brp', function (req, res) {
  // Make a variable and give it the value from 'any-other-names'
  var haveBrp = req.session.data['have-brp']

  // Check whether the variable matches a condition
  if (haveBrp === 'Yes') {
    // Send user to next page
    res.redirect('q02-3-brp-number')
  } else {
    // Send user to q05-date-of-birth page
    res.redirect('no-brp')
  }
})

router.post('/any-other-names', function (req, res) {
  // Make a variable and give it the value from 'any-other-names'
  var anyOtherNames = req.session.data['any-other-names']

  // Check whether the variable matches a condition
  if (anyOtherNames === 'Yes') {
    // Send user to next page
    res.redirect('q04-1-other-names-details')
  } else {
    // Send user to q05-date-of-birth page
    res.redirect('q05-date-of-birth')
  }
})

router.get('/q03-name', function (req, res, next) {
  res.locals.change = 'change' in req.query
  next()
})

router.post('/add-other-name', function (req, res) {
  const givenNames = req.session.data['other-given-names']
  const familyName = req.session.data['other-family-name']

  const otherNames = req.session.data['other-names'] || []

  otherNames.push({ givenNames, familyName })
  req.session.data['other-names'] = otherNames
  res.redirect('q04-2-other-names-list')
})

router.get('/change-other-name/:id', function (req, res) {
  const nameId = parseInt(req.params.id, 10)
  const otherNames = req.session.data['other-names'] || []
  const { givenNames, familyName } = otherNames[nameId]

  res.locals.id = nameId
  res.locals.change = true
  res.locals.givenNames = givenNames
  res.locals.familyName = familyName

  res.render('version-06/q04-1-other-names-details.html')
})

router.post('/change-other-name/:id', function (req, res) {
  const nameId = parseInt(req.params.id, 10)
  const givenNames = req.session.data['other-given-names']
  const familyName = req.session.data['other-family-name']
  const otherNames = req.session.data['other-names'] || []

  otherNames[nameId] = { givenNames, familyName }
  req.session.data['other-names'] = otherNames

  res.redirect('../q04-2-other-names-list')
})

router.get('/delete-other-name/:id', function (req, res) {
  const nameId = req.params.id
  const otherNames = req.session.data['other-names'] || []
  const { givenNames, familyName } = otherNames[nameId]

  res.locals.name = `${givenNames} ${familyName}`

  res.render('version-06/delete-other-name.html')
})

router.post('/delete-other-name/:id', function (req, res) {
  const deleteNames = req.session.data['delete-name']

  if (deleteNames === 'yes') {
    const nameId = parseInt(req.params.id, 10)
    const otherNames = req.session.data['other-names'] || []
    otherNames.splice(nameId, 1)
    req.session.data['other-names'] = otherNames
  }

  res.redirect('../q04-2-other-names-list')
})

router.get('/q04-2-other-names-list', function (req, res) {
  // Creat summary list row for current name
  const givenNames = req.session.data['given-names']
  const familyName = req.session.data['family-name']
  const currentName = {
    key: {
      classes: 'govuk-!-width-one-third',
      text: `Current name`
    },
    value: {
      classes: 'govuk-!-width-one-third',
      text: `${givenNames} ${familyName}`
    },
    actions: {
      classes: 'govuk-!-width-one-third',
      items: [
        {
          href: `q03-name?change`,
          text: 'Change',
          visuallyHiddenText: `current name`
        }
      ]
    }
  }

  // Create array of summary list rows of other names
  const otherNames = req.session.data['other-names'] || []
  const otherNameRows = otherNames.map((names, i) => ({
    key: {
      classes: 'govuk-!-width-one-third',
      text: `Previous name ${(i === 0 ? '' : i + 1)}`
    },
    value: {
      classes: 'govuk-!-width-one-third',
      text: `${names.givenNames} ${names.familyName}`
    },
    actions: {
      classes: 'govuk-!-width-one-third',
      items: [
        {
          href: `change-other-name/${i}`,
          text: 'Change',
          visuallyHiddenText: `previous name ${i + 1}`
        },
        {
          href: `delete-other-name/${i}`,
          text: 'Delete',
          visuallyHiddenText: `previous name ${i + 1}`
        }
      ]
    }
  }))

  // Merge into one list and add to view
  res.locals.names = [currentName, ...otherNameRows]
  res.render('version-06/q04-2-other-names-list.html')
})

router.post('/other-names-list-answer', function (req, res) {
  const anyMoreNames = req.session.data['any-more-names']

  if (anyMoreNames === 'Yes') {
    res.redirect('q04-1-other-names-details')
  } else {
    res.redirect('q05-date-of-birth')
  }
})

// Colin's magic starts here

// NEED TO CHANGE THE FILE NAMES TO Q12

// function to filter out unchecked values
function filterUnchecked (checkBoxes) {
  if (checkBoxes.length > 0) {
    return checkBoxes.filter(value => value !== '_unchecked')
  } else {
    return {}
  }
}

router.post('/q12-contacting-you', function (req, res) {
  const validLocations = filterUnchecked(req.session.data['contact-pref'])
  // redirect to the fist element
  if (validLocations.includes('telephone') && validLocations.includes('sms')) {
    // redirect them to the mobile page
    res.redirect('q12-1-mobile')
  } if (validLocations.includes('sms')) {
    res.redirect('q12-1-mobile')
  } if (validLocations.includes('telephone')) {
    res.redirect('q12-2-telephone')
  } if (validLocations.includes('email')) {
    res.redirect('q13-1-email-address')
  } if (validLocations.includes('letter')) {
    res.redirect('q13-3-postal-address')
  } else {
    res.redirect('check-your-answers')
  }
})

router.post('/q12-1-mobile', function (req, res) {
  const validLocations = filterUnchecked(req.session.data['contact-pref'])
  // redirect to the fist element
  if (validLocations.includes('telephone') && validLocations.includes('sms')) {
    // redirect them to the mobile page
    res.redirect('q12-3-telephone-call')
  } if (validLocations.includes('email')) {
    res.redirect('q13-1-email-address')
  } if (validLocations.includes('letter')) {
    res.redirect('q13-3-postal-address')
  } else {
    res.redirect('check-your-answers')
  }
})

router.post('/q12-2-telephone', function (req, res) {
  const validLocations = filterUnchecked(req.session.data['contact-pref'])
  // redirect to the fist element

  if (validLocations.includes('email')) {
    res.redirect('q13-1-email-address')
  } if (validLocations.includes('letter')) {
    res.redirect('q13-3-postal-address')
  } else {
    res.redirect('check-your-answers')
  }
})

// * TO FIX * need a router here to allow user to answer 'no', input an alternative number, then continue with email and postal address questions
router.post('/q12-3-telephone-call', function (req, res) {
  const validLocations = filterUnchecked(req.session.data['contact-pref'])
  // redirect to the fist element
  if (validLocations.includes('email')) {
    res.redirect('q13-1-email-address')
  } if (validLocations.includes('letter')) {
    res.redirect('q13-3-postal-address')
  } else {
    res.redirect('check-your-answers')
  }
})

router.post('/q13-1-email-address', function (req, res) {
  const validLocations = filterUnchecked(req.session.data['contact-pref'])
  // redirect to the fist element

  if (validLocations.includes('letter')) {
    res.redirect('q13-3-postal-address')
  } else {
    res.redirect('check-your-answers')
  }
})

router.post('/q13-3-postal-address', function (req, res) {
  // Make a variable and give it the value from 'postal-address'
  var isPostal = req.session.data['is-postal']

  // Check whether the variable matches a condition
  if (isPostal === 'No') {
    // Send user to add-a-postal-address
    res.redirect('q-postal-address')
  } else {
    // Send user to check-your-answers
    res.redirect('check-your-answers')
  }
})

router.post('check-for-next-page', function (req, res) {
  const validLocations = filterUnchecked(req.session.data['contact-pref'])
  // redirect to the fist element

  if (validLocations.includes('email')) {
    res.redirect('q13-1-email-address')
  } if (validLocations.includes('letter')) {
    res.redirect('q13-3-postal-address')
  } else {
    res.redirect('check-your-answers')
  }
})

module.exports = router
