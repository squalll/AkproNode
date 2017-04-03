

var Seance = require('../models/seance');
var User = require('../models/user');

exports.save = function(req, res) {
	
   
    var seance = new Seance(req.body.seance);      // create a new instance of the Bear model
   var user=req.body.currentUser;
  console.log(req.body.seance.end);
   User.findOne({ 'login': user.user }, function (err, userInbdd) {
    if (err) return handleError(err);
       
         seance.user=userInbdd._id;
         seance.save(function(err) {
            if (err)
               return res.send(err);
            
               res.json({ message: 'seanceType created!' });
        });
    });


 
    // save the bear and check for errors
   /* seanceType.save(function(err) {
            if (err)
               return res.send(err);

            res.json({ message: 'seanceType created!' });
        });*/
 

};

exports.findAll = function(req, res) {
    Seance.find({'cdEtat':req.body.cdEtat}, function (err, seances) {

           if (err)
               return res.send(err);

        res.json(seances);
    });

};

exports.findAllWithUser= function(req, res) {


   Seance.find({'cdEtat':req.body.cdEtat})
   .populate('user')
    .populate('seanceType')
     .populate('patient')
   .exec(function (err, seances) {
           if (err)
               return res.send(err);

        res.json(seances);
    });

};



