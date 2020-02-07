const express = require('express')
const router = express.Router()

const path = require('path');
const upload = require('../../../upload-middleware');

router.post('/plan-to-work-answer', function (req, res) {
  // Make a variable and give it the value from 'plan-to-work'
  var planToWork = req.session.data['plan-to-work']

  // Check whether the variable matches a condition
  if (planToWork === 'Yes') {
    // Send user to next page
    res.redirect('nationality')
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
    res.redirect('nationality')
  } else {
    // Send user to q02-plan-to-work page
    res.redirect('plan-to-work')
  }
})

// Jons hockey EU router
  router.post('/brp-router', function (req, res) {
  // Make a variable for our list of EU countries
  var euCountries = ['Austrian', 'Belgian', 'Bulgarian', 'Croatian', 'Cypriot', 'Czech', 'Danish', 'Estonian', 'Finnish', 'French', 'German', 'Greek', 'Hungarian', 'Irish', 'Italian', 'Latvian', 'Lithuanian', 'Luxembourger', 'Maltese', 'Dutch', 'Polish', 'Portuguese', 'Romanian', 'Slovak', 'Slovenian', 'Spainish', 'Swedish', 'British', 'Icelandic', 'Liechtenstein citizen', 'Norwegian', 'Swiss'];
  // Make a variable and give it the value from 'nationality'
  var nationality = req.session.data['input-autocomplete'];
    console.log(req.session.data)
  // Check whether the variable matches a condition
  if (euCountries.includes(nationality)) {
    // Send user to no BRP page
    res.redirect('no-brp')
  } else {
    // Send user to BRP page
    res.redirect('brp-number')
  }
})

var data = {
  brpCardFront: null,
  brpCardFrontFilename: null
};


router.post('/upload-brp-image', upload.single('userPhoto'), async (req, res, next) => {
  console.log('file upload is ', req.file)

  if(!req.file  && data.brpCardFront === null){
    res.status(401).json({ error: 'Please provide an image' });
  }

  // add the image stuff to data and session
  data.brpCardFront = req.file.path;
  data.brpCardFrontFilename = req.file.originalname;
  req.session.data['brp-img-upload'] = {
    filename: data.brpCardFrontFilename,
    path: data.brpCardFront
  }

  // then redirect
  res.redirect('self-img-upload');

});

router.post('/upload-self-image', upload.single('userSelfPhoto'), async (req, res, next) => {
  console.log('file upload is ', req.file)

  if(!req.file  && data.userPhoto === null){
    res.status(401).json({ error: 'Please provide an image' });
  }

  // add the image stuff to data and session
  data.userPhoto = req.file.path;
  data.userPhotoFilename = req.file.originalname;
  req.session.data['self-img-upload'] = {
    filename: data.userPhotoFilename,
    path: data.userPhoto
  }

  console.log('checking the session', req.session.data)

  // then redirect
  res.redirect('q03-name');

});


router.post('x/q02-3-nationality', function (req, res) {
  // Make a variable for our list of EU countries
  var euCountries = ['France', 'Spain'];
  // Make a variable and give it the value from 'any-other-names'
  var nationality = req.session.data['nationality'];

    console.log(req.session.data)
  var otherNationalities = req.session.data['other-nationality']
  // Check whether the variable matches a condition
  if (euCountries.includes(nationality) && otherNationalities === 'Yes') {
    // Send user to next page
    res.redirect('q02-4-add-nationality')
  } else {
    // Send user to q05-date-of-birth page
    res.redirect('q05-date-of-birth')
  }
})


router.post('/any-other-names', function (req, res) {
  // Make a variable and give it the value from 'any-other-names'
  var anyOtherNames = req.session.data['any-other-names']

  // Check whether the variable matches a condition
  if (anyOtherNames === 'Yes') {
    // Send user to next page
    res.redirect('name-changes')
  } else {
    // Send user to q05-date-of-birth page
    res.redirect('date-of-birth')
  }
})

router.post('/name-changes', function (req, res) {
  var nameChanges = req.session.data['name-changes'];

  if(nameChanges === 'Both') {
    res.redirect('q04-1-other-names-details');
  } else {
    console.log('to come later')
  }
})


router.post('/have-brp', function (req, res) {
  // Make a variable and give it the value from 'any-other-names'
  var haveBrp = req.session.data['have-brp']

  // Check whether the variable matches a condition
  if (haveBrp === 'Yes') {
    // Send user to next page
    res.redirect('brp-number')
  } else {
    // Send user to q05-date-of-birth page
    res.redirect('no-brp')
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
  res.redirect('date-of-birth')
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
  // const currentName = {
  //   key: {
  //     classes: 'govuk-!-width-one-third',
  //     text: `Current name`
  //   },
  //   value: {
  //     classes: 'govuk-!-width-one-third',
  //     text: `${givenNames} ${familyName}`
  //   },
  //   actions: {
  //     classes: 'govuk-!-width-one-third',
  //     items: [
  //       {
  //         href: `q03-name?change`,
  //         text: 'Change',
  //         visuallyHiddenText: `current name`
  //       }
  //     ]
  //   }
  // }

  // Create array of summary list rows of other names
  const otherNames = req.session.data['other-names'] || []
  const otherNameRows = otherNames.map((names, i) => ({
    key: {
      // classes: 'govuk-!-width-one-third',
      // text: `${(i === 0 ? '' : i + 1)}`
      classes: 'govuk-!-width-one-third',
      text: `${names.givenNames} ${names.familyName}`
    },
    // value: {
    //   classes: 'govuk-!-width-one-third',
    //   text: `${names.givenNames} ${names.familyName}`
    // },
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
  res.locals.names = [...otherNameRows]
  res.render('version-11/q04-2-other-names-list.html')
})

router.post('/other-names-list-answer', function (req, res) {
  const anyMoreNames = req.session.data['any-more-names']

  if (anyMoreNames === 'Yes') {
    res.redirect('q04-1-other-names-details')
  } else {
    res.redirect('date-of-birth')
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

router.post('/contacting-you', function (req, res) {
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
