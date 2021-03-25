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

/* GET Search Clinics page. */
router.get('/contact', indexController.displayContactsPage);

/* GET Patient Home page. 
router.get('/patientHomePage/:id', requireAuth, indexController.displayPatHomePage);

/* GET Doctor Home page. 
router.get('/doctorHomePage/:id', requireAuth, indexController.displayDocHomePage);

/* GET Nurse Home page. 
router.get('/nurseHomePage/:id', requireAuth, indexController.displayNurHomePage);

/* GET route for displaying the Login page. */
router.get('/login', indexController.displayLoginPage);

/* GET route for processing the Login page. */
router.get('/login', indexController.processLoginPage);

/* GET route for displaying the Registration page. */
router.get('/register', indexController.displayRegisterPage);

/* GET route for processing the registration page. */
router.get('/register', indexController.processRegisterPage);

/* GET route for processing the Logout page. */
router.get('/logout', indexController.processLogout);

module.exports = router;
