let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');


//creating model class for patient login
let primExamModel = mongoose.Schema({
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'name is required'
    },
    height: {
        type: String,
        default: '',
        trim: true,
        required: 'height is required'
    },
    weight: {
        type: String,
        default: '',
        trim: true,
        required: 'weight is required'
    },
    temperature: {
        type: String,
        default: '',
        trim: true,
        required: 'temperature is required'
    },
    physical_exam_record: {
        type: String,
        default: '',
        trim: true
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
        collection: "examination"
    });

//configure options for Preliminary examination model

let options = ({ missingPasswordError: 'Wrong / Missing Password' });
primExamModel.plugin(passportLocalMongoose, options);
module.exports.primExamModel = mongoose.model('primExamModel', primExamModel);

