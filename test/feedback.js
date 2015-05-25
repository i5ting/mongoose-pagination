var assert = require('chai').assert;
var expect = require('chai').expect;
require('chai').should();

var Promise = require('bluebird');
var Feedback = require('../models/feedback');

// mongoose config
var mongoose = require('mongoose')  
  , connectionString = 'mongodb://localhost:27017/mongoose_pagination'
  , options = {};

options = {  
  server: {
    auto_reconnect: true,
    poolSize: 10
  }
};

mongoose.connect(connectionString, options, function(err, res) {  
  if(err) {
    console.log('[mongoose log] Error connecting to: ' + connectionString + '. ' + err);
  } else {
    console.log('[mongoose log] Successfully connected to: ' + connectionString);
  }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoose connection error:'));
db.once('open', function callback () {
  // yay!
	console.log('mongoose open success');
});

describe('UserModel', function(){
	before(function(done) {
    // runs before all tests in this block
		// create a user a new user
    var files = [];
  
    for(var i = 0 ;i < 100;i++){
      var f = new Feedback({
        content:"content -" + i
      });
      
      files.push(f.saveAsync());
    }
    
    
    Promise.all(files).then(function() {
        console.log("all the files were created");
        done();
    });
		
  })
  after(function(){
    // runs after all tests in this block
    // Feedback.remove({}, function (err) {
    //   if (err) return handleError(err);
    //   // removed!
    //   console.log('remove all data');
    // });
		
  })
  beforeEach(function(){
    // runs before each test in this block
  })
  afterEach(function(){
    // runs after each test in this block
  })
	
  describe('#save()', function(){
    it('should return sang_test2 when user save', function(done){
      Feedback.find_by_page(1,function(err,docs){
        console.log(docs);
        assert.lengthOf(docs, 10)
        
        Feedback.find_by_page(2,function(err,docs2){
          console.log(docs2);
          
          assert.lengthOf(docs2, 10)
          done();
        });
        
      });

    })
  })

})