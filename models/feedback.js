var mongoose = require('mongoose');

Schema = mongoose.Schema;

FeedBackSchema = new Schema({
  feed_data: String,
  user: {
    type: Schema.ObjectId,
    required: true,
    index: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

var FeedBack = mongoose.model('FeedBack', FeedBackSchema);

var Promise = require('bluebird');

Promise.promisifyAll(FeedBack);
Promise.promisifyAll(FeedBack.prototype);

module.exports = FeedBack;