let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//create user model instance
let UserModel = require('../models/user');
let User = UserModel.userModel; //alias

const ClinicAddresses = [
    {
        address: '234 abotsforth road',
        city: 'scarborough',
        postal_code: 'B6T0H6',
        country: 'Canada'
    },
    {
        address: '123 main road',
        city: 'scarborough',
        postal_code: 'V5T0M4',
        country: 'Canada'
    }, {
        address: '234 14th avenue',
        city: 'scarborough',
        postal_code: 'N6R0J6',
        country: 'Canada'
    }, {
        address: '356 forest road',
        city: 'Markham',
        postal_code: 'A6Z0H6',
        country: 'Canada'
    }, {
        address: '11th main road',
        city: 'Markham',
        postal_code: 'B6T046',
        country: 'Canada'
    }, {
        address: '234 Finch road',
        city: 'Markham',
        postal_code: 'B6T046',
        country: 'Canada'
    }, {
        address: '2ww34 Finch road',
        city: 'Markham',
        postal_code: 'B6T046',
        country: 'USA'
    }
]

const countryOptions = [
    {
        ID: 'Canada',
        Name: 'Canada'
    },
    {
        ID: 'USA',
        Name: 'USA'
    },
    {
        ID: 'UK',
        Name: 'UK'
    },
    {
        ID: 'India',
        Name: 'India'
    }
];

const cityOptions = [
    {
        ID: 'scarborough',
        Name: 'scarborough'
    },
    {
        ID: 'Markham',
        Name: 'Markham'
    },
    {
        ID: 'delhi',
        Name: 'delhi'
    }
];

/* GET Home page. */
module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { title: 'Home', displayName: req.user ? req.user.name : '' });
}

/* GET Services page. */
module.exports.displayServicesPage = (req, res, next) => {
    res.render('index', { title: 'Services', displayName: req.user ? req.user.name : '' });
}

/* GET Search Clinics page. */
module.exports.displaySearchPage = (req, res, next) => {
    res.render('search',
        {
            title: 'Search Clinics',
            data: [],
            messages: '',
            countryOptions: countryOptions,
            cityOptions: cityOptions,
            displayName: req.user ? req.user.name : ''
        });
}

/* GET Search Clinics page. */
module.exports.processSearchPage = (req, res, next) => {
    try {
        const { country, city } = req.body;
        const data = ClinicAddresses;

        const searchData = data.filter((val, index) => {
            if (val.country === country || val.city === city) {
                return val;
            }
        });
        res.render('search',
            {
                title: 'Search Clinics',
                data: searchData || [],
                messages: searchData.length > 0 ? '' : 'No record found',
                countryOptions: countryOptions,
                cityOptions: cityOptions,
                displayName: req.user ? req.user.name : ''
            });
        // bookModel.find((err, data) => {
        //     if (err) {
        //         console.log(err)
        //     } else {
        //         res.render('pages/home', { data: data });
        //     }
        // });
    } catch (error) {
        console.log(error);
    }
}

/* GET  Patient Home page.  */
module.exports.displayPatHomePage = (req, res, next) => {
    res.render('index',
        {
            title: 'PatientHomePage',
            displayName: req.User ? req.User.name : ''
        });
}

/* GET Doctor Home Page page.  */
module.exports.displayDocHomePage = (req, res, next) => {
    res.render('index', { title: 'DoctorHomePage', displayName: req.User ? req.User.name : '' });
}

/* GET Nurse home page.  */
module.exports.displayNurHomePage = (req, res, next) => {
    res.render('index', { title: 'NurseHomePage', displayName: req.User ? req.User.name : '' });
}

/* GET Register page.  */
module.exports.displayRegisterPage = (req, res, next) => {
    res.render('index', { title: 'Register', displayName: req.User ? req.User.name : '' });
}

/* GET Login page. */
module.exports.displayLoginPage = (req, res, next) => {
    //check if user has already logged in
    if (!req.User) {
        return res.render('auth/login',
            {
                title: "Login",
                messages: req.flash('loginmessage'),
                displayName: req.User ? req.User.name : ''
            })
    }
    else {
        return res.redirect('/');
    }
    // res.render('index', { title: 'Login' });
}
/*Process Login Page*/
module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
        {
            failureFlash: true
        },
        (err, userModel, info) => {
            //server err?
            if (err) {
                return next(err);
            }
            //is there a user login error?
            if (!userModel) {
                res.locals.displayName = req.User ? req.User.name : '';
                return res.render('auth/login',
                    {
                        title: "Login",
                        messages: 'Authentication Error',
                        displayName: req.User ? req.User.name : ''
                    });
            }
            req.login(userModel, (err) => {
                //server err?
                if (err) {
                    return next(err);
                }
                //if no error exists
                //need to add if conditions
                return res.render('patientHomePage',
                    {
                        title: 'PatientHomePage',
                        messages: 'Successfull login',
                        displayName: req.User ? req.User.name : ''
                    });
            });
        })(req, res, next);
}

/* Display Registration Page */
module.exports.displayRegisterPage = (req, res, next) => {
    //check if the user is not logged in
    if (!req.User) {
        res.render('auth/register',
            {
                title: 'Register',
                // messages: req.flash('RegisterMessage'),
                messages: '',
                displayName: req.User ? req.User.name : ''
            });
    }
    else {
        return res.redirect('login');
    }
}

/* Process Register page */
module.exports.processRegisterPage = (req, res, next) => {
    //instantiate a user object
    let newUser = new User({
        username: req.body.username,
        name: req.body.username,
        //password: req.body.password,
        dob: req.body.dob,
        address: req.body.address,
        gender: req.body.gender,
        email: req.body.email,
        profile: req.body.profile
    });

    User.register(newUser, req.body.password, (err) => {
        if (err) {
            console.log("Error: Inserting New User");
            // if (err.name == "UserExistsError") {
            //     req.flash(
            //         'registermessage',
            //         'Registration Error: User Already Exists!'
            //     );
            //     console.log('Error: User Already Exists!');
            // }
            return res.render('auth/register',
                {
                    title: 'Register',
                    messages: err.message || 'Registration Error',
                    // messages: req.flash('RegisterMessage'),
                    displayName: req.User ? req.User.name : ''
                });

        }
        else {
            //if no error exists then registration is successful
            return passport.authenticate('local')(req, res, () => {
                return res.redirect('login');
            });
            return res.redirect('login');
        }
    });

}

/*process Logout*/
module.exports.processLogout = (req, res, next) => {
    req.logout();
    return res.redirect('/');
}