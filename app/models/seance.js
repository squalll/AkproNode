     // get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Seance', new Schema({  
    start: Date,
    end:Date,
    user:{type: Schema.ObjectId, ref: 'User'},
    seanceType:{type: Schema.ObjectId, ref: 'SeanceType'},
    patient:{type: Schema.ObjectId, ref: 'Patient'},
    facturer:{ type: Boolean, default: false },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    cdEtat: { type: String, default:'ACT' }
}));