

var User = require('../models/user');

exports.save = function(req, res) {
	
    console.log(req.body.user);
    var user = new User(req.body.user);      // create a new instance of the Bear model
  //  user = req.body.user; 
      console.log(user);
   /* Virus.findById(id, function (err, virus) {
    console.log(virus.name);     // name is required
    console.log(virus.taxonomy); // taxonomy is not
    })*/
    // save the bear and check for errors
    user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'user created!' });
        });
 

};

