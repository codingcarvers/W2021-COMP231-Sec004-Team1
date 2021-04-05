let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//create user model instance
let UserModel = require('../models/user');
let User = UserModel.userModel; //alias

let primExamModel = require('../models/primilinaryexam');
let primExam = primExamModel.primExamModel;

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

const profileOptions = [
    {
        ID: 'D',
        Name: 'Doctor'
    },
    {
        ID: 'P',
        Name: 'patient'
    },
    {
        ID: 'N',
        Name: 'Nurse'
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
    console.log(res.locals.currentUser)
    if (res.locals.currentUser) {
        primExam.find((err, data) => {
            if (err) {
                console.log(err)
            } else {
                patientData = data;
                //if no error exists
                //need to add if conditions
                switch (res.locals.currentUser.profile) {
                    case 'P':
                        const patientRecord = patientData.filter(val => val.name == res.locals.currentUser.name);
                        return res.render('patientHomePage',
                            {
                                data: patientRecord || [],
                                title: 'PatientHomePage',
                                messages: patientRecord.length > 0 ? 'Successful login' : 'No Pre Examination record found',
                                displayName: req.user ? req.user.name : ''
                            });
                    case 'D':
                        return res.render('doctorHomePage',
                            {
                                data: patientData,
                                title: 'DoctorHomePage',
                                messages: 'Successful login',
                                displayName: req.user ? req.user.name : ''
                            });
                    default:
                        return res.render('nurseHomePage',
                            {
                                data: patientData,
                                title: 'NurseHomePage',
                                messages: 'Successful login',
                                displayName: req.user ? req.user.name : ''
                            });
                }
            }
        });
    }
    else {
        res.render('index', { title: 'Welcome! to Next Generation EMR We provide you best Health care Services ', displayName: req.user ? req.user.name : '' });
    }
}

/* GET Services page. */
module.exports.displayServicesPage = (req, res, next) => {
    res.render('index', { title: 'Patient Registration,Appointment Booking, Patient Checkup,Patient Treatment', displayName: req.user ? req.user.name : '' });
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
            if (val.country === country && val.city === city) {
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
        // primExam.insertOne( { name: "nitinp", height: '6ft', weight: '70kg', temperature : '20', physical_exam_record : 'pass all test' } );
        // primExam.find((err, data) => {
        //     if (err) {
        //         console.log(err)
        //     } else {
        //         console.log(data)
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
            displayName: req.user ? req.user.name : ''
        });
}

/* GET Doctor Home Page page.  */
module.exports.displayDocHomePage = (req, res, next) => {
    res.render('index', { title: 'DoctorHomePage', displayName: req.user ? req.user.name : '' });
}

/* GET Nurse home page.  */
module.exports.displayNurHomePage = (req, res, next) => {
    res.render('index', { title: 'NurseHomePage', displayName: req.user ? req.user.name : '' });
}

/* GET Register page.  */
module.exports.displayRegisterPage = (req, res, next) => {
    res.render('index', { title: 'Register', displayName: req.user ? req.user.name : '' });
}

/* GET Login page. */
module.exports.displayLoginPage = (req, res, next) => {
    //check if user has already logged in
    if (!req.user) {
        return res.render('auth/login',
            {
                title: "Login",
                messages: req.flash('loginmessage'),
                displayName: req.user ? req.user.name : ''
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
                res.locals.displayName = req.user ? req.user.name : '';
                return res.render('auth/login',
                    {
                        title: "Login",
                        messages: 'Authentication Error',
                        displayName: req.user ? req.user.name : ''
                    });
            }
            req.login(userModel, (err) => {
                //server err?
                if (err) {
                    return next(err);
                }
                return res.redirect('/home');
            });
        })(req, res, next);
}

/* Display Registration Page */
module.exports.displayRegisterPage = (req, res, next) => {
    //check if the user is not logged in
    if (!req.user) {
        res.render('auth/register',
            {
                title: 'Register',
                // messages: req.flash('RegisterMessage'),
                messages: '',
                profileOptions: profileOptions,
                displayName: req.user ? req.user.name : ''
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
            return res.render('auth/register',
                {
                    title: 'Register',
                    messages: err.message || 'Registration Error',
                    profileOptions: profileOptions,
                    // messages: req.flash('RegisterMessage'),
                    displayName: req.user ? req.user.name : ''
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

/* GET Add preliminary examination page.  */
module.exports.displayPreExaminationPage = (req, res, next) => {
    User.find({ profile: 'P' }, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.render('addPreExaminationPage',
                {
                    patientList: data,
                    title: 'Add Preliminary Examination',
                    messages: '',
                    displayName: req.user ? req.user.name : '',
                    userType: req.user ? req.user.profile : 'P'
                });
        }
    })
}


/* GET Add preliminary examination page.  */
module.exports.processPreExaminationPage = (req, res, next) => {
    console.log(req.body)
    let createPrimExam = new primExam({
        username: new Date().valueOf(),
        name: req.body.name,
        height: req.body.height,
        weight: req.body.weight,
        temperature: req.body.temperature,
        physical_exam_record: req.body.physical_exam_record || ''
    });

    primExam.insertMany(createPrimExam, (insertError) => {
        if (insertError) {
            User.find({ profile: 'P' }, (err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    res.render('addPreExaminationPage',
                        {
                            patientList: data,
                            messages: insertError.message || 'Add Preliminary examination Error',
                            title: 'Add Pre Examination',
                            displayName: req.user ? req.user.name : '',
                            userType: req.user ? req.user.profile : 'P'
                        });
                }
            })
            // console.log(err);
            // return res.render('addPreExaminationPage',
            //     {
            //         title: 'Add Preliminary examination',
            //         messages: err.message || 'Add Preliminary examination Error',
            //         patientList: [],
            //         displayName: req.user ? req.user.name : '',
            //         userType: req.user ? req.user.profile : 'P',
            //     });
        }
        else {
            return res.redirect('/home');
        }
    });
}

module.exports.deletePatientExamination = (req, res, next) => {
    primExam.findOneAndDelete({
        _id: req.params.id
    }, function (err, user) {

        return res.redirect('/home');

    });
}

module.exports.updatePatientExamination = (req, res, next) => {
    primExam.find({ _id: req.params.id }, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            return res.render('updatePreExaminationPage',
                {
                    id: req.params.id,
                    data: data[0],
                    title: 'Update Preliminary examination',
                    messages: 'Update Preliminary examination Error',
                    // messages: req.flash('RegisterMessage'),
                    displayName: req.user ? req.user.name : '',
                    userType: req.user ? req.user.profile : 'P',
                });
        }
    })
}

module.exports.postUpdatePatientExamination = (req, res, next) => {
    primExam.updateOne({
        _id: req.params.id
    }, req.body, function (err, user) {
        if (err) {
            console.log(err)
            return res.render('updatePreExaminationPage',
                {
                    id: req.params.id,
                    title: 'Update Preliminary examination',
                    messages: 'Update Preliminary examination Error',
                    // messages: req.flash('RegisterMessage'),
                    displayName: req.user ? req.user.name : ''
                });
        }
        else {
            return res.redirect('/home');
        }

    });

}


/*process Logout*/
module.exports.processLogout = (req, res, next) => {
    req.logout();
    return res.redirect('/');
}