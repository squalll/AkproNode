     // get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PatientSchema = require('mongoose').model('Patient');
var UserSchema = require('mongoose').model('User');
var UserSchema = require('mongoose').model('SeanceType');

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Seance', new Schema({  
    start: Date,
    end:Date,
    user:UserSchema,
    patient:Patient,
    type:SeanceType,
    facturer:Boolean,
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    cdEtat: { type: String, default:'ACT' }
}));