var express = require('express');
var verify = require('../lib/verify');
var router = express.Router();
var userController = require('../controllers/userController');
var hash = require('../lib/hash');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', function(req, res, next) {  
  console.log(req.body);
  hash.hashPassword(req.body.password, function(hash) {
    console.log("Hased pass: " + hash);
    var result = verify.checkUser(req.body);
    if(!result){
        res.jason({
          success: false
        });
    }
    else {
      userController.create({
          email: req.body.email,
          password: hash,
          inbox: [],
          draft: []
      });
      res.jason({
          success: true
      }); 
    }
  });  
});

router.post('/login', function(req, res, next) {
  //TO-DO: check username  and password using verify lib
  userController.retrieve(req.body.email, function(user) {
    if(user) {
      hash.checkPassword(req.body.password, user.password, function(matches) {
          if(matches) res.redirect('/inbox');    
          else res.json({ message: "Username or Password Incorrect 1!" });
      });
    } else {
      res.json({ message: "Username or Password Incorrect 2!" });
    }
  });
});

module.exports = router;
