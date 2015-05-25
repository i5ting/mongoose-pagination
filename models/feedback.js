var mongoose = require('mongoose');

Schema = mongoose.Schema;

FeedBackSchema = new Schema({
  content: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});


// 1 0
// 2 1*10，10 --20
FeedBackSchema.statics.find_by_page = function(page_number, cb) {
  var s = (page_number-1)*10
  return this.find({}).sort({ created_at: 'desc'}).skip(s).limit(10).exec(cb);
};


var FeedBack = mongoose.model('FeedBack', FeedBackSchema);

var Promise = require('bluebird');

Promise.promisifyAll(FeedBack);
Promise.promisifyAll(FeedBack.prototype);

module.exports = FeedBack;