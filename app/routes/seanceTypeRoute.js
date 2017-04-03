

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



   SeanceType.find({})
    .populate('user')
   .exec(function (err, seanceTypes) {
        console.log(seanceTypes);
           if (err)
               return res.send(err);

        res.json(seanceTypes);
    });

};

exports.updateCdEtat = function(req, res) {
   
    console.log(req.body.seance._id);
        console.log(req.body.cdEtat);

    var id = req.body.seance._id;
    var cdEtat = req.body.cdEtat;
   console.log(id);
    if(id!=undefined){
        SeanceType.findByIdAndUpdate(id, { $set: { cdEtat: cdEtat }}, { new: true }, function (err, seance) {
        if (err){
             return res.status(500).send({ 
                success: false, 
                message: err});
        } else{
            return res.send(seance);
        }
      
        });

    }else{
    return res.status(500).send({ 
        success: false, 
        message: 'impossible retrouver l id'
    });
    }

  
};


