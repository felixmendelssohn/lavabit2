var mongoose = require('mongoose');
//var constring =  "mongodb://felix:JustDoIt@ds141428.mlab.com:41428/heroku_ptq20cst";
var constring = "mongodb://localhost:27017/test"
mongoose.connect(constring);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // anything :D 
});

module.exports = mongoose; 