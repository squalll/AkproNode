

var User = require('../models/user');
var Patient = require('../models/patient');

exports.save = function(req, res) {
	
   
    var user = new User();      // create a new instance of the Bear model
    patient.nom = req.body.nom; 
    patient.prenom = req.body.prenom; 
   /* Virus.findById(id, function (err, virus) {
    console.log(virus.name);     // name is required
    console.log(virus.taxonomy); // taxonomy is not
    })*/
    // save the bear and check for errors
    patient.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Patient created!' });
        });
 

};

exports.findAll = function(req, res) {
    Patient.find({'cdEtat':req.body.cdEtat}, function (err, users) {
        res.json(users);
    });

};


exports.updateCdEtat = function(req, res) {
   
    console.log(req.body.patient._id);
        console.log(req.body.cdEtat);

    var id = req.body.patient._id;
    var cdEtat = req.body.cdEtat;
   console.log(id);
    if(id!=undefined){
        Patient.findByIdAndUpdate(id, { $set: { cdEtat: cdEtat }}, { new: true }, function (err, patient) {
        if (err){
             return res.status(500).send({ 
                success: false, 
                message: err});
        } else{
            return res.send(patient);
        }
      
        });

    }else{
    return res.status(500).send({ 
        success: false, 
        message: 'impossible retrouver l id'
    });
    }

  
};

