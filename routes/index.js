var express = require('express');
var router = express.Router();

/* GET Home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET About page. */
router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Services' });
});

/* GET Search Clinics page. */
router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Search Clinics' });
});

/* GET Register page. */
router.get('/register', function(req, res, next) {
  res.render('index', { title: 'Register' });
});

/* GET Login page. */
router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

module.exports = router;
