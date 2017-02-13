// =======================
// get the packages we need ============
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User   = require('./app/models/user'); // get our mongoose model
    
// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
mongoose.Promise = global.Promise;
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});
// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// routes ================
// =======================
// basic route
/*app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});*/



app.get('/setup', function(req, res) {

	// create a sample user
	var nick = new User({ 
		name: 'test@test.fr', 
		password: 'password',
		admin: true 
	});
	nick.save(function(err) {
		if (err) throw err;

		console.log('User saved successfully');
		res.json({ success: true });
	});
});
// get an instance of the router for api routes
var apiRoutes = express.Router(); 

var routes = {};
routes.patient = require('./app/routes/patientRoute.js');

// TODO: route to authenticate a user (POST http://localhost:8080/api/authenticate)
// route to authenticate a user (POST http://localhost:8080/api/authenticate)
app.post('/authenticate', function(req, res) {

  console.log(req.body.username);
  // find the user
  User.findOne({
    name: req.body.username
  }, function(err, user) {

    if (err) throw err;


    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 86400 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
           user: user.name,
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }
       
  });

});

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.post('/patient/create',ensureAuthorized,checkToken, routes.patient.save);    


function ensureAuthorized(req, res, next) {
      var bearerToken;
    var bearerHeader = req.headers["authorization"];
      // decode token
  if (bearerHeader &&   typeof bearerHeader !== 'undefined'){
      var bearer = bearerHeader.split(" ");
      bearerToken = bearer[1];
              console.log(bearerToken);

       req.token = bearerToken;
          next();
  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
}

function checkToken(req, res, next) {

  var token = req.token;

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
};
// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);