

var SeanceType = require('../models/seanceType');

exports.save = function(req, res) {
	
   
    var seanceType = new SeanceType(req.body.seanceType);      // create a new instance of the Bear model
   //console.log(seanceType);

    // save the bear and check for errors
    seanceType.save(function(err) {
            if (err)
               return res.send(err);

            res.json({ message: 'seanceType created!' });
        });
 

};

exports.findAll = function(req, res) {
    SeanceType.find({'cdEtat':req.body.cdEtat}, function (err, seanceTypes) {

           if (err)
               return res.send(err);

        res.json(seanceTypes);
    });

};

exports.findAllWithUser= function(req, res) {



   SeanceType.find({'cdEtat':req.body.cdEtat})
    .populate('user')
   .exec(function (err, seanceTypes) {
        console.log(seanceTypes);
           if (err)
               return res.send(err);

        res.json(seanceTypes);
    });

};




