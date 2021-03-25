let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');


//creating model class for patient login
let userModel = mongoose.Schema({
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'name is required'
    },
   /* password:{
        type: String,
        default: '',
        trim: true,
        required: 'password is required'
    },*/
    dob: {
        type: Date,
        default: '',
        trim: true,
        required: 'dob is required'
    },
    address: {
        type: String,
        default: '',
        trim: true,
    },
    gender: {
        type: String,
        default: '',
        trim: true,
        required: 'gender is required'
    },
    email: {
        type: String,
        default:'',
        trim: true,
        required: 'email is required'
    },
    profile: {
        type: String,
        default: '',
        trim: true,
        required: 'profile is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
},
{
    collection: "users"
});

//configure options for user model

let options = ({ missingPasswordError: 'Wrong / Missing Password'});
userModel.plugin(passportLocalMongoose, options);
module.exports.userModel = mongoose.model('userModel', userModel);

