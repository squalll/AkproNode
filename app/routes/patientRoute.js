

var Patient = require('../models/patient');

exports.save = function(req, res) {
	
    console.log(req.body.nom);
    var patient = new Patient();      // create a new instance of the Bear model
    patient.nom = req.body.nom; 
    patient.prenom = req.body.prenom; 

    // save the bear and check for errors
    patient.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Patient created!' });
        });
 

};