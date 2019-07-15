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

  // Make a variable and give it the value from 'plan-to-work'
  var inWork = req.session.data['in-work']

  // Check whether the variable matches a condition
  if (inWork == "Yes"){
    // Send user to next page
    res.redirect("q03-name")
  }
  else {
    // Send user to ineligible page
    res.redirect("q02-plan-to-work")
  }

})

router.post('/any-other-names', function (req,res) {

  // Make a variable and give it the value from 'plan-to-work'
  var anyOtherNames = req.session.data['any-other-names']

  // Check whether the variable matches a condition
  if (anyOtherNames == "Yes"){
    // Send user to next page
    res.redirect("q04-1-other-names-placeholder")
  }
  else {
    // Send user to ineligible page
    res.redirect("q05-date-of-birth")
  }

})

// Colin's magic starts here

// function to work out where you should go next - this takes the current checkboxes value and the current URL, if it is undefined it redirects you to done
function nextPageDisplayed(checkBoxes, url) {
    const currentIndex = checkBoxes.indexOf(url);
    const nextPage = checkBoxes[currentIndex + 1];
    if (nextPage === undefined) {
        return 'done';
    } else {
        return nextPage;
    }
}

// function to filter out unchecked values
function filterUnchecked(checkBoxes) {
    if (checkBoxes.length > 0) {
        return checkBoxes.filter(value => value !== '_unchecked');
    } else {
        return {};
    }
}

router.post('/check-box-page', function (req, res) {
    const validLocations = filterUnchecked(req.session.data.contact)
    // redirect to the fist element
    res.redirect(`/check-box-${validLocations[0]}`);
})

router.get('/check-box-telephone', function (req, res) {
    res.render('checkbox-routing/page.njk', {pageTitle: "Telphone"})
})

router.post('/check-box-telephone', function (req, res) {
    const validLocations = filterUnchecked(req.session.data.contact)
    res.redirect(`/check-box-${nextPageDisplayed(validLocations, 'telephone')}`);
})

router.get('/check-box-sms', function (req, res) {
    res.render('checkbox-routing/page.njk', {pageTitle: "SMS Text Message"})
})

router.post('/check-box-sms', function (req, res) {
    const validLocations = filterUnchecked(req.session.data.contact)
    res.redirect(`/check-box-${nextPageDisplayed(validLocations, 'sms')}`);
})

router.get('/check-box-email', function (req, res) {
    res.render('checkbox-routing/page.njk', {pageTitle: "Email"})
})

router.post('/check-box-email', function (req, res) {
    const validLocations = filterUnchecked(req.session.data.contact)
    res.redirect(`/check-box-${nextPageDisplayed(validLocations, 'email')}`);
})

router.get('/check-box-letter', function (req, res) {
    res.render('checkbox-routing/page.njk', {pageTitle: "Letter"})
})

router.post('/check-box-email', function (req, res) {
    res.redirect('/check-box-done');
})

router.get('/check-box-done', function (req, res) {
    res.render('confirmation.html', {pageTitle: "done"})
})

// Colin's magic ends, but continues elsewhere in the world...

module.exports = router
