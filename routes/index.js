let express = require('express');
let router = express.Router();
let passport = require('passport');
let mongoose = require('mongoose');

let indexController = require('../controllers/index.js');

//helper function for gaurd purposes
function requireAuth(req, res, next)
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}
/* GET Home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET Services page. */
router.get('/services', indexController.displayServicesPage);

/* Display Search Clinics page. */
router.get('/search', indexController.displaySearchPage);

/* GET Search Clinics page. */
router.post('/search', indexController.processSearchPage);

/* GET Patient Home page. */
router.get('/patientHomePage/:id', requireAuth, indexController.displayPatHomePage);

/* GET Doctor Home page. */
router.get('/doctorHomePage/:id', requireAuth, indexController.displayDocHomePage);

/* GET Nurse Home page. */
router.get('/nurseHomePage/:id', requireAuth, indexController.displayNurHomePage);

/* GET route for displaying the Login page. */
router.get('/login', indexController.displayLoginPage);

/* GET route for processing the Login page. */
router.post('/login', indexController.processLoginPage);

/* GET route for displaying the Registration page. */
router.get('/register', indexController.displayRegisterPage);

/* GET route for processing the registration page. */
router.post('/register', indexController.processRegisterPage);

/* GET route for displaying the display PreExamination page. */
router.get('/preExaminationPage', indexController.displayPreExaminationPage);

/* GET route for processing the display PreExamination page. */
router.post('/preExaminationPage', indexController.processPreExaminationPage);

router.get('/delete/:id', indexController.deletePatientExamination);

router.get('/update/:id', indexController.updatePatientExamination);

router.post('/update/:id', indexController.postUpdatePatientExamination);

/* GET route for processing the Logout page. */
router.get('/logout', indexController.processLogout);

module.exports = router;
