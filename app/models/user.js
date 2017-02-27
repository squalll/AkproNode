     // get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({ 
    login: String, 
    password: String, 
    admin: Boolean,
    nom: String,
    prenom: String,
    adresse: String,
    ville: String,
    cdPostal: String,
    siret: String,
    tel: String,
    mail: String,
    statut: String,
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    cdEtat: { type: String, default:'ACT' }
}));