     // get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PatientSchema = require('mongoose').model('Patient');
var UserSchema = require('mongoose').model('User');

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Facture', new Schema({ 
    nom: String, 
    prenom: String, 
    old: Boolean,
    user:UserSchema,
    patient:Patient,
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    cdEtat: { type: String, default:'ACT' }
}));