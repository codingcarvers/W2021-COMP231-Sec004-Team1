let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//create user model instance
let UserModel = require('../models/user');
let User = UserModel.userModel; //alias


/* GET Home page. */
module.exports.displayHomePage = (req, res, next) => {
  res.render('index', { title: 'Home', displayName: req.user ? req.user.name : '' });
}

/* GET Services page. */
module.exports.displayServicesPage = (req, res, next) => {
  res.render('index', { title: 'Services', displayName: req.user ? req.user.name : '' });
}

/* GET Search Clinics page. */
module.exports.displayContactsPage = (req, res, next) => {
  res.render('index', { title: 'Search Clinics', displayName: req.user ? req.user.name : '' });
}
/*
/* GET  Patient Home page. 
module.exports.displayPatHomePage = (req, res, next) => {
    res.render('index', { title: 'PatientHomePage' });
}

/* GET Doctor Home Page page. 
module.exports.displayDocHomePage = (req, res, next) => {
    res.render('index', { title: 'DoctorHomePage' });
}

/* GET Nurse home page. 
module.exports.displayNurHomePage = (req, res, next) => {
    res.render('index', { title: 'NurseHomePage' });
}
*/

/* GET Register page. 
module.exports.displayRegisterPage = (req, res, next) => {
  res.render('index', { title: 'Register' });
}

/* GET Login page. */
module.exports.displayLoginPage = (req, res, next) => {
    //check if user has already logged in
    if(!req.User)
    {
        res.render('auth/login',
        {
            title: "Login",
            messages: req.flash('loginmessage'),
            displayName: req.User ? req.User.name :''
        })
    }
    else
    {
        return res.redirect('/');
    }
  res.render('index', { title: 'Login' });
}
/*Process Login Page*/
module.exports.processLoginPage = (req,res, next) => {
    passport.authenticate('local',
    (err, userModel, info) => {
        //server err?
        if(err)
        {
            return next(err);
        }
        //is there a user login error?
        if(!userModel)
        {
            req.flash('loginmessage', 'Authentication Error');
            res.redirect('auth/login');
        }
        req.login(userModel, (err) => {
            //server err?
            if(err)
            {
                return next(err);
            }
            //if no error exists
            //need to add if conditions
            return res.render('/patientHomePage',
            {
                title: 'PatientHomePage',
                messages: req.flash('loginmessage')
            });
        });
    })(req,res, next);
}

/* Display Registration Page */
module.exports.displayRegisterPage = (req, res, next) => {
    //check if the user is not logged in
    if(!req.User)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('RegisterMessage'),
            displayName: req.User ? req.User.name : ''
        });
    }
    else
    {
        return res.redirect('auth/login');
    }
}

/* Process Register page */
module.exports.processRegisterPage = (req,res,next) => {
    //instantiate a user object
    let newUser = new User({
        name: req.body.name,
        //password: req.body.password,
        dob: req.body.dob,
        address: req.body.address,
        gender: req.body.gender,
        email: req.body.email,
        profile: req.body.profile
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registermessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!');
            }
           return res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('RegisterMessage'),
            displayName: req.User ? req.User.name : ''
        });

        }
        else
        {
            //if no error exists then registration is successful
            return passport.authenticate('local')(req,res, ()=>{
                res.redirect('auth/login')
            });

        }

    });
    
}

/*process Logout*/
module.exports.processLogout = (req,res, next) => {
    req.logout();
    req.redirect('/');
}